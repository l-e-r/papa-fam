import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { shuffle } from 'lodash';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
];


function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlayList] = useRecoilState(playlistState);


    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlayList(data.body);
        }).catch((err) => console.log('Something went wrong!', err));
    }, [spotifyApi, playlistId]);

    return (
        <div className='flex-grow'>
            <header className='absolute top-5 right-8' >
                <div onClick={signOut} className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
                    { session?.user.image ?
                        (
                            <img className='rounded-full w-10 h-10' src={session?.user.image} alt="" />
                        )
                        :
                        (
                            <div className='flex rounded-full w-10 h-10 bg-white items-center justify-center'>
                                <UserIcon className='w-8 h-8 text-black' />
                            </div>
                        )
                    }
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt='' />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold'>{playlist?.name}</h1>
                </div>
            </section>

            <div className='h-screen overflow-y-scroll scrollbar-hide'>
                <Songs />
            </div>

        </div>
    )
}

export default Center
