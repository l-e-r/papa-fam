import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import Modal from 'react-modal';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffffff',
      width: '300px',
      borderRadius: '10px'
    },
  };


Modal.setAppElement('#__next');



const ChangeUsername = () => {
    const { setUserData, isUserUpdating, userError, user} = useMoralis();
    const [ username, setUsername ] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);


    const submitUserName = (e) => {
        // const username = prompt(`Enter your new Username (current: ${user.getUsername()})`);
        e.preventDefault();

        if (!username) return;

        setUserData({username: username});
        setUsername('');
        closeModal();
    }

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    return (
        <div>
            <button
            disabled={isUserUpdating}
            className='text-sm opacity-50 hover:opacity-100'
            onClick={() => openModal()}
            >
                 Edit Username
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className='-m-5 mb-5 p-2 font-bold bg-[#fdd201]'>
                    <span>Change Username</span>
                </div>
                <form>
                <input type='text'
                    placeholder='Enter new name'
                    className='outline-none border border-gray-200 mb-5 w-full p-2'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className='flex flex-row justify-evenly'>
                    <button type='submit' onClick={submitUserName} className='font-bold bg-[#fdd201] w-100 p-2 rounded-md'>Submit</button>
                    <button onClick={closeModal} className='border border-[#fdd201] width-100 p-2 rounded-md'>Close</button>
                </div>
                
                </form>
            </Modal>
        </div>
    )
}

export default ChangeUsername
