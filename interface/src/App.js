import React, { useMemo } from 'react';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletConnectProvider } from "./providers/WalletConnectProvider";

import Navbar from './layouts/navbar';
import PresalePart from "./pages/presalePart"
import Claim from './pages/claim';
import ThemeContext from './context/themeContext';

import './App.css';
import SOL from "./assets/img/sol.svg"
import USDC from "./assets/img/usdc.svg"
import USDT from "./assets/img/usdt.png"
import JUP from "./assets/img/jup.svg"
import Dive from './pages/dive';
import Price from './pages/price';
import Tokenomics from './pages/tokenomics';
import HowToAndFaq from './pages/howToAndFaq';
import Copyright from './pages/copyright';
import Createcoin from './pages/createcoin';
import Footer from './layouts/footer';

function App() {

  const tokens = [
    { ft: "SOL", icon: SOL },
    { ft: "JUP", icon: JUP },
    { ft: "USDC", icon: USDC },
    { ft: "USDT", icon: USDT },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeContext.Provider value={tokens}>
        <WalletConnectProvider>
            <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-cyan-500 to-purple-600">
                <div className="container mx-auto px-4">
                <div className="py-1.5 text-center text-[9px] leading-none md:text-xs text-white font-bold tracking-wide">
                    CREATE YOUR TOKEN FOR ONLY 0.1 SOL UNTIL FEB 28TH
                </div>
                </div>
            </div>
            <Navbar />
            
            <div className="flex-1">
                <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#0c1527] to-[#111827]">
                <main className="pt-[22px] md:pt-[28px]">
                    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0c1527] to-[#111827] pt-14 md:pt-16">
                    <div className="jsx-756f933fc3961098 relative overflow-hidden">
                        <div className="jsx-756f933fc3961098 absolute top-[-250px] left-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl opacity-50 md:opacity-100" />
                        <div className="jsx-756f933fc3961098 absolute top-[-200px] right-[-300px] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl opacity-50 md:opacity-100" />
                        <div className="jsx-756f933fc3961098 container mx-auto py-8 md:py-16">
                        <div className="jsx-756f933fc3961098 text-center relative z-10">
                            <h1 className="jsx-756f933fc3961098 title-animate text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 md:mb-6 px-4">
                            Create Your Own Token FAST
                            </h1>
                            <p className="jsx-756f933fc3961098 subtitle-animate text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4 font-bold">
                            Launch your own token on Solana in seconds. No coding
                            required.
                            </p>
                        </div>
                        </div>
                    </div>
                    <Createcoin />
                    <HowToAndFaq />
                    </div>
                </main>
                </div>
            </div>
            <Footer />
            
          {/* <div className='px-5 md:px-10 lg:px-0 pt-6 md:pt-[100px] pb-[160px] flex flex-col'>
            <PresalePart />
            <Claim />
            <Dive />
          </div>
          <Price />
          <div className='py-[142px] flex flex-col'>
            <Tokenomics />
            <HowTo />
          </div>
          <Copyright />
           */}
          <ToastContainer autoClose={3000} draggableDirection="x" toastStyle={{ backgroundColor: "#05bfc4", color: "white" }} />
        </WalletConnectProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
