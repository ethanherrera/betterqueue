// hooks/useSpotifyAuth.js
import { useState, useEffect } from 'react';

export const useSpotifyAuth = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const hash = window.location.hash;
        let storedToken = localStorage.getItem('token');

        if (!storedToken && hash) {
            storedToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
            window.location.hash = '';
            localStorage.setItem('token', storedToken);
            setToken(storedToken);
        }

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return { token, handleLogout };
};
