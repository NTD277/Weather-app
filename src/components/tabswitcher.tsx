import React, { useEffect, useState } from 'react';
import axios from "axios";
import {fetchDataBasedOnInput, fetchWeatherDataBasedOnCoord} from '../api/api';
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



function TabSwitcher(
    { coord, weatherData }:
    { coord: Coordinates | null, weatherData: any }
) {
    const [weatherDataAll, setWeatherDataAll] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(1);
    const oneallText = 'onecall';

    const handleTabClick = ({tabNumber}: { tabNumber: any }) => {
        setActiveTab(tabNumber);
    };

    useEffect(() => {
        if (coord !== null) {
            fetchWeatherDataBasedOnCoord(coord,oneallText, (data) => {
                setWeatherDataAll(data);
            });
        }
    }, [coord]);


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
