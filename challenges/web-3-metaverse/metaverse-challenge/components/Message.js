import { useMoralis } from "react-moralis";
import TimeAgo from 'timeago-react';
import Avatar from "./Avatar";

const Message = ({ message }) => {
    const { user } = useMoralis();

    const isUserMessage = message.get('userId') === user.id;

    return (
        <div className={`flex items-end space-x-2 relative ${isUserMessage && 'justify-end'}`}>
            
            <div className={`relative h-8 w-8 ${isUserMessage && 'order-last ml-2'}`}>
                <Avatar username={message.get('username')}/>
            </div>
            
            <div className={`flex space-x-4 p-3 rounded-lg 
                ${isUserMessage
                    ? 'rounded-br-none bg-yellow-400 border border-gray'
                    : 'rounded-bl-none bg-black text-gray-300 border border-yellow-400'}`}>
            <p>{message.get('message')}</p>
           </div>

           <TimeAgo datetime={message.createdAt} className={`text-[10px] italic text-gray-400 ${isUserMessage && 'order-first pr-1'}`}/>

           <p className={`absolute -bottom-5 text-xs ${isUserMessage ? 'text-yellow-300' : 'text-gray-300'}`}>
               {message.get('username')}
            </p>
        </div>
    )
}

export default Message
