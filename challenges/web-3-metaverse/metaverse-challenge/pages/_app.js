import { MoralisProvider } from 'react-moralis';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <RecoilRoot>
      <MoralisProvider appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
        <Component {...pageProps} />
      </MoralisProvider>
    </RecoilRoot>
  )
}

export default MyApp
