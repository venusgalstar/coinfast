//import "./layouts.css"
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const navStringList = [
    {title:'Create Token', url:'/', target:'', rel:''},
    {title:'Create Liquidity', url:'/#tokenomics', target:'_blank', rel:"noopener noreferrer"},
    {title:'Promote Token', url:'/promote', target:'', rel:''},
    {title:'Trending 🔥', url:'/trending', target:'', rel:''},
];

const Navbar = () => {

    const { select, wallets, publicKey, disconnect } = useWallet();

    const [animationClass, setAnimationClass] = useState("slide-down");
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleLang, setToggleLang] = useState(false);

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
            <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-14 md:h-16">
                <div className="flex items-center space-x-2 md:space-x-3">
                    <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={handleMenuToggle}>
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
                        className="hover:opacity-80 transition-opacity duration-200"
                        href="/"
                    >
                        <span className="font-bold truncate">
                        <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-2xl md:text-3xl font-extrabold tracking-tight">
                            CoinFast
                        </span>
                        <span className="sm:hidden bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-2xl font-extrabold tracking-tight">
                            CoinFast
                        </span>
                        </span>
                    </a>
                </div>
                <div className="hidden md:flex items-center justify-center flex-1">
                    <div className="flex space-x-4">
                        {navStringList.map(item=>(
                            <a
                                className="relative group px-4 py-2 text-sm md:text-base font-medium tracking-wide"
                                href={item.url}
                                target={item.target}
                                ref={item.ref}
                                key={item.url}
                            >
                                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-200">
                                    {item.title}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </a>
                        ))}
                    </div>
                </div>
                {/* <div className="flex items-center justify-end ml-auto">
                    <button className="h-9 flex flex-row items-center justify-center rounded-3xl px-4 py-2 text-[12px] bg-cyan-500" onClick={onWalletConnect}>
                        {!publicKey ? "Connect Wallet" : publicKey.toBase58().slice(0, 4) + " ... " + publicKey.toBase58().slice(-4)}
                    </button>
                    
                </div> */}
                <div className="flex items-center justify-end ml-auto">
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
                {toggleMenu &&(
                    <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50">
                        <div className="px-4 py-3 space-y-3">
                            {navStringList.map(item=>(
                                <a
                                    className="block text-gray-300 hover:text-white py-2"
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