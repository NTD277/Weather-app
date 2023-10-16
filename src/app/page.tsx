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
    <main className="flex flex-col md:flex-row gap-6">
        <div className={"flex flex-col gap-6 bg-amber-100 p-6 rounded-2xl"}>
            <SearchBar
                inputValue={inputValue}
                handleInputChange={handleInputChange}
            />
            <Data inputValue={inputValue} />
        </div>
        <div className={"w-full p-6"}>
            <TabSwitcher inputValue={inputValue}/>
        </div>
    </main>
  )
}
