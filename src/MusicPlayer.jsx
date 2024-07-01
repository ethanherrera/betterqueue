// MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SongItem from './SongItem';
import CurrentlyPlaying from './CurrentlyPlaying';
import NowPlaying from './NowPlaying';
import LoadingScreen from './LoadingScreen';
import SearchBar from './SearchBar';

const initialPlaylist = [
    { id: 1, title: 'The Way You Look Tonight', artist: 'Frank Sinatra', cover: `${process.env.PUBLIC_URL}/americanidiot.png`, votes: 0 },
    { id: 2, title: 'You Can Call Me Al', artist: 'Paul Simon', cover: `${process.env.PUBLIC_URL}/americanidiot.png`, votes: 0 },
    { id: 3, title: 'The Queen of Hearts', artist: 'Ezra Furman', cover: `${process.env.PUBLIC_URL}/americanidiot.png`, votes: 0 },
    { id: 4, title: 'Summer Days (feat. Macklemore)', artist: 'Martin Garrix', cover: `${process.env.PUBLIC_URL}/americanidiot.png`, explicit: true, votes: 0 },
    { id: 5, title: 'Radio Ga Ga', artist: 'Queen', cover: `${process.env.PUBLIC_URL}/americanidiot.png`, votes: 0 },
    { id: 6, title: 'Rescue Me', artist: 'OneRepublic', cover: `${process.env.PUBLIC_URL}/americanidiot.png`, votes: 0 },
];

const MusicPlayer = ({ onLogout }) => {
    const [playlist, setPlaylist] = useState(initialPlaylist);
    const [username, setUsername] = useState('Default User');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchBarRef = useRef();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setUsername(data.display_name);
                setProfilePic(data.images[0]?.url);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSearch = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setSearchResults(data.tracks.items);
        } catch (error) {
            console.error('Error searching Spotify:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleVote = (id, increment) => {
        const updatedPlaylist = playlist
            .map(song => (song.id === id ? { ...song, votes: song.votes + increment } : song))
            .sort((a, b) => b.votes - a.votes);

        setPlaylist(updatedPlaylist);
    };

    const addToPlaylist = (track) => {
        const newTrack = {
            id: track.id,
            title: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            cover: track.album.images[0].url,
            votes: 0,
        };
        setPlaylist(prevPlaylist => [...prevPlaylist, newTrack]);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="bg-[#121212] text-white p-4 h-full w-full flex flex-col">
            <div className="relative flex items-center justify-between mb-4" ref={searchBarRef}>
                <SearchBar onSearch={handleSearch} />
                <div className="flex items-center">
                    <div
                        className="flex items-center cursor-pointer hover:bg-gray-500 p-2 rounded"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {profilePic && <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />}
                        <span>{username}</span>
                        <ChevronDown className="ml-2" />
                    </div>
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-1 bg-gray-800 p-2 rounded shadow-lg"
                            >
                                <button onClick={onLogout} className="bg-red-500 p-2 rounded">
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="relative">
                {searchResults.length > 0 && (
                    <div className="absolute bg-gray-800 text-white rounded mt-1 shadow-lg w-64 max-h-64 overflow-y-auto">
                        {searchResults.map((track) => (
                            <div key={track.id + Math.random() + Math.random()} className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={() => addToPlaylist(track)}>
                                <img src={track.album.images[2].url} alt="Album cover" className="w-10 h-10 mr-2 rounded" />
                                <div>
                                    <div>{track.name}</div>
                                    <div className="text-sm text-gray-400">{track.artists.map((artist) => artist.name).join(', ')}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <CurrentlyPlaying />
            <NowPlaying />
            <div className="flex-grow overflow-y-auto">
                <AnimatePresence>
                    {playlist.map((song) => (
                        <SongItem key={song.id} song={song} handleVote={handleVote} username={username} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MusicPlayer;
