// SearchBar.js
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        onSearch(inputValue);
    };

    return (
        <div className="relative">
            <div className="flex items-center bg-gray-700 text-white rounded p-2 w-64">
                <Search className="mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full"
                />
            </div>
        </div>
    );
};

export default SearchBar;
