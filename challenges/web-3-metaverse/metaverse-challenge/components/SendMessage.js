import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useRecoilValue } from 'recoil';
import { ActiveChatState } from '../atoms/ChatState.atom';

const SendMessage = ({endOfMessagesRef})  => {
    const { user, Moralis } = useMoralis();
    const [ message, setMessage ] = useState(null);
    const activeChatId = useRecoilValue(ActiveChatState);

    const sendMessage = (e) => {
        e.preventDefault();

        if (!message) return;

        const Messages = Moralis.Object.extend("Messages");
        const messages = new Messages();

        messages.save({
            message: message,
            username: user.getUsername(),
            userId: user.id,
            chatId: activeChatId
        }).then(
            (message) => {
                // successfully saved message
            },
            (error) => {
                // error saving the message
                console.log(error.message);
            }
        );

        endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth'});
        setMessage('');
    };

    return (
        <form className='flex fixed bottom bottom-5 bg-black opacity-80 w-11/12 px-6 py-4 max-w-xl shadow-2xl rounded-full border-4 border-yellow-200'>
            <input
                type='text'
                className='flex-grow outline-none bg-transparent text-white placeholder-gray-500 pr-5'
                placeholder={`Enter a Message ${user.getUsername()}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type='submit' 
                className='font-bold text-yellow-500'
                onClick={sendMessage}
            >
                Send
            </button>
        </form>
    )
}

export default SendMessage
