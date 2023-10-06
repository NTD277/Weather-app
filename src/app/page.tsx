"use client"

import TabSwitcher from "../components/tabswitcher";
import SearchBar from "../components/search-bar";
import React, {useState} from "react";
import Data from "../api/data";
export default function Home() {
    const [inputValue, setInputValue] = useState('HaNoi');
    const [coord, setCoord] = useState(null);

    const handleInputChange = (e) => {
        const newValue = e.target.value;

        setInputValue(newValue);
    };

    return (
    <main className="flex flex-row gap-8">
        <div>
            <SearchBar
                inputValue={inputValue}
                handleInputChange={handleInputChange}
            />
            <Data inputValue={inputValue} />
        </div>
        <div className={""}>
            <TabSwitcher inputValue={inputValue}/>
        </div>
    </main>
  )
}
