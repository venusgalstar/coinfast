const Footer = () => {
  
    return (
        <footer className="w-full py-4 px-4 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50">
            <div className="container mx-auto">
            <div className="text-center text-xs text-gray-400 mb-4">
                CoinFast helps you create and launch Solana tokens in seconds with no
                coding required. For support and inquiries, reach out to us on Telegram
                @coinfastofficial. CoinFast is a token creation platform. We do not
                provide financial advice or guarantee any returns. Users are responsible
                for complying with relevant laws and regulations. Creating and trading
                tokens carries significant risks - please do your own research before
                proceeding. The platform is provided "as is" without warranties of any
                kind. By using CoinFast, you acknowledge and accept all associated
                risks.
            </div>
            <div className="text-center text-sm text-gray-400">
                <p>
                © 2025 CoinFast | All Rights Reserved | Support on Telegram{" "}
                <a
                    href="https://t.me/coinfastofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                >
                    @coinfastofficial
                </a>{" "}
                |{" "}
                <a
                    href="https://t.me/coinfastaffiliates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                >
                    Become an affiliate for CoinFast
                </a>
                </p>
            </div>
            </div>
        </footer>

    );
}

export default Footer;