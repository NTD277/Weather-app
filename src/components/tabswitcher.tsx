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
                                <div className={"grid grid-cols-3 gap-6 text-center"}>
                                    <div className={"flex justify-center items-center gap-6 p-6 bg-amber-100"}>
                                        <TbUvIndex className={"w-10 h-10"} />
                                        <div className={"font-bold text-2xl"}>
                                            {weatherData.current.uvi}
                                        </div>
                                    </div>
                                    <div className={"flex justify-center items-center gap-6 p-6 bg-amber-100"}>
                                        <TbWind className={"w-10 h-10"} />
                                        <div className={"font-bold text-2xl"}>
                                            {(parseFloat(weatherData.current.wind_speed) * 3.6).toFixed(2)} km/h
                                        </div>
                                    </div>
                                    <div className={"flex flex-col justify-center items-center gap-6 p-6 bg-amber-100"}>
                                        <div className={"flex flex-row gap-6 justify-center items-center"}>
                                            <TbSunrise className={"w-10 h-10"} />
                                            <div className={"font-bold text-2xl"}>
                                                {new Date(weatherData.current.sunrise * 1000).getHours() + ":" + (new Date(weatherData.current.sunrise * 1000).getMinutes() > 12 ? (new Date(weatherData.current.sunrise * 1000).getMinutes() + " am") : (new Date(weatherData.current.sunrise * 1000).getUTCMinutes() - 12 + " pm" ) ) }
                                            </div>
                                        </div>
                                        <div className={"flex flex-row gap-6 justify-center items-center"}>
                                            <TbSunset className={"w-10 h-10"} />
                                            <div className={"font-bold text-2xl"}>
                                                {new Date(weatherData.current.sunset * 1000).getHours() + ":" + (new Date(weatherData.current.sunset * 1000).getMinutes() > 12 ? (new Date(weatherData.current.sunset * 1000).getMinutes() + " am") : (new Date(weatherData.current.sunset * 1000).getUTCMinutes() - 12 + " pm" ) ) }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex justify-center items-center gap-6 p-6 bg-amber-100"}>
                                        <WiHumidity className={"w-10 h-10"} />
                                        <div className={"font-bold text-2xl"}>
                                            {weatherData.current.humidity} %
                                        </div>
                                    </div>
                                    <div className={"flex justify-center items-center gap-6 p-6 bg-amber-100"}>
                                        <MdVisibility className={"w-10 h-10"} />
                                        <div className={"font-bold text-2xl"}>
                                            {weatherData.current.visibility / 1000} km
                                        </div>
                                    </div>
                                    <div className={"flex justify-center items-center gap-6 p-6 bg-amber-100"}>
                                        <AiOutlineCloud className={"w-10 h-10"} />
                                        <div className={"font-bold text-2xl"}>
                                            {weatherData.current.clouds } %
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
                {activeTab === 2 &&
                    <div className={"grid grid-cols-3 gap-6"}>
                        {(weatherDataAll &&
                            weatherDataAll.daily.map((item: WeatherItem, index: number) => (
                                <div key={index} className={"flex flex-col bg-amber-100 p-4"}>
                                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                                        <LiaCalendarDaySolid className={"w-10 h-10"}/>
                                        { new Date(item.dt * 1000).getDate() + " / " + new Date(item.dt * 1000).getMonth() + " / " + new Date(item.dt * 1000).getFullYear() }
                                    </div>
                                    <div className={"flex flex-row flex-wrap gap-6 items-center"}>
                                        <CiTempHigh className={"w-10 h-10"}/>
                                        <div>
                                            {`${parseInt(String(item.temp.min)) - 273} ℃ - ${parseInt(String(item.temp.max)) - 273} ℃`}
                                        </div>
                                    </div>
                                    <div className={"flex flex-row gap-6 items-center"}>
                                        <MdOutlineDescription className={"w-10 h-10"} />
                                        <div>
                                            {
                                                item.weather.map((items: { description: string }, indexes: number) => (
                                                    <div key={indexes}>
                                                        {items.description}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                }
                {activeTab === 3 && <p>siuuuu</p>}
            </div>
        </>
    );
}

export default TabSwitcher;
