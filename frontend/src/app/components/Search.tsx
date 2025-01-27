import React, { useState } from 'react';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', query);
        // Add your search logic here
    };

    return (
        <div className='flex w-full h-full'>
        <div className='w-1/4 '></div>
        <div className='w-1/2 h-1/3 bg-gradient-to-b from-[#344e41] to-[#3a5a40]/80 rounded-b-[60px] z-20'>
        <div className='flex flex-col'>
        <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className='w-1/2 p-4 rounded-lg'
            />
            <button onClick={handleSearch}>Search</button>
        </div>

        </div>
        <div className='w-1/4'></div>
        </div>

    );
};

export default Search;