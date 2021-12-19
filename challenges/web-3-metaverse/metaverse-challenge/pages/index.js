import { useState } from 'react';
import Head from 'next/head'
import { useMoralis } from 'react-moralis';

import Header from '../components/Header';
import WalletConnector from '../components/WalletConnector';
import Chat from '../components/Chat';


export default function Home() {
  const { isAuthenticated } = useMoralis();
  const [isHeaderReady, setIsHeaderReady] = useState(false);

  return (
    <div className='h-screen bg-gradient-to-b from-black via-black to-yellow-500 overflow-hidden'>
      <Head>
        <title>MetaChat</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
        <div className='h-screen max-w-screen-sm mx-auto overflow-y-scroll scrollbar-hide scrollbar-hide' >
          <Header onLoaded={setIsHeaderReady} />
          { isHeaderReady ? isAuthenticated ? <Chat /> : <WalletConnector /> : null}
        </div>
    </div>
  )
}
  