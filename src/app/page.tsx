"use client"

import Desciption from "../components/desciption";
import TabSwitcher from "../components/tabswitcher";
import SearchBar from "../components/search-bar";
import React, {useState} from "react";
export default function Home() {
    const [inputValue, setInputValue] = useState('');

    // @ts-ignore
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
            <p>{inputValue}</p>
            <Desciption />
        </div>
        <div className={""}>
            <TabSwitcher />
        </div>
    </main>
  )
}
