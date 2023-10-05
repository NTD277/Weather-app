import React, { useState } from 'react';

// @ts-ignore
function SearchBar({inputValue, handleInputChange}) {
    return (
        <div>
            <input
                className="rounded-lg p-2"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={"Search"}
            />
        </div>
    );
}

export default SearchBar;
