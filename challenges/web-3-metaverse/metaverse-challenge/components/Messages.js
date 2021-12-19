import { useRef } from 'react';
import { ByMoralis, useMoralis, useMoralisQuery } from 'react-moralis';

import Message from '../components/Message';
import SendMessage from '../components/SendMessage';

// Only show messages from the last 15 minutes
const MINS_DURATION = 150000;

const Messages = () => {
    const { user } = useMoralis();
    const endOfMessagesRef = useRef(null);
    const { data, loading, error } = useMoralisQuery(
        'Messages',
        (query) => 
            query
                .ascending('createdAt')
                .greaterThan('createdAt',
                    new Date(Date.now() - 1000 * 60 * MINS_DURATION)
                ),
        [],
        {
            live: true
        }
    );


    return (
        <div className='pb-56'>
            
            <div className='space-y-10 p-4'>
                {data.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>

            <div className='flex justify-center'>
                <SendMessage endOfMessagesRef={endOfMessagesRef} />
                <div className='flex fixed bottom bottom-0 opacity-50 scale-75'>
                    <ByMoralis variant='dark' style={{ marginLeft: 'auto', marginRight: 'auto'}} />
                </div>
            </div>

            <div
                ref={endOfMessagesRef}
                className='text-center text-gray-400 mt-5'>
                <p>You're up to date {user.getUsername()}! 🎉</p>
            </div>
        </div>
    )
}

export default Messages
