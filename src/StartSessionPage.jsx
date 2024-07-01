// StartSessionPage.js
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const StartSessionPage = ({ onSpotifyLogin, onBetterQueue }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h2 className="text-2xl mb-4">Select which platform to start a session on:</h2>
            <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <button
                        onClick={onSpotifyLogin}
                        className="bg-green-500 p-4 rounded transform transition-all duration-200 hover:scale-105 hover:bg-green-600 active:scale-95 active:bg-green-700"
                    >
                        Login with Spotify
                    </button>
                    <Tooltip title="lol" arrow>
                        <InfoIcon className="text-white ml-2" />
                    </Tooltip>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={onBetterQueue}
                        className="bg-blue-500 p-4 rounded transform transition-all duration-200 hover:scale-105 hover:bg-blue-600 active:scale-95 active:bg-blue-700"
                    >
                        Start a BetterQueue Session
                    </button>
                    <Tooltip title="lol" arrow>
                        <InfoIcon className="text-white ml-2" />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default StartSessionPage;
