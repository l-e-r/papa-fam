import { useMoralis } from 'react-moralis';


const ChangeUsername = () => {
    const { setUserData, isUserUpdating, userError, user} = useMoralis();

    const setUserName = () => {
        const username = prompt(`Enter your new Username (current: ${user.getUsername()})`);

        if (!username) return;

        setUserData({username: username});
    }

    return (
        <div>
            <button
            disabled={isUserUpdating}
            className='text-sm opacity-50 hover:opacity-100'
            onClick={() => setUserName()}
            >
                 Edit Username
            </button>
        </div>
    )
}

export default ChangeUsername
