"use client"

import TabSwitcher from "../components/tabswitcher";
import SearchBar from "../components/search-bar";
import React, {useEffect, useState} from "react";
import Data from "../api/data";
import {fetchDataBasedOnInput} from "../api/api";
export default function Home() {
    const [inputValue, setInputValue] = useState('HaNoi');
    const [coord, setCoord] = useState(null);
    const [weatherData, setWeatherData] = useState<any>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };

    useEffect(() => {
        fetchDataBasedOnInput(inputValue, setCoord, setWeatherData);
    }, [inputValue]);

    return (
    <main className="flex flex-col md:flex-row gap-6">
        <div className={"flex flex-col gap-6 bg-amber-100 p-6 rounded-2xl"}>
            <SearchBar
                inputValue={inputValue}
                handleInputChange={handleInputChange}
            />
            <Data coord={coord} weatherData={weatherData} />
        </div>
        <div className={"w-full p-6"}>
            <TabSwitcher coord={coord} weatherData={weatherData}/>
        </div>
    </main>
  )
}
