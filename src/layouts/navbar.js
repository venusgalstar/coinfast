//import "./layouts.css"
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const navStringList = [
    {title:'Create Token', url:'/', target:'', rel:''},
    {title:'Create Liquidity', url:'https://raydium.io/liquidity/create-pool/', target:'_blank', rel:"noopener noreferrer"},
    {title:'Promote Token', url:'/promote', target:'', rel:''},
    {title:'Trending 🔥', url:'/trending', target:'', rel:''},
];

const Navbar = () => {

    const { select, wallets, publicKey, disconnect } = useWallet();

    const [animationClass, setAnimationClass] = useState("slide-down");
    const [toggleMenu, setToggleMenu] = useState(false);

    //const [initialState, setInitialState] = useState({});

    const handleMenuToggle = () => {
        if (window.innerWidth <= 1050) {
            setAnimationClass("slide-down");
            setToggleMenu(!toggleMenu);
        }
    };
    const closeMenuWithAnimation = () => {
        setAnimationClass("slide-up"); // Trigger slide-up animation
        setTimeout(() => {
            setToggleMenu(false); // Close menu after animation finishes
        }, 400); // Match the animation duration in CSS
    };

    const onWalletConnect = () => {
        if (!publicKey) {
            const installedWallets = wallets.filter(
                (wallet) => wallet.readyState === "Installed"
            );
            if (installedWallets.length <= 0) {
                toast.warning("Phantom wallet is not installed yet.");
                return;
            }
            select(wallets[0].adapter.name);
        } else {
            disconnect();
        }
    };

    return (
        <nav className="fixed top-[21px] md:top-[27px] left-0 right-0 z-50 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
            <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between h-14 md:h-16">
                <div className="flex items-center space-x-2 md:space-x-3">
                    <button className="p-2 text-gray-400 md:hidden hover:text-white" onClick={handleMenuToggle}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        </svg>
                    </button>
                    <a
                        className="transition-opacity duration-200 hover:opacity-80"
                        href="/"
                    >
                        <span className="font-bold truncate">
                        <span className="hidden text-2xl font-extrabold tracking-tight text-transparent sm:inline bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 md:text-3xl">
                            CoinFast
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight text-transparent sm:hidden bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            CoinFast
                        </span>
                        </span>
                    </a>
                </div>
                <div className="items-center justify-center flex-1 hidden md:flex">
                    <div className="flex space-x-4">
                        {navStringList.map(item=>(
                            <a
                                className="relative px-4 py-2 text-sm font-medium tracking-wide group md:text-base"
                                href={item.url}
                                target={item.target}
                                ref={item.ref}
                                key={item.url}
                            >
                                <span className="relative z-10 text-transparent transition-all duration-200 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400">
                                    {item.title}
                                </span>
                                <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 group-hover:opacity-100" />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-end ml-auto">
                    <WalletMultiButton />
                </div>
                {toggleMenu &&(
                    <div className="absolute left-0 right-0 border-b md:hidden top-full bg-gray-800/95 backdrop-blur-sm border-gray-700/50">
                        <div className="px-4 py-3 space-y-3">
                            {navStringList.map(item=>(
                                <a
                                    className="block py-2 text-gray-300 hover:text-white"
                                    href={item.url}
                                    target={item.target}
                                    ref={item.ref}
                                    key={item.url}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                <div className="relative" />
            </div>
            </div>
        </nav>
    );
}

export default Navbar;