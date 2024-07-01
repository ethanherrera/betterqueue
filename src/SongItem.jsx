// SongItem.js
import React from 'react';
import { ChevronUp, ChevronDown, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const SongItem = ({ song, handleVote, username }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        layout
        className="flex items-center mb-4"
    >
        <img src={song.cover} alt={`${song.title} cover`} className="w-12 h-12 rounded-lg" />
        <div className="ml-4 flex-grow">
            <div className="text-sm font-semibold flex items-center">
                {song.title}
                {song.explicit && (
                    <span className="text-xs bg-gray-600 text-white px-1 rounded ml-2">E</span>
                )}
            </div>
            <div className="text-xs text-gray-400">{song.artist}</div>
        </div>
        <div className="text-xs text-gray-400 mr-4">Added by: {username}</div>
        <div className="flex items-center space-x-2 mr-2">
            <button onClick={() => handleVote(song.id, 1)} className="text-gray-400 hover:text-white">
                <ChevronUp size={16} />
            </button>
            <span className="text-sm">{song.votes}</span>
            <button onClick={() => handleVote(song.id, -1)} className="text-gray-400 hover:text-white">
                <ChevronDown size={16} />
            </button>
        </div>
        <Menu size={16} className="text-gray-400" />
    </motion.div>
);

export default SongItem;
