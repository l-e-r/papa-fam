import Head from "next/head";
import Image from "next/image";

import { SplashContainer } from "../components/SplashContainer";
import { ChatApp } from "./ChatApp";


export default function Home() {
    return (
        <div className='w-screen h-screen bg-[#02224e]'>
            <Head>
                <title>MetaChat</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Image src='/images/background.jpg' layout='fill' objectFit="cover" />

            {/* Higher-Order Component to render splash screen then child components */}
            <SplashContainer>
                <ChatApp />
            </SplashContainer>
        </div>
    )
}