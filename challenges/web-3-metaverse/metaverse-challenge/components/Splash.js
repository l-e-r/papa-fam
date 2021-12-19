import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Splash = ({children}) => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 4000);  
    }, []);

    return !loading ? children : (
        <motion.div initial={{y: 500, scale: 1.0}} animate={{y: 50, scale: 0.5,}} transition={{delay: 2, duration: 1}}>
            <div className='flex flex-col absolute z-50 h-full w-full items-center justify-center space-y-10'>
                <label className='text-5xl pb-10 text-[#fdd201]'>
                    <span className="font-thin">Meta</span>Chat
                </label>
            </div>
        </motion.div>
    ) 
}

export default Splash
