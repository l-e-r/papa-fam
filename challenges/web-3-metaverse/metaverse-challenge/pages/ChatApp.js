/**
 *  Chat App
 * 
 *  This page represents the chat app.
 * 
 **/

import { useRecoilValue } from 'recoil';
import { ActiveChatState } from '../atoms/ChatState.atom';

import Header from '../components/Header';
import Messages from '../components/Messages';


export const ChatApp = () => {
    const activeChatId = useRecoilValue(ActiveChatState);

    return (
        <div className='flex flex-col w-screen h-screen'>
            {/* Chat Header */}
            <Header />

            {/* Sent/Received Message Content */}
            { activeChatId ? <Messages /> : null }

        </div>
    )
}