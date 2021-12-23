import { useState, useEffect, Fragment } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { RiChatHistoryLine, RiChatNewLine } from 'react-icons/ri';
import { GiCheckMark } from 'react-icons/gi';

import Avatar from '../components/Avatar';
import { Logo } from '../components/Logo';

import { useMoralis } from 'react-moralis';
import { useUsers } from '../hooks/useUsers';
import { useChat } from '../hooks/useChat';

import { ActiveChatState, UserChatsState } from '../atoms/ChatState.atom';
import { useRecoilState, useRecoilValue } from 'recoil';


export const Header = () => {
    const { user, Moralis, logout } = useMoralis();
    const [ isNewChatModalOpen, setIsNewChatModalOpen ] = useState(false);
    const [ isChatListOpen, setIsChatListOpen ] = useState(false);
    const users = useUsers();
    const { Chat } = useChat();
    const userChats = useRecoilValue(UserChatsState);
    const [ activeChatId, setActiveChatId ] = useRecoilState(ActiveChatState);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    function togglNewChateModal() {
        setIsNewChatModalOpen(!isNewChatModalOpen);
        setSelectedUser([]);
    }

    function toggleChatListDrawer() {
        setIsChatListOpen(!isChatListOpen);
    }

    const [selectedUser, setSelectedUser] = useState([]);

    const handleUserClick = (event, id) => {

        var array = [...selectedUser]; // make a separate copy of the array
        var index = array.indexOf(id)
        if (index !== -1) {
          array.splice(index, 1);
          setSelectedUser(array);
        } else {
            setSelectedUser([...selectedUser, id]);
        }
    };

    return (
        <>
            <div className='flex flex-row w-screen h-fill pt-5'>
                <div className='fixed left-5 mt-2 sm:mt-0'>
                    <button onClick={toggleChatListDrawer} className='text-4xl sm:text-5xl text-orange-500'> 
                        <RiChatHistoryLine />
                    </button>
                    <Drawer
                        anchor={'left'}
                        open={isChatListOpen}
                        onClose={toggleChatListDrawer}
                    >
                        <Box
                            sx={{ width: 300 }}
                            role="presentation"
                        >
                            <Typography id="modal-modal-title" variant="h6" component="h2" className='p-5 border-b'>
                             Messages
                            </Typography>
                            <List>
                                {userChats && userChats.map((chat) => (
                                    <ListItemButton key={chat.objectId}
                                        onClick={() => {
                                            toggleChatListDrawer();
                                            setActiveChatId(chat.objectId);
                                        }}
                                    >
                                        <ListItemText
                                            primary={chat.objectId}
                                        />
                                    </ListItemButton>
                                ) )}
                            </List>
        
                        </Box>
                    </Drawer>
                </div>
                <div className='fixed left-20 sm:left-28 mt-2 sm:mt-0 '>
                    <button onClick={togglNewChateModal} className='text-4xl sm:text-5xl text-green-500'> 
                        <RiChatNewLine />
                    </button>
                </div>
                <div className='fixed w-1/2 mx-auto inset-x-0 text-center'>
                    <Logo />
                </div>
                <div className='fixed right-5 h-10 w-10 sm:h-14 sm:w-14 mt-1 sm:mt-0 border-pink-500 border-2 rounded-full'>
                    <button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar />
                    </button>
                    <Menu
                        className='mt-6 sm:mt-10'
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
            <Modal
                open={isNewChatModalOpen}
                onClose={togglNewChateModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 lg:w-1/3 bg-slate-200 border-2 border-white shadow-sm  p-4 rounded-lg space-y-5'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Chat
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Select user(s) to chat with.
                        </Typography>
                        <List>
                            {users && users.map((user) => (
                                <ListItemButton key={user.id}
                                    selected={selectedUser.includes(user.id)}
                                    onClick={(event) => handleUserClick(event, user.id)}
                                >
                                    <ListItemIcon>
                                        {selectedUser.includes(user.id)
                                            ? <GiCheckMark className='text-2xl text-green-500'/>
                                            : null}
                                   </ListItemIcon>
                                    <ListItemAvatar>
                                        <div className='relative h-10 w-10'>
                                            <Avatar username={user.getUsername()} />
                                        </div>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.getUsername()}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                        <div className='flex flex-row justify-center items-center space-x-5'>
                            <Button variant="contained" onClick={() =>{ Chat.create(selectedUser); togglNewChateModal();}} disabled={!selectedUser.length}>Create</Button>
                            <Button variant="text" onClick={togglNewChateModal}>Cancel</Button>
                        </div>
                    </Box>
                </Modal>
        </>
    )
}

export default Header
