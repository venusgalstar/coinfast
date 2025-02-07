import React, { useMemo } from 'react';

import {
  Routes,
  Route,
  BrowserRouter,  
} from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletConnectProvider } from "./providers/WalletConnectProvider";

import Navbar from './layouts/navbar';
import ThemeContext from './context/themeContext';

import './App.css';
import SOL from "./assets/img/sol.svg"
import USDC from "./assets/img/usdc.svg"
import USDT from "./assets/img/usdt.png"
import JUP from "./assets/img/jup.svg"
import Createcoin from './pages/createcoin';
import Footer from './layouts/footer';
import { WalletModalProvider, WalletDisconnectButton, WalletModalButton } from '@solana/wallet-adapter-react-ui';
import PromoteToken from './pages/promotetoken';
import Trending from './pages/trending';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

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
          <WalletModalProvider>
            <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-cyan-500 to-purple-600">
                <div className="container px-4 mx-auto">
                <div className="py-1.5 text-center text-[9px] leading-none md:text-xs text-white font-bold tracking-wide">
                    CREATE YOUR TOKEN FOR ONLY 0.1 SOL UNTIL FEB 28TH
                </div>
                </div>
            </div>
            <Navbar />
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Createcoin/>}></Route>
                <Route path='/promote' element={<PromoteToken/>}></Route>
                <Route path='/trending' element={<Trending/>}></Route>
              </Routes>
            </BrowserRouter>
            <Footer />
            <ToastContainer autoClose={3000} draggableDirection="x" toastStyle={{ backgroundColor: "#05bfc4", color: "white" }} />
          </WalletModalProvider>
        </WalletConnectProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
