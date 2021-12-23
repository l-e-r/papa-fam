import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WalletConnector from './WalletConnector';
import { ByMoralis, useMoralis } from 'react-moralis';
import { Logo } from './Logo';

export const SplashContainer = ({children}) => {
    const [loading, setLoading] = useState(true);
    const {user} = useMoralis();
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 4000);  
    }, []);

    const renderSplash = () => (
        <>
            <motion.div initial={{y: 350, scale: 2.0}} animate={{y: 20, scale: 1.0,}} transition={{delay: 2, duration: 1}}>
                <div className='flex flex-col absolute h-full w-full items-center'>
                    <Logo />
                </div>
            </motion.div>

            <div className='absolute bottom-10 w-full'>
                <ByMoralis variant='dark' style={{ marginLeft: 'auto', marginRight: 'auto'}} />
            </div>
        </>


    )

    const renderConnector = () => (
        <>
                <div className='flex flex-col absolute h-fill w-full items-center mt-5'>
                    <Logo />
                </div>

            <WalletConnector/> 

            <div className='absolute bottom-10 w-full'>
                <ByMoralis variant='dark' style={{ marginLeft: 'auto', marginRight: 'auto'}} />
            </div>
        </>
            
    )

    const renderChildren = () => (
        <>
            {user && children ? (children) : null}
        </>    
    )
    
    return !loading ? !user ? renderConnector(): renderChildren() : renderSplash()
}
