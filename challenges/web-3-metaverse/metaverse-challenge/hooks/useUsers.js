import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export const useUsers = () => {
    const [ appUsers, setAppUsers ] = useState(null);
    const { isAuthenticated, user, Moralis} = useMoralis();

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchAppUsers = async () => {
            const users = await Moralis.Cloud.run("getUsers", {currentUser: user.getUsername()});
            setAppUsers(users);
        }

        fetchAppUsers();

    }, [isAuthenticated, user, Moralis]);

    return appUsers;
}