// LandingPage.js
import React from 'react';

const LandingPage = ({ onStartSession, onJoinSession }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-5xl mb-4">BetterQueue</h1>
            <p className="text-xl mb-8">Start the DEFINITIVE queue-ing experience with your friends now!</p>
            <div className="flex space-x-4">
                <button
                    onClick={onStartSession}
                    className="bg-green-500 p-4 rounded transform transition-all duration-200 hover:scale-105 hover:bg-green-600 active:scale-95 active:bg-green-700"
                >
                    Start a session
                </button>
                <button
                    onClick={onJoinSession}
                    className="bg-blue-500 p-4 rounded transform transition-all duration-200 hover:scale-105 hover:bg-blue-600 active:scale-95 active:bg-blue-700"
                >
                    Join a session
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
