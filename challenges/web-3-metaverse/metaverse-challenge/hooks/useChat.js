import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

import { useRecoilState } from 'recoil';
import { UserChatsState, ActiveChatState } from '../atoms/ChatState.atom';

export const useChat = () => {
    const [ userChats, setUserChats ] = useRecoilState(UserChatsState);
    const [ activeChatId, setActiveChatId] = useRecoilState(ActiveChatState);
    const { isAuthenticated, user, Moralis} = useMoralis();

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchChats = async () => {
            const chats = await Moralis.Cloud.run("getChats", { currentUser: user.id});
            console.log(chats);
            setUserChats(chats);
        }

        fetchChats();

    }, [isAuthenticated, Moralis]);


    const chat = {
        create: async (selectedUser) => {
            await Moralis.Cloud.run("createChat", {users: [...selectedUser, user.id]})
            .then(chatId => {
                setActiveChatId(chatId);
            });
        }
    }


    return { chats: userChats, activeChatId: activeChatId, Chat: chat };
}