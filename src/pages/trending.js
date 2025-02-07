const Trending = () => {
    return (
        <div className="flex-1">
            <div className="container px-4 pt-24 pb-8 mx-auto sm:pt-32">
                <div className="max-w-3xl mx-auto space-y-8">
                <div className="relative">
                    <div className="absolute z-10 transform -translate-x-1/2 -top-3 left-1/2">
                    <div className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full shadow-xl sm:px-6 whitespace-nowrap">
                        <span className="text-xs font-medium tracking-wide text-yellow-500 uppercase sm:text-sm">
                        #1 TRENDING
                        </span>
                    </div>
                    </div>
                    <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 mt-4">
                    <div className="relative p-4 rounded-lg bg-gray-900/95 backdrop-blur-xl">
                        <div className="flex flex-col justify-between gap-2 mb-4 sm:flex-row sm:items-center">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-yellow-400 border rounded-full shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
                            1
                            </div>
                            <div>
                            <h3 className="text-lg font-bold text-white">Luka</h3>
                            <p className="text-sm text-gray-400">LUKA</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-lg font-bold text-white">$0.00000062</p>
                            <div className="flex items-center gap-2 sm:justify-end">
                            <p className="text-sm text-green-400">1H: +0.00%</p>
                            <p className="text-sm text-green-400">24H: +0.05%</p>
                            </div>
                        </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/30">
                            <p className="text-sm text-gray-400">Market Cap</p>
                            <p className="text-base font-bold text-white sm:text-lg">
                            $617.00
                            </p>
                        </div>
                        <div className="p-3 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/30">
                            <p className="text-sm text-gray-400">Liquidity</p>
                            <p className="text-base font-bold text-white sm:text-lg">
                            $1.11K
                            </p>
                        </div>
                        </div>
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <p className="text-sm text-gray-400">Time remaining: 29m 16s</p>
                        <div className="flex flex-wrap items-center w-full gap-2 sm:w-auto">
                            <a
                            href="https://solscan.io/token/2Nd8HmNG49HCqZRBmp9RSVwtkU94eohPr3cPCmHL11A1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium text-gray-300 transition-all bg-gray-800 rounded-lg sm:flex-none hover:bg-gray-700 hover:text-white"
                            >
                            🔍 Solscan
                            </a>
                            <a
                            target="_blank"
                            className="flex items-center justify-center flex-1 gap-1 px-4 py-2 text-sm font-medium text-white rounded-lg sm:flex-none bg-gray-700/50 hover:bg-gray-700/75 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            href="https://dexscreener.com/solana/2Nd8HmNG49HCqZRBmp9RSVwtkU94eohPr3cPCmHL11A1"
                            >
                            📈 DexScreener
                            </a>
                            <a
                            href="https://jup.ag/swap/SOL-2Nd8HmNG49HCqZRBmp9RSVwtkU94eohPr3cPCmHL11A1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-1 gap-2 px-5 py-2 text-sm font-bold text-white transition-all rounded-lg shadow-md sm:flex-none bg-emerald-500 hover:bg-emerald-600"
                            >
                            💰 Buy Now
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute z-10 transform -translate-x-1/2 -top-3 left-1/2">
                    <div className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full shadow-xl sm:px-6 whitespace-nowrap">
                        <span className="text-xs font-medium tracking-wide text-yellow-500 uppercase sm:text-sm">
                        SILVER SPOT
                        </span>
                    </div>
                    </div>
                    <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 mt-4">
                    <div className="relative p-4 rounded-lg bg-gray-900/95 backdrop-blur-xl">
                        <div className="flex flex-col items-center justify-center p-6 mt-4 text-center border rounded-lg bg-gray-800/30 backdrop-blur-sm border-gray-700/30">
                        <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl font-bold text-blue-400 border rounded-full shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
                            2
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                            No Active Promotion
                        </h3>
                        <p className="mb-6 text-gray-400">
                            Boost your token's visibility by securing this premium spot
                        </p>
                        <a
                            className="px-6 py-2 rounded-lg text-white font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
                            href="/promote"
                        >
                            Promote Your Token
                        </a>
                        <div className="flex justify-center mt-4">
                            <p className="text-sm text-gray-500">
                            30 minutes promotion • Enhanced visibility • Premium spot
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute z-10 transform -translate-x-1/2 -top-3 left-1/2">
                    <div className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full shadow-xl sm:px-6 whitespace-nowrap">
                        <span className="text-xs font-medium tracking-wide text-yellow-500 uppercase sm:text-sm">
                        #3 TRENDING
                        </span>
                    </div>
                    </div>
                    <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 mt-4">
                    <div className="relative p-4 rounded-lg bg-gray-900/95 backdrop-blur-xl">
                        <div className="flex flex-col justify-between gap-2 mb-4 sm:flex-row sm:items-center">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-green-400 border rounded-full shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
                            3
                            </div>
                            <div>
                            <h3 className="text-lg font-bold text-white">FartTwins</h3>
                            <p className="text-sm text-gray-400">FT</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-lg font-bold text-white">$0.00000017</p>
                            <div className="flex items-center gap-2 sm:justify-end">
                            <p className="text-sm text-green-400">1H: +2.95%</p>
                            <p className="text-sm text-green-400">24H: +2.95%</p>
                            </div>
                        </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/30">
                            <p className="text-sm text-gray-400">Market Cap</p>
                            <p className="text-base font-bold text-white sm:text-lg">
                            $174.00
                            </p>
                        </div>
                        <div className="p-3 border rounded-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/30">
                            <p className="text-sm text-gray-400">Liquidity</p>
                            <p className="text-base font-bold text-white sm:text-lg">
                            $309.64
                            </p>
                        </div>
                        </div>
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <p className="text-sm text-gray-400">Time remaining: 0m 0s</p>
                        <div className="flex flex-wrap items-center w-full gap-2 sm:w-auto">
                            <a
                            href="https://solscan.io/token/7wFY4dkSq5z2TJ3iS4rAX8KQdy6n1kWT6PbECtxYCa56"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium text-gray-300 transition-all bg-gray-800 rounded-lg sm:flex-none hover:bg-gray-700 hover:text-white"
                            >
                            🔍 Solscan
                            </a>
                            <a
                            target="_blank"
                            className="flex items-center justify-center flex-1 gap-1 px-4 py-2 text-sm font-medium text-white rounded-lg sm:flex-none bg-gray-700/50 hover:bg-gray-700/75 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            href="https://dexscreener.com/solana/7wFY4dkSq5z2TJ3iS4rAX8KQdy6n1kWT6PbECtxYCa56"
                            >
                            📈 DexScreener
                            </a>
                            <a
                            href="https://jup.ag/swap/SOL-7wFY4dkSq5z2TJ3iS4rAX8KQdy6n1kWT6PbECtxYCa56"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-1 gap-2 px-5 py-2 text-sm font-bold text-white transition-all rounded-lg shadow-md sm:flex-none bg-emerald-500 hover:bg-emerald-600"
                            >
                            💰 Buy Now
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

    )
}

export default Trending;