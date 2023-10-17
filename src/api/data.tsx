import React, { useEffect, useState } from 'react';
import { fetchDataBasedOnInput } from './api';
import { AiOutlineCloud , AiOutlineFieldTime } from 'react-icons/ai';
import { MdOutlineDescription } from 'react-icons/md';
import { LiaCalendarDaySolid } from 'react-icons/lia'
import { CiTempHigh, CiLocationOn } from 'react-icons/ci'

import axios from 'axios';

interface Coordinates {
    lat: number;
    lon: number;
}

interface WeatherItem {
    description: string;
    dt: number;
}

function fetchWeatherDataBasedOnCoord(
    coord: Coordinates,
    callback: (weatherData: any) => void
) {
    const appid = 'e9f36369ca199e9e2be76ee66494e9a6';
    const apilink = 'https://api.openweathermap.org/data/2.5/weather';

    if (coord) {
        axios
            .get(apilink, {
                params: {
                    lat: coord.lat,
                    lon: coord.lon,
                    appid: appid,
                },
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function Data({ inputValue }: { inputValue: string }) {
    const [coord, setCoord] = useState(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [weatherDataAll, setWeatherDataAll] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [background, setBackground] = useState('');
    const currentDate = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchDataBasedOnInput(inputValue, setCoord, setWeatherData);
    }, [inputValue]);

    useEffect(() => {
        if (coord !== null) {
            fetchWeatherDataBasedOnCoord(coord, (data) => {
                setWeatherDataAll(data);
            });
        }
    }, [coord]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"flex flex-col gap-6"}>
            {weatherData && weatherDataAll && (
                <>
                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                        <CiLocationOn className={"w-10 h-10"}/>
                        {weatherDataAll.name}
                    </div>
                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                        <CiTempHigh className={"w-10 h-10"}/>
                        {parseInt(weatherDataAll.main.temp) - 273} ℃
                    </div>
                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                        <LiaCalendarDaySolid className={"w-10 h-10"}/>
                        {days[currentDate.getDay()]}
                    </div>
                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                        <AiOutlineFieldTime className={"w-10 h-10"}/>
                        {currentTime.toLocaleTimeString()}
                    </div>
                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                        <div>
                            <MdOutlineDescription className={"w-10 h-10"} />
                        </div>
                        <div className={""}>
                            {
                                weatherDataAll.weather.map((item: WeatherItem, index: number) => (
                                    <div key={index}>{item.description}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={"flex flex-row gap-6 items-center"}>
                        <AiOutlineCloud className={"w-10 h-10"}/>
                        {weatherDataAll.clouds.all} %
                    </div>
                </>
            )}
        </div>
    );
}

export default Data;
