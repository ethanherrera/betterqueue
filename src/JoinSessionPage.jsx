// JoinSessionPage.js
import React from 'react';

const JoinSessionPage = ({ onSubmit, onBack }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h2 className="text-2xl mb-4">Enter your host's session ID:</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    className="p-4 text-black rounded-l-lg"
                    placeholder="Session ID"
                />
                <button
                    onClick={onSubmit}
                    className="bg-blue-500 p-4 rounded-r-lg transform transition-all duration-200 hover:scale-105 hover:bg-blue-600 active:scale-95 active:bg-blue-700"
                >
                    Submit
                </button>
            </div>
            <button
                onClick={onBack}
                className="mt-4 bg-red-500 p-2 rounded transform transition-all duration-200 hover:scale-105 hover:bg-red-600 active:scale-95 active:bg-red-700"
            >
                Back
            </button>
        </div>
    );
};

export default JoinSessionPage;
