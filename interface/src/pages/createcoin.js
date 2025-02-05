import { useState, useCallback, useEffect } from 'react'
import "./pages.css"
import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";
import * as splToken from "@solana/spl-token";
import {
    TOKEN_DECIMAL,
    TOKEN_PUBKEY,
} from "../constants/index.js"
import usePresale from "../hooks/usePresale.js"
import { Icon, IconType } from "../components/icons.js";
import { Divider } from "@mui/material"
import {numberWithCommas} from "../utils/index.js"

const Createcoin = () => {

    const { claimToken, transactionPending, buyAmount, claimedAmount } = usePresale();
    const { select, wallets, publicKey, disconnect } = useWallet();

    return (
        <>
        {!publicKey? (
            <div className="container mx-auto pb-4 pt-8">
                <div className="max-w-4xl mx-auto px-2 sm:px-4">
                    <div className="subtitle-animate">
                    <div className="form-card bg-gray-800/50 backdrop-blur-xl ">
                        <div className="text-center py-2">
                        <p className="text-gray-300 mb-3">
                            Please connect your wallet to continue
                        </p>
                        <div className="wallet-adapter-dropdown">
                            <button
                            className="wallet-adapter-button wallet-adapter-button-trigger"
                            tabIndex={0}
                            type="button"
                            style={{ pointerEvents: "auto" }}
                            >
                            Select Wallet
                            </button>
                            <ul
                            aria-label="dropdown-list"
                            className="wallet-adapter-dropdown-list false"
                            role="menu"
                            >
                            <li className="wallet-adapter-dropdown-list-item" role="menuitem">
                                Change wallet
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        ):(
            <div className="container mx-auto pb-4 pt-8">
                <div className="max-w-4xl mx-auto px-2 sm:px-4">
                <div className="subtitle-animate flex justify-between mb-4 md:mb-6 px-2">
                    <div className="flex items-center flex-1">
                    <div className="progress-step w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center active text-white">
                        1
                    </div>
                    <div className="progress-line flex-1 h-1 mx-2 md:mx-4 bg-gray-700" />
                    </div>
                    <div className="flex items-center flex-1">
                    <div className="progress-step w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-700 text-gray-400">
                        2
                    </div>
                    <div className="progress-line flex-1 h-1 mx-2 md:mx-4 bg-gray-700" />
                    </div>
                    <div className="flex items-center ">
                    <div className="progress-step w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-700 text-gray-400">
                        3
                    </div>
                    </div>
                </div>
                <div className="subtitle-animate">
                    <div className="form-card bg-gray-800/50 backdrop-blur-xl ">
                    <div className="pb-4">
                        <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Token Name
                            </label>
                            <input
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                placeholder="Cosmic Coin"
                                type="text"
                                defaultValue=""
                                name="name"
                            />
                            </div>
                            <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Token Symbol
                            </label>
                            <input
                                maxLength={8}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                placeholder="CSMC"
                                type="text"
                                defaultValue=""
                                name="symbol"
                            />
                            </div>
                        </div>
                        <div className="mt-6 md:mt-8">
                            <input
                            accept="image/png,image/jpeg,image/gif"
                            className="hidden"
                            type="file"
                            />
                            <div
                            className="rounded-xl p-4 md:p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer"
                            style={{
                                position: "relative",
                                background: "rgb(23, 30, 46)",
                                borderStyle: "dotted",
                                borderWidth: 2,
                                borderColor: "rgb(6, 182, 212)",
                                borderRadius: "1rem",
                                boxShadow: "rgba(6, 182, 212, 0.2) 0px 0px 15px"
                            }}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-upload mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-3 md:mb-4"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1={12} x2={12} y1={3} y2={15} />
                            </svg>
                            <p className="text-gray-300 font-medium text-sm md:text-base">
                                Drop your 500 x 500 token logo here
                            </p>
                            <p className="text-gray-500 text-xs md:text-sm mt-2">
                                PNG, JPG, GIF up to 5MB
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                        <div />
                        <button
                            disabled=""
                            className="gradient-button disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>Next</span>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-right w-4 h-4"
                            >
                            <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Createcoin;