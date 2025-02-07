import {
    useAnchorWallet,
    useConnection,
    useWallet,
  } from "@solana/wallet-adapter-react";
  import { useEffect, useMemo, useState } from "react";
  import * as anchor from "@project-serum/anchor";
  import { IDL } from "../idl/token_presale";
  
  import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
  import {
    BUYER_HARDCAP,
    BUYER_TOKEN_HARDCAP,
    PRESALE_AUTHORITY,
    PRESALE_ID,
    PRESALE_PROGRAM_PUBKEY,
    PRESALE_SEED,
    PRICE_PER_TOKEN,
    PRICE_DECIMAL,
    TOKEN_DECIMAL,
    TOKEN_PRESALE_HARDCAP,
    TOKEN_PUBKEY,
    USER_SEED,
    SOL_TOKEN_PUBKEY,
    USDC_TOKEN_PUBKEY,
    USDT_TOKEN_PUBKEY,
    JUP_TOKEN_PUBKEY,
    SOL_PRICEFEED_ID,
    JUP_PRICEFEED_ID
  } from "../constants";
  /*
  import { toast } from "react-toastify";
  import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
  import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
  import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
  import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";

  import { parsePriceData } from "@pythnetwork/client"
  
  
  import {
    createMint,
    getMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    AuthorityType,
    setAuthority,
    createBurnInstruction,
  } from "@solana/spl-token";
  */

  import {
    clusterApiUrl,
    Connection,
    Keypair,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
  } from "@solana/web3.js";
  import {
    createInitializeMintInstruction,
    TOKEN_PROGRAM_ID,
    MINT_SIZE,
    getMinimumBalanceForRentExemptMint,
    createMint,
  } from "@solana/spl-token";
  import bs58 from "bs58";

  export default function useMeme() {
    const { publicKey } = useWallet();
    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();
    const [transactionPending, setTransactionPending] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);
    const [claimedAmount, setClaimedAmount] = useState(0);
    const [totalBuyAmount, setTotalBuyAmount] = useState(0);

    useEffect(() => {
 
    }, []);

    


    const program = useMemo(() => {
      if (anchorWallet) {
        const provider = new anchor.AnchorProvider(
          connection,
          anchorWallet,
          anchor.AnchorProvider.defaultOptions()
        );
        return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
      }
    }, [connection, anchorWallet]);

    const createToken = async (name, symbol, decimals, totalSupply) => {
      if (program && publicKey) {
        try {
          setTransactionPending(true);
          console.log("Creating tokens...", name, symbol, decimals, totalSupply);
          // Initialize a connection
          const connection1 = new Connection(clusterApiUrl('devnet'), 'confirmed');
          const recentBlockhash = await connection1.getLatestBlockhash();

          
          // const payer = Keypair.generate(); // This keypair will act as the payer for the transaction
          const mintAuthority = Keypair.generate(); // Authority that can mint new tokens
          const freezeAuthority = Keypair.generate(); // Authority that can freeze token accounts
          console.log(connection1);
          console.log(program.provider);
          console.log(mintAuthority.publicKey);
          console.log(freezeAuthority.publicKey);
          console.log(decimals);
          const mint = await createMint(connection1, program.provider, mintAuthority.publicKey, freezeAuthority.publicKey, decimals, );
          console.log("Mint Address:", mint.toBase58());
      
          await mintToken(mint.toBase58(), totalSupply);
          await createMetaData(mint.toBase58(), name, symbol);
          // await createOpenBookMarket(mint.toBase58(), 1, 0.000001);
      
          console.log("============================================");
          console.log(`***** Mint Address: ${mint.toBase58()} *****`);
          console.log("============================================");
        }catch(error){
          console.log(error);
          //toast.error(error.toString());
          return false;
        }
      }
    }

    const mintToken = async (mintAddress, amount) => {
      console.log("Minting tokens...", mintAddress, amount);
      const mint = new PublicKey(mintAddress);
      let mintInfo = await getMint(connection, mint);
  
      const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey);
      const tokenAmount = xWeiAmount(amount, mintInfo.decimals);
      await mintTo(connection, payer, mint, tokenAccount.address, payer, tokenAmount);
      
      mintInfo = await getMint(connection, mint);
      const supply = xReadableAmount(mintInfo.supply, mintInfo.decimals);
      console.log("Mint Address:", mintInfo.address.toBase58(), "Decimals:", mintInfo.decimals, "Supply:", supply.toString());
    }
    
    const createMetaData = async (mintAddress, name, symbol) => {
        console.log("Creating meta-data...", mintAddress, name, symbol);
        // const metaplex = Metaplex.make(connection).use(keypairIdentity(payer));
        const mint = new PublicKey(mintAddress);
        const [ metadataPDA ] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("metadata"),
                PROGRAM_ID.toBuffer(),
                mint.toBuffer()
            ],
            PROGRAM_ID
        );
        console.log("METADATA_PDA:", metadataPDA.toBase58());
    
        const tokenMetadata = {
            name: name,
            symbol: symbol,
            uri: "",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
        };
        const transaction = new Transaction().add(
            createCreateMetadataAccountV3Instruction(
                {
                    metadata: metadataPDA,
                    mint: mint,
                    mintAuthority: payer.publicKey,
                    payer: payer.publicKey,
                    updateAuthority: payer.publicKey,
                },
                {
                    createMetadataAccountArgsV3: {
                        data: tokenMetadata,
                        isMutable: false,
                        collectionDetails: null,
                    },
                }
            )
        );
    
        await sendAndConfirmTransactions(connection, payer, [ transaction ]);
    };
    return {
      createToken,
      mintToken,
      createMetaData
    };
  }
  