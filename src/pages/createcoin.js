import { useState, useCallback, useEffect, useRef } from 'react'
import axios from 'axios';
import "./pages.css"

import {
    useConnection,
    useWallet
} from "@solana/wallet-adapter-react";

import HowToAndFaq from './howToAndFaq';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import {
  pinFileToPinata,
  //pinJsonToNFTStorage,
  pinJsonToPinata,
} from "../hooks/pinatasdk";
import {
  USE_JITO,
  createToken,
  setMintAuthority,
  sendAndConfirmSignedTransactions,
  getTipTransaction,
} from "../hooks/solana";

const default_formdata = {
    name:'',
    symbol:'',
    file:null,
    decimals:9,
    supply:1000000000,
    description:'',
    website:'',
    twitter:'',
    telegram:'',
    discord:'',
    creatorName:'',
    creatorWebsite:'',
    addsolflag:true,
}

const Createcoin = () => {

    //const { claimToken, transactionPending, buyAmount, claimedAmount } = usePresale();
    const { connection } = useConnection();
    const { select, wallets, publicKey, disconnect } = useWallet();
    const [currentStep, setCurrentStep] = useState(0);
    const [formdata, setFormData] = useState(default_formdata);
    const [isMutable, setIsMutable] = useState(false);
    const [mintPvKey, setMintPvKey] = useState("");
    
    const fileInputRef = useRef(null);
    
    
    const handleNextStep = (_step)=> {
        setCurrentStep(_step);
    }

    const handlePrevStep = (_step)=> {
        setCurrentStep(_step);
    }

    
    // Open file dialog manually and track its state
    const handleOpenFileDialog = () => {
        // Manually trigger file input click
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    const handleUploadLogo = async (e) => {
      const file = e.target.files[0];
      if (file === undefined) return;
        setFormData({...formdata, file:file});
      //setLoadingPrompt("Uploading logo...");
      //setOpenLoading(true);
      try {
          console.log(file);
          const uri = await pinFileToPinata(file);
          console.log(uri);
          //setLogo(uri);
          //toast.success("Succeed to upload logo!");
      } catch (err) {
          console.log(err);
          // try {
          //     const uri = await pinFileToNFTStorage(file);
          //     setLogo(uri);
          //     toast.success("Succeed to upload logo!");
          // } catch (err) {
          //     console.log(err);
          //     toast.warn("Failed to upload logo!");
          // }
      }
      //setOpenLoading(false);
    };
    

    const handleCreateToken = async () => {
      if (!publicKey) {
          //toast.warn("Please connect wallet!");
          return;
      }
/*
      if (formdata.name === "") {
          //toast.warn("Please input name!");
          return;
      }

      if (formdata.symbol === "") {
          //toast.warn("Please input symbol!");
          return;
      }

      if (formdata.decimals === "" || isNaN(Number(formdata.decimals))) {
          //toast.warn("Please input decimals!");
          return;
      }

      if (formdata.totalSupply === "" || isNaN(Number(formdata.totalSupply))) {
          //toast.warn("Please input total supply!");
          return;
      }

      setLoadingPrompt("Uploading metadata...");
      setOpenLoading(true);
*/      
      try {
          let metadata = {
              name: formdata.name,
              symbol: formdata.symbol,
          };
          if (formdata.file) metadata.image = formdata.file;
          if (formdata.description) metadata.description = formdata.description;
          // if (website || twitter || telegram || discord) {
          //     metadata.extensions = {};
          //     if (website) metadata.extensions.website = website;
          //     if (twitter) metadata.extensions.twitter = twitter;
          //     if (telegram) metadata.extensions.telegram = telegram;
          //     if (discord) metadata.extensions.discord = discord;
          // }

          let uri = "";
          try {
              uri = await pinJsonToPinata(metadata);
          } catch (error) {
              console.log(error);
              //uri = await pinJsonToNFTStorage(metadata);
          }
          console.log(uri);

          //setLoadingPrompt("Creating tokens...");
          try {
              const { mint, transaction } = await createToken(
                  connection,
                  publicKey,
                  formdata.name,
                  formdata.symbol,
                  formdata.uri,
                  Number(formdata.decimals),
                  Number(formdata.totalSupply),
                  isMutable,
                  mintPvKey
              );
              if (transaction) {
                  let txns = [transaction];
                  if (USE_JITO) {
                    /*
                      const tipTxn = await getTipTransaction(
                          connection,
                          publicKey,
                          user.presets.jitoTip
                      );
                      txns.push(tipTxn);
                    */
                  }

                  const signedTxns = await signAllTransactions(txns);
                  const res = await sendAndConfirmSignedTransactions(
                      USE_JITO,
                      connection,
                      signedTxns
                  );
                  if (res) {
                      console.log("Mint Address:", mint.toBase58());
                      setNotifyTitle("Token Address");
                      setNotifyAddress(mint.toBase58());
                      setNotifyAddressDialog(true);
                      console.log("Succeed to create token!");
                  } else console.log("Failed to create token!");
              }
          } catch (err) {
              console.log(err);
              //toast.warn("Failed to create token!");
          }
      } catch (err) {
          console.log(err);
          //toast.warn("Failed to upload metadata!");
      }
      //setOpenLoading(false);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({...formdata, [event.target.name]:event.target.value});
    };

    const handleAddSolFlag = (value) => {
        //event.preventDefault();
        setFormData({...formdata, addsolflag:!formdata.addsolflag});
    };

    function canBeSubmitted(){
        if (currentStep === 0){
            return formdata.name !=='' && formdata.symbol !== '' && formdata.file !==null;
        }else if(currentStep === 1 ){
            return Number(formdata.decimals) < 19 && Number(formdata.decimals) > 0 && Number(formdata.supply) > 0;
        }
    }
    
    return (
      <div className="flex-1">
      <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#0c1527] to-[#111827]">
      <main className="pt-[22px] md:pt-[28px]">
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0c1527] to-[#111827] pt-14 md:pt-16">
          <div className="relative overflow-hidden jsx-756f933fc3961098">
              <div className="jsx-756f933fc3961098 absolute top-[-250px] left-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl opacity-50 md:opacity-100" />
              <div className="jsx-756f933fc3961098 absolute top-[-200px] right-[-300px] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl opacity-50 md:opacity-100" />
              <div className="container py-8 mx-auto jsx-756f933fc3961098 md:py-16">
              <div className="relative z-10 text-center jsx-756f933fc3961098">
                  <h1 className="px-4 mb-4 text-3xl font-bold text-transparent jsx-756f933fc3961098 title-animate md:text-5xl bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 md:mb-6">
                  Create Your Own Token FAST
                  </h1>
                  <p className="max-w-2xl px-4 mx-auto text-base font-bold text-gray-300 jsx-756f933fc3961098 subtitle-animate md:text-lg">
                  Launch your own token on Solana in seconds. No coding
                  required.
                  </p>
              </div>
              </div>
          </div>
          
          {!publicKey? (
              <div className="container pt-8 pb-4 mx-auto">
                  <div className="max-w-4xl px-2 mx-auto sm:px-4">
                      <div className="subtitle-animate">
                      <div className="form-card bg-gray-800/50 backdrop-blur-xl ">
                          <div className="py-2 text-center">
                          <p className="mb-3 text-gray-300">
                              Please connect your wallet to continue
                          </p>
                          <WalletMultiButton />
                          </div>
                      </div>
                      </div>
                  </div>
              </div>
          ):(
              <div className="container pt-8 pb-4 mx-auto">
                  <div className="max-w-4xl px-2 mx-auto sm:px-4">
                      <div className="flex justify-between px-2 mb-4 subtitle-animate md:mb-6">
                          <div className="flex items-center flex-1">
                          <div className="flex items-center justify-center w-8 h-8 text-white rounded-full progress-step md:w-10 md:h-10 active">
                              1
                          </div>
                          {currentStep >= 1 ? (<div className="flex-1 h-1 mx-2 progress-line md:mx-4 active" />):(<div className="flex-1 h-1 mx-2 bg-gray-700 progress-line md:mx-4" />)}
                          </div>
                          <div className="flex items-center flex-1">
                              {currentStep >= 1 ? (
                                  <div className="flex items-center justify-center w-8 h-8 text-white rounded-full progress-step md:w-10 md:h-10 active">
                                      2
                                  </div>
                              ):(
                                  <div className="flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-700 rounded-full progress-step md:w-10 md:h-10">
                                      2
                                  </div>
                              )}
                              {currentStep >= 2 ? (
                                  <div className="flex-1 h-1 mx-2 progress-line md:mx-4 active" />):(<div className="flex-1 h-1 mx-2 bg-gray-700 progress-line md:mx-4" />)}
                          </div>
                          <div className="flex items-center ">
                          {currentStep >= 2 ? (
                              <div className="flex items-center justify-center w-8 h-8 text-white rounded-full progress-step md:w-10 md:h-10 active">
                                  3
                              </div>
                          ):(
                              <div className="flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-700 rounded-full progress-step md:w-10 md:h-10">
                                  3
                              </div>
                          )}
                          </div>
                      </div>
                      <div className="subtitle-animate">
                          {currentStep == 0 && (
                              <div className="form-card bg-gray-800/50 backdrop-blur-xl ">
                                  <div className="pb-4">
                                      <div className="space-y-6">
                                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                                              <div>
                                              <label className="block mb-2 text-sm font-medium text-gray-300">
                                                  Token Name
                                              </label>
                                              <input
                                                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                                  placeholder="Cosmic Coin"
                                                  type="text"
                                                  name="name"
                                                  value={formdata.name}
                                                  onChange={handleChange}
                                              />
                                              </div>
                                              <div>
                                              <label className="block mb-2 text-sm font-medium text-gray-300">
                                                  Token Symbol
                                              </label>
                                              <input
                                                  maxLength={8}
                                                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                                  placeholder="CSMC"
                                                  type="text"
                                                  name="symbol"
                                                  value={formdata.symbol}
                                                  onChange={handleChange}
                                              />
                                              </div>
                                          </div>
                                          <div className="mt-6 md:mt-8" onClick={handleOpenFileDialog}>
                                              <input
                                                  accept="image/png,image/jpeg,image/gif"
                                                  className="hidden"
                                                  type="file"
                                                  ref={fileInputRef}
                                                  onChange={handleUploadLogo}
                                              />
                                          {formdata.file === null ? (
                                              <div
                                                  className="p-4 text-center transition-colors cursor-pointer rounded-xl md:p-8 hover:border-cyan-500"
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
                                                      className="w-10 h-10 mx-auto mb-3 text-gray-400 lucide lucide-upload md:h-12 md:w-12 md:mb-4"
                                                  >
                                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                      <polyline points="17 8 12 3 7 8" />
                                                      <line x1={12} x2={12} y1={3} y2={15} />
                                                  </svg>
                                                  <p className="text-sm font-medium text-gray-300 md:text-base">
                                                      Drop your 500 x 500 token logo here
                                                  </p>
                                                  <p className="mt-2 text-xs text-gray-500 md:text-sm">
                                                      PNG, JPG, GIF up to 5MB
                                                  </p>
                                              </div>
                                          ):(
                                              <div
                                                  className="p-4 text-center transition-colors cursor-pointer rounded-xl md:p-8 hover:border-cyan-500"
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
                                                  <div className="space-y-2" onClick={handleOpenFileDialog}>
                                                      <img
                                                          alt="Token preview"
                                                          width={96}
                                                          height={96}
                                                          decoding="async"
                                                          data-nimg={1}
                                                          className="object-cover w-20 h-20 mx-auto rounded-lg md:h-24 md:w-24 wizmage-pattern-bg-img wizmage-cls wizmage-shade-2"
                                                          src={formdata.url}
                                                          style={{ color: "transparent", width: 96, height: 96 }}
                                                          title="Token preview"
                                                          srcSet=""
                                                      />
                                                      <p className="text-sm text-gray-300 md:text-base">
                                                          {formdata.file.name}
                                                      </p>
                                                  </div>
                                              </div>
                                          )}
                                          </div>
                                      </div>

                                      <div className="flex items-center justify-between mt-6">
                                      <div />
                                      <button
                                          disabled={!canBeSubmitted()}
                                          className="gradient-button disabled:opacity-50 disabled:cursor-not-allowed"
                                          onClick={()=>handleNextStep(1)} 
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
                                              className="w-4 h-4 lucide lucide-chevron-right"
                                          >
                                              <path d="m9 18 6-6-6-6" />
                                          </svg>
                                      </button>
                                      </div>
                                  </div>
                              </div>
                          )}
                          {currentStep == 1 && (
                              <div className="form-card bg-gray-800/50 backdrop-blur-xl ">
                              <div className="pb-4">
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                                    <div>
                                      <label className="block mb-2 text-sm font-medium text-gray-300">
                                        Decimals
                                      </label>
                                      <input
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        maxLength={2}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        type="text"
                                        defaultValue={9}
                                        name="decimals"
                                        value={formdata.decimals}
                                        onChange={handleChange}
                                      />
                                      <p className="mt-1 text-xs text-gray-500">
                                        Enter a value between 0 and 18 decimals
                                      </p>
                                    </div>
                                    <div>
                                      <label className="block mb-2 text-sm font-medium text-gray-300">
                                        Total Supply
                                      </label>
                                      <input
                                        placeholder={1000000000}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        type="number"
                                        defaultValue={1000000000}
                                        name="supply"
                                        value={formdata.supply}
                                        onChange={handleChange}
                                      />
                                      <p className="mt-1 text-xs text-gray-500">
                                        Common supply is 1 billion
                                      </p>
                                      <p className="text-gray-500 text-xs mt-0.5">
                                        With commas: {}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300">
                                      Description
                                    </label>
                                    <textarea
                                      name="description"
                                      rows={4}
                                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                      placeholder="Describe your token's purpose and vision..."
                                      value={formdata.description}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col-reverse items-center justify-between gap-3 mt-6 sm:flex-row">
                                <button className="w-full sm:w-auto gradient-button dark" onClick={()=>handlePrevStep(0)}>Back</button>
                                <div className="flex justify-end">
                                  <button disabled={!canBeSubmitted()} className="w-full sm:w-auto gradient-button disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>handleNextStep(2)}>
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
                                      className="w-4 h-4 lucide lucide-chevron-right"
                                    >
                                      <path d="m9 18 6-6-6-6" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                          )}
                          {currentStep == 2 && (
                              <div className="form-card bg-gray-800/50 backdrop-blur-xl ">
                              <div className="pb-4">
                                <div>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block mb-2 text-sm font-medium text-gray-300">
                                        <div className="flex items-center space-x-2">
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
                                            className="w-4 h-4 lucide lucide-globe"
                                          >
                                            <circle cx={12} cy={12} r={10} />
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                            <path d="M2 12h20" />
                                          </svg>
                                          <span>Website</span>
                                        </div>
                                      </label>
                                      <input
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        placeholder="https://yourmemecoin.fun"
                                        type="url"
                                        defaultValue=""
                                        name="website"
                                        onChange={handleChange}
                                        value={formdata.value}
                                      />
                                    </div>
                                    <div>
                                      <label className="block mb-2 text-sm font-medium text-gray-300">
                                        <div className="flex items-center space-x-2">
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
                                            className="w-4 h-4 lucide lucide-twitter"
                                          >
                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                          </svg>
                                          <span>Twitter</span>
                                        </div>
                                      </label>
                                      <input
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        placeholder="https://twitter.com/yourmemecoin"
                                        type="url"
                                        defaultValue=""
                                        name="twitter"
                                        value={formdata.twitter}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div>
                                      <label className="block mb-2 text-sm font-medium text-gray-300">
                                        <div className="flex items-center space-x-2">
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
                                            className="w-4 h-4 lucide lucide-message-circle"
                                          >
                                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                          </svg>
                                          <span>Telegram</span>
                                        </div>
                                      </label>
                                      <input
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        placeholder="https://t.me/yourchannel"
                                        type="url"
                                        defaultValue=""
                                        name="telegram"
                                        value={formdata.telegram}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div>
                                      <label className="block mb-2 text-sm font-medium text-gray-300">
                                        <div className="flex items-center space-x-2">
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
                                            className="w-4 h-4 lucide lucide-message-circle"
                                          >
                                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                          </svg>
                                          <span>Discord</span>
                                        </div>
                                      </label>
                                      <input
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        placeholder="https://discord.gg/your-server"
                                        type="url"
                                        defaultValue=""
                                        name="discord"
                                        value={formdata.discord}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="pt-8 mt-8 border-t border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                      <div>
                                        <h3 className="text-lg font-medium text-gray-200">
                                          Modify Creator Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-400">
                                          Change the information of the creator in the metadata. By default,
                                          it is CoinFast.
                                        </p>
                                      </div>
                                      <div className="flex items-center space-x-2">

                                        <span className="text-sm text-gray-400">(+0.1 SOL)</span>
                                        <button
                                          className="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                          style={{ backgroundColor: "rgb(6, 182, 212)" }}
                                          onClick={handleAddSolFlag}
                                        >
                                          <span className="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-5 bg-white rounded-full shadow pointer-events-none ring-0" />
                                        </button>
                                      </div>
                                    </div>
                                    {formdata.addsolflag && (
                                      <div className="mt-4 space-y-4">
                                          <div>
                                          <label className="block mb-2 text-sm font-medium text-gray-300">
                                              Creator Name
                                          </label>
                                          <input
                                              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                              placeholder="Your name or organization"
                                              type="text"
                                              defaultValue="CoinFast"
                                              name="creatorName"
                                              value={formdata.creatorName}
                                              onChange={handleChange}
                                          />
                                          </div>
                                          <div>
                                          <label className="block mb-2 text-sm font-medium text-gray-300">
                                              Creator Website
                                          </label>
                                          <input
                                              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                              placeholder="https://yourmemecoinwebsite.fun"
                                              type="url"
                                              defaultValue="https://coinfast.fun"
                                              name="creatorWebsite"
                                              value={formdata.creatorWebsite}
                                              onChange={handleChange}
                                          />
                                          </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="pt-8 mt-8 border-t border-gray-700">
                                    <h3 className="mb-4 text-lg font-medium text-gray-200">
                                      Revoke Authorities
                                    </h3>
                                    <p className="mb-6 text-sm text-gray-400">
                                      Solana Token has 3 authorities: Freeze Authority, Mint Authority, and
                                      Update Authority. Revoke them to attract more investors. We highly
                                      recommend enabling these 3 options for gaining more trust.
                                    </p>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                      <div className="authority-card selected">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="icon-container">
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
                                              className="w-5 h-5 lucide lucide-lock text-cyan-400"
                                            >
                                              <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
                                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                          </div>
                                          <span className="price">+0.1 SOL</span>
                                        </div>
                                        <h4 className="title">Revoke Freeze</h4>
                                        <p className="description">
                                          Freeze Authority allows you to freeze token accounts of holders.
                                        </p>
                                        <button className="select-button selected">Selected</button>
                                      </div>
                                      <div className="authority-card selected">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="icon-container">
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
                                              className="w-5 h-5 lucide lucide-coins text-cyan-400"
                                            >
                                              <circle cx={8} cy={8} r={6} />
                                              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                                              <path d="M7 6h1v4" />
                                              <path d="m16.71 13.88.7.71-2.82 2.82" />
                                            </svg>
                                          </div>
                                          <span className="price">+0.1 SOL</span>
                                        </div>
                                        <h4 className="title">Revoke Mint</h4>
                                        <p className="description">
                                          Mint Authority allows you to mint more supply of your token.
                                        </p>
                                        <button className="select-button selected">Selected</button>
                                      </div>
                                      <div className="authority-card selected">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="icon-container">
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
                                              className="w-5 h-5 lucide lucide-pencil text-cyan-400"
                                            >
                                              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                              <path d="m15 5 4 4" />
                                            </svg>
                                          </div>
                                          <span className="price">+0.1 SOL</span>
                                        </div>
                                        <h4 className="title">Revoke Update</h4>
                                        <p className="description">
                                          Update Authority allows you to update the token metadata about
                                          your token.
                                        </p>
                                        <button className="select-button selected">Selected</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col-reverse items-center justify-between gap-3 mt-6 sm:flex-row">
                                <button className="w-full sm:w-auto gradient-button dark" onClick={()=>handlePrevStep(1)}>Back</button>
                                <div className="flex justify-end">
                                  <button className="w-full sm:w-auto gradient-button disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleCreateToken}>
                                    <span>Create Token</span>
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
                                      className="w-4 h-4 lucide lucide-chevron-right"
                                    >
                                      <path d="m9 18 6-6-6-6" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                  </div>
              </div>
          )}
        
          <HowToAndFaq />
          </div>
      </main>
      </div>
  </div>
    );
}

export default Createcoin;