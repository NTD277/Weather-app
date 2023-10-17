import React, { useEffect, useState } from 'react';
import Data from "../api/data";
import axios from "axios";
import { fetchDataBasedOnInput } from '../api/api';
import { TbUvIndex, TbWind, TbSunrise, TbSunset } from 'react-icons/tb'
import { WiHumidity } from 'react-icons/wi'
import { MdVisibility } from 'react-icons/md'
import { AiOutlineCloud } from 'react-icons/ai'
import {LiaCalendarDaySolid} from "react-icons/lia";
import {CiTempHigh} from "react-icons/ci";
import { MdOutlineDescription } from 'react-icons/md';
import {Hour} from "./time/hour";
import Day from "./time/day";
import Week from "./time/week";


interface Coordinates {
    lat: number;
    lon: number;
}

interface WeatherItem {
    weather: any;
    description: string;
    dt: number;
    temp: {
        min: number;
        max: number;
    };
}

function fetchWeatherDataBasedOnCoord(
    coord: Coordinates,
    callback: (weatherData: any) => void
) {
    const appid = 'e9f36369ca199e9e2be76ee66494e9a6';
    const apilink = 'https://api.openweathermap.org/data/2.5/onecall';

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

function TabSwitcher({ inputValue }: { inputValue: string }) {
    const [coord, setCoord] = useState(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [weatherDataAll, setWeatherDataAll] = useState<any>(null);
    const [sunriseTime, setSunriseTime] = useState(new Date());
    const [sunsetTime, setSunsetTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = ({tabNumber}: { tabNumber: any }) => {
        setActiveTab(tabNumber);
    };

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

    console.log(weatherData)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-3xl font-bold">
                <button
                    className={activeTab === 1 ? 'active' : ''}
                    onClick={() => handleTabClick({tabNumber: 1})}
                >
                    Day
                </button>
                <button
                    className={activeTab === 2 ? 'active' : ''}
                    onClick={() => handleTabClick({tabNumber: 2})}
                >
                    Week
                </button>
                <button
                    className={activeTab === 3 ? 'active' : ''}
                    onClick={() => handleTabClick({tabNumber: 3})}
                >
                    Hour
                </button>
            </div>
            <div className="tab-content mt-6">
                {activeTab === 1 &&
                    <>
                        {
                            weatherData && (
                                <Day weatherData={weatherData}/>
                            )
                        }
                    </>
                }
                {activeTab === 2 &&
                    <div className={"grid grid-cols-3 gap-6"}>
                        {weatherDataAll &&(
                                 <Week weatherDataAll={weatherDataAll} />
                        )}
                    </div>
                }
                {activeTab === 3 && (
                    <Hour/>
                )}
            </div>
        </>
    );
}

export default TabSwitcher;
