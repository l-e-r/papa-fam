import { useRef } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { useEffect } from 'react/cjs/react.development';
import { useRecoilValue } from 'recoil';
import { ActiveChatState } from '../atoms/ChatState.atom';

import Message from '../components/Message';
import SendMessage from '../components/SendMessage';

// Only show messages from the last 15 minutes
// const MINS_DURATION = 150000;

const Messages = () => {
    const { user } = useMoralis();
    const activeChatId = useRecoilValue(ActiveChatState);
    const endOfMessagesRef = useRef(null);
    const { data, loading, error } = useMoralisQuery(
        'Messages',
        (query) => 
            query
                .ascending('createdAt')
                .equalTo('chatId', activeChatId),
        [activeChatId],
        {
            live: true
        }
    );

    useEffect(() => {
        if (data) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    },[data, endOfMessagesRef])


    return (
        <div className='relative flex flex-col w-full md:w-1/2 h-full space-y-5 mx-auto mt-20 mb-5 overflow-hidden'>
            <div className='flex flex-col w-full h-fill bg-white bg-opacity-50 rounded-xl overflow-scroll scrollbar-hide mt-4 mb-20 pb-4'>

                <div className='space-y-10 p-4'>
                    {data.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>

                <div
                    ref={endOfMessagesRef}
                    className='text-center text-gray-400 mt-5'>
                    <p>You're up to date {user.getUsername()}! 🎉</p>
                </div>

            </div>
            <div className='flex justify-center'>
                <SendMessage endOfMessagesRef={endOfMessagesRef} />
            </div>

        </div>
    )
}

export default Messages
