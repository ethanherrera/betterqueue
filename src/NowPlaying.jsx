// NowPlaying.js
import React from 'react';
import { Shuffle, Repeat, Menu } from 'lucide-react';

const NowPlaying = () => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Playing Next</h2>
            <div className="flex space-x-4">
                <p className="text-xs text-gray-400">From My Shazam Tracks</p>
                <Shuffle size={16} className="text-gray-400" />
                <Repeat size={16} className="text-gray-400" />
                <Menu size={16} className="text-gray-400" />
            </div>
        </div>
    </div>
);

export default NowPlaying;
