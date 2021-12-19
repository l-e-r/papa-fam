import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMoralis } from 'react-moralis';
import Image from 'next/image';

import Avatar from '../components/Avatar';
import ChangeUsername from '../components/ChangeUsername';


const Header = ({onLoaded}) => {
    const {isAuthenticated, user} = useMoralis();
    const [animateHeader, setAnimateHeader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            onLoaded(true);
        }, 3000);  
    }, []);

    return (
        <div className='flex flex-col text-[#fdd201] sticky top-0 z-30 shadow-sm bg-black'>
            {!isAuthenticated && animateHeader ?
                <div className='flex flex-row justify-center'>
                    <motion.div initial={{y: 500, scale: 1.0}} animate={{y: 10, scale: 0.5,}} transition={{delay: 2, duration: 1}}>
                        <label className='text-5xl'>
                            <span className="font-thin">Meta</span>Chat
                        </label>
                    </motion.div>
                </div>
            : isAuthenticated ?
                <>
                    <div className='flex flex-row p-5 justify-between items-center text='>
                        <div className=''>
                            <div className='relative h-16 w-16 border-[#fdd201] border-4 rounded-full justify-left'>
                                <Avatar logoutOnPress />
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center'>
                            <div className='scale-50'>
                                <label className='text-5xl'>
                                    <span className="font-thin">Meta</span>Chat
                                </label>
                            </div>
                        </div>
                        <div className='text-center'>
                            <ChangeUsername />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center pb-5 border-b-2 border-[#fdd201] border-opacity-25'>
                        <div className='flex flex-col justify-center'>
                            <h1 className='text-lg'>Welcome to the chat</h1>
                            <h2 className='text-2xl text-center truncate'>{user.getUsername()}</h2>
                        </div>
                    </div>
                </>
            : null }
        </div>
    ) 
}

export default Header
