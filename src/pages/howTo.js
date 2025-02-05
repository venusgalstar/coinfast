const HowTo = () => {
    return (
        <div className="jsx-1e1375fe28d41eba space-y-3">
            <div className="jsx-1e1375fe28d41eba">
            <h3 className="jsx-1e1375fe28d41eba text-lg md:text-xl text-gray-200 font-medium mb-2 fade-in-up delay-2">
                Follow these simple steps:
            </h3>
            <ol className="jsx-1e1375fe28d41eba space-y-1.5 text-sm md:text-base text-gray-300">
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.3s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    1.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Connect your Solana wallet.
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.4s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    2.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Write the name you want for your Token.
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.5s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    3.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Indicate the symbol (max 8 characters).
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.6s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    4.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Select the decimals quantity (0 for Whitelist
                    Token, 6 for utility token).
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.7s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    5.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Write the description you want for your SPL
                    Token.
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.8s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    6.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Upload the image for your token (PNG).
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "0.9s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    7.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Put the supply of your Token.
                    </span>
                </div>
                </li>
                <li
                className="jsx-1e1375fe28d41eba instruction-item"
                style={{ animationDelay: "1s" }}
                >
                <div className="jsx-1e1375fe28d41eba flex items-start">
                    <span className="jsx-1e1375fe28d41eba font-medium mr-2">
                    8.
                    </span>
                    <span className="jsx-1e1375fe28d41eba">
                    Click on Create, accept the transaction, and
                    wait until your token is ready.
                    </span>
                </div>
                </li>
            </ol>
            </div>
            <div className="jsx-1e1375fe28d41eba mt-3 pt-3 border-t border-gray-700 space-y-2 fade-in-up delay-4">
            <p className="jsx-1e1375fe28d41eba text-sm md:text-base text-gray-300">
                The cost of creating the Token is{" "}
                <span className="jsx-1e1375fe28d41eba text-cyan-400 font-medium">
                0.1 SOL
                </span>
                , which includes all fees needed for the SPL Token
                creation.
            </p>
            <p className="jsx-1e1375fe28d41eba text-sm md:text-base text-gray-300">
                The creation process will start and will take some
                seconds. After that, you will receive the total
                supply of the token in the wallet you chose.
            </p>
            </div>
        </div>
    )
}

export default HowTo;