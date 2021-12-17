import Head from 'next/head'
import Container from '../components/Container';
import Login from '../components/Login'
import Chat from '../components/Chat';
import { useMoralis } from 'react-moralis';


export default function Home() {
  const { isAuthenticated } = useMoralis();

  return (
    <Container>
      <Head>
        <title>MetaChat</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      { isAuthenticated ? <Chat /> : <Login /> }
    </Container>
  )
}
 