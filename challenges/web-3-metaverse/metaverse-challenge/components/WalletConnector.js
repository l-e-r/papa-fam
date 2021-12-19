import { useState } from "react";
import Image from 'next/image';

import { useMoralis } from 'react-moralis';
import { BrowserView } from 'react-device-detect';

import { HiChevronDown } from 'react-icons/hi';
import { RingLoader } from 'react-spinners';


const WalletConnector = () => {
  const { authenticate, isAuthenticating } = useMoralis();
  const [optionsExpanded, setOptionsExpanded] = useState(false);

  const toggleOptions = () => {
    setOptionsExpanded(!optionsExpanded);
  }
  return (
    <div className='flex flex-col h-4/6 width-full items-center justify-center'>
      {isAuthenticating ? 
        <div className='flex flex-col items-center justify-center '>
           <RingLoader color={"#fdd201"} loading={isAuthenticating} size={120} />
           <div className='text-[#fdd201] animate-pulse'>Connecting</div>
        </div> 
      : (
        <div className='flex flex-col h-2/6 w-48'>
          <button
          className="flex flex-row justify-between text-black bg-[#fdd201] font-bold rounded-lg text-sm px-4 py-3 text-center inline-flex items-center"
          type="button"
          onClick={toggleOptions}>
            <span>Connect Wallet</span>
            <span ><HiChevronDown size={18}/></span>
          </button>

          {/* Dropdown menu */}
          <div className={`${!optionsExpanded ? "hidden" : null} bg-white text-base z-50 list-none  rounded shadow my-1`}>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <BrowserView>
                      <button
                          onClick={() => {
                              authenticate({ 
                                  provider: "metamask"
                              });
                              toggleOptions();
                          }}
                          className='bg-white rounded-lg pt-2 px-4 font-bold items-center'
                      >
                          <Image src='/images/metamask.svg' height={40} width={150} />
                      </button>
                  </BrowserView>
                </li>
                <li>
                  <button
                      onClick={() => {
                          authenticate({ 
                              provider: "walletconnect",
                              mobileLinks: [
                                  "metamask",
                                  "trust",
                                ] 
                          });
                          toggleOptions();
                      }}
                      className='bg-white rounded-lg pt-1 px-4 font-bold items-center'
                  >
                      <Image src='/images/walletconnect.svg' height={40} width={150} />
                  </button>
                </li>
              </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnector
