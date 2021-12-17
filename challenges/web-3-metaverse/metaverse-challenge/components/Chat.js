import { useMoralis } from 'react-moralis';


const Chat = () => {
    const { logout } = useMoralis();

    return (
        <div className='flex flex-col h-4/6 w-full items-center justify-center space-y-5'>
        <label className='text-white text-3xl'>Welcome to</label>
        <label className='text-5xl pb-10 text-[#fdd201]'>
            <span className="font-thin">Meta</span>Chat
        </label>
        <button
          onClick={logout}
          className='bg-[#fdd201] rounded-lg py-2 px-4 font-bold items-center'
        >
          Logout
        </button>
      </div>
    )
}

export default Chat