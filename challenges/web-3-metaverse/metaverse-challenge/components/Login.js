import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { BrowserView } from 'react-device-detect';

const Login = () => {
    const { authenticate } = useMoralis();

    return (
        <div className="">
            <div className='flex flex-col absolute z-50 h-4/6 w-full items-center justify-center space-y-10'>
                <BrowserView>
                    <button
                        onClick={() => {
                            authenticate({ 
                                provider: "metamask"
                            })
                        }}
                        className='bg-white rounded-lg pt-2 px-4 font-bold items-center'
                    >
                        <Image src='/images/metamask.svg' height={40} width={150} />
                    </button>
                </BrowserView>
                <button
                    onClick={() => {
                        authenticate({ 
                            provider: "walletconnect",
                            mobileLinks: [
                                "metamask",
                                "trust",
                              ] 
                        })
                    }}
                    className='bg-white rounded-lg pt-1 px-4 font-bold items-center'
                >
                    <Image src='/images/walletconnect.svg' height={40} width={150} />
                </button>
            </div>
        </div>
    )
}

export default Login
