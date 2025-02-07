import { BN } from "bn.js";
import BigNumber from "bignumber.js";
import bs58 from "bs58";
import {
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
    SYSVAR_RENT_PUBKEY,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    AuthorityType,
    getMint,
    getAccount,
    getMinimumBalanceForRentExemptMint,
    getAssociatedTokenAddress,
    createInitializeAccountInstruction,
    createInitializeMintInstruction,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction,
    createBurnInstruction,
    createCloseAccountInstruction,
} from "@solana/spl-token";

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

export const USE_JITO = false;

export async function sendAndConfirmSignedTransactions(
    useJito,
    connection,
    transactions
) {
    if (useJito) {
        try {
            const rawTxns = transactions.map((item) =>
                bs58.encode(item.serialize())
            );
            // const verTxns = base64Txns.map(item => VersionedTransaction.deserialize(Buffer.from(item, "base64")));
            // const rawTxns = verTxns.map(item => bs58.encode(item.serialize()));
            const { data: bundleRes } = await axios.post(
                `https://${JITO_RPC}/api/v1/bundles`,
                {
                    jsonrpc: "2.0",
                    id: 1,
                    method: "sendBundle",
                    params: [rawTxns],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (bundleRes) {
                const bundleId = bundleRes.result;
                console.log("Checking bundle's status...", bundleId);

                const sentTime = Date.now();
                while (Date.now() - sentTime < JITO_TIMEOUT) {
                    try {
                        const { data: bundleStat } = await axios.post(
                            `https://${JITO_RPC}/api/v1/bundles`,
                            {
                                jsonrpc: "2.0",
                                id: 1,
                                method: "getBundleStatuses",
                                params: [[bundleId]],
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        if (bundleStat) {
                            const bundleStatuses = bundleStat.result.value;
                            console.log("Bundle Statuses:", bundleStatuses);
                            const matched = bundleStatuses.find(
                                (item) => item.bundle_id === bundleId
                            );
                            if (
                                matched &&
                                (matched.confirmation_status === "finalized" ||
                                    matched.confirmation_status === "confirmed")
                            )
                                return true;
                        }
                    } catch (err) {
                        console.log(err);
                    }

                    await sleep(1000);
                }
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        let retries = 50;
        let passed = {};

        const rawTransactions = transactions.map((transaction) => {
            return transaction.serialize();
        });

        while (retries > 0) {
            try {
                let pendings = {};
                for (let i = 0; i < rawTransactions.length; i++) {
                    if (!passed[i]) {
                        pendings[i] = connection.sendRawTransaction(
                            rawTransactions[i],
                            {
                                skipPreflight: true,
                                maxRetries: 1,
                            }
                        );
                    }
                }

                let signatures = {};
                for (let i = 0; i < rawTransactions.length; i++) {
                    if (!passed[i]) signatures[i] = await pendings[i];
                }

                const sentTime = Date.now();
                while (Date.now() - sentTime <= 1000) {
                    for (let i = 0; i < rawTransactions.length; i++) {
                        if (!passed[i]) {
                            const ret = await connection.getParsedTransaction(
                                signatures[i],
                                {
                                    commitment: "finalized",
                                    maxSupportedTransactionVersion: 0,
                                }
                            );
                            if (ret) {
                                // console.log("Slot:", ret.slot);
                                // if (ret.transaction) {
                                //     console.log("Signatures:", ret.transaction.signatures);
                                //     console.log("Message:", ret.transaction.message);
                                // }
                                passed[i] = true;
                            }
                        }
                    }

                    let done = true;
                    for (let i = 0; i < rawTransactions.length; i++) {
                        if (!passed[i]) {
                            done = false;
                            break;
                        }
                    }

                    if (done) return true;

                    await sleep(500);
                }
            } catch (err) {
                console.log(err);
            }
            retries--;
        }
    }

    return false;
}
export async function createToken(
    connection,
    ownerPubkey,
    name,
    symbol,
    uri,
    decimals,
    totalSupply,
    isMutable,
    mintPvKey
) {
    // console.log("Creating token transaction...", name, symbol, decimals, totalSupply);
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    let mintKeypair = "";

    try {
        const key = bs58.decode(mintPvKey);
        mintKeypair = Keypair.fromSecretKey(key);
    } catch (error) {
        mintKeypair = Keypair.generate();
    }

    console.log("createToken log - 1 :", mintKeypair);

    const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        ownerPubkey
    );

    const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
    );
    // console.log("Metadata PDA:", metadataPDA.toBase58());

    const tokenMetadata = {
        name: name,
        symbol: symbol,
        uri: uri,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
    };

    const instructions = [
        SystemProgram.createAccount({
            fromPubkey: ownerPubkey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
            mintKeypair.publicKey,
            decimals,
            ownerPubkey,
            null,
            TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
            ownerPubkey,
            tokenATA,
            ownerPubkey,
            mintKeypair.publicKey
        ),
        createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            ownerPubkey,
            totalSupply * Math.pow(10, decimals)
        ),
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mintKeypair.publicKey,
                mintAuthority: ownerPubkey,
                payer: ownerPubkey,
                updateAuthority: ownerPubkey,
            },
            {
                createMetadataAccountArgsV3: {
                    data: tokenMetadata,
                    isMutable: isMutable,
                    collectionDetails: null,
                },
            }
        ),
    ];
    const recentBlockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;
    const message = new TransactionMessage({
        payerKey: ownerPubkey,
        recentBlockhash,
        instructions,
    });
    const transaction = new VersionedTransaction(
        message.compileToV0Message(
            Object.values({ ...(addLookupTableInfo ?? {}) })
        )
    );
    transaction.sign([mintKeypair]);

    return { mint: mintKeypair.publicKey, transaction: transaction };
}