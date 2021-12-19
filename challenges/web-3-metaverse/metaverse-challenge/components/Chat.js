import { useMoralis } from 'react-moralis';
import Messages from '../components/Messages';

const Chat = () => {
    const { user } = useMoralis();

    return (
        <div className=''>
          <Messages />

      </div>
    )
}

export default Chat