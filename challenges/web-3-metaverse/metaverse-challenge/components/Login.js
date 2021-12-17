import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { HiChat } from "react-icons/hi";

const Login = () => {
    const { authenticate } = useMoralis();

    return (
        <div className="">
            <div className='flex flex-col absolute z-50 h-4/6 w-full items-center justify-center space-y-10'>
                <label className='text-5xl pb-10 text-[#fdd201]'>
                    <span className="font-thin">Meta</span>Chat
                </label>
                {/* <div className='flex flex-col h-32 w-32 mb-10 bg-[#fdd201] rounded-full items-center justify-center opacity-50'> */}
                    <Image
                        className=' rounded-full opacity-50'
                        src='/images/logo.jpg'
                        height={150}
                        width={150}
                    />
                {/* </div> */}
                <button
                    onClick={() => {
                        authenticate({ 
                            provider: "metamask",
                            mobileLinks: [
                                "metamask",
                                "trust",
                                "walletconnect",
                              ] 
                          
                        })
                    }}
                    className='bg-[#fdd201] rounded-lg py-2 px-4 font-bold items-center'
                >
                    Connect Wallet
                </button>
            </div>
            <div className='w-full h-screen'>
                {/* Background Image */}
                {/* <Image src='https://links.papareact.com/55n' layout='fill' objectFit='cover' /> */}
            </div>
        </div>
    )
}

export default Login
