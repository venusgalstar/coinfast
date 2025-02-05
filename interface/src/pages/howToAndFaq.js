import { Divider } from "@mui/material";
import HowTo from "./howTo";
import Faq from "./faq";

const howToAndFaq = () => {
    return (
        <div className="container mx-auto pt-2 pb-6 md:pb-12">
            <div className="max-w-4xl mx-auto px-2 sm:px-4">
            <div className="subtitle-animate">
                <div className="jsx-1e1375fe28d41eba container mx-auto px-4">
                <div className="jsx-1e1375fe28d41eba max-w-4xl mx-auto space-y-6">
                    <div className="jsx-1e1375fe28d41eba section-animate bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border border-gray-700 is-visible">
                    <h2 className="jsx-1e1375fe28d41eba text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 md:mb-6 fade-in-up delay-1">
                        How to use Solana Token Creator
                    </h2>
                    <HowTo />
                    </div>
                    <div className="jsx-1e1375fe28d41eba section-animate bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border border-gray-700">
                    <h2 className="jsx-1e1375fe28d41eba text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 md:mb-6 fade-in-up">
                        Frequently Asked Questions
                    </h2>
                    <Faq />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default howToAndFaq;