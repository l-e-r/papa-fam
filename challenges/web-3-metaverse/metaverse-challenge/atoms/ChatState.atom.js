import { atom } from "recoil";

export const ActiveChatState = atom({
    key: 'ActiveChatState',
    default: ''
  });

  export const UserChatsState = atom({
    key: 'UserChatsState',
    default: []
  });
