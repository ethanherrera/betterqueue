// CurrentlyPlaying.js
import React, { useState, useEffect } from 'react';

const CurrentlyPlaying = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchCurrentSong = async () => {
            if (!token) return;

            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentSong({
                        title: data.item.name,
                        artist: data.item.artists.map(artist => artist.name).join(', '),
                        cover: data.item.album.images[0].url,
                    });
                } else {
                    setCurrentSong(null);
                }
            } catch (error) {
                console.error('Error fetching currently playing song:', error);
            }
        };

        fetchCurrentSong();
        const interval = setInterval(fetchCurrentSong, 5000); // Poll every 10 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [token]);

    return (
        <div className="flex items-center mb-6">
            {currentSong ? (
                <>
                    <img src={currentSong.cover} alt="Album cover" className="w-14 h-14 rounded-lg" />
                    <div className="ml-4 flex-grow">
                        <h2 className="text-sm text-gray-400">Currently Playing</h2>
                        <h1 className="text-2xl font-semibold">{currentSong.title}</h1>
                        <p className="text-lg text-gray-400">{currentSong.artist}</p>
                    </div>
                </>
            ) : (
                <p className="text-2xl text-gray-400">No song currently playing</p>
            )}
        </div>
    );
};

export default CurrentlyPlaying;
