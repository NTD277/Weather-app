import React, { useEffect, useState } from 'react';
import Data from "../api/data";
import axios from "axios";

function fetchDataBasedOnInput(inputValue, callback) {
    const appid = 'e9f36369ca199e9e2be76ee66494e9a6';
    const apilink = 'https://api.openweathermap.org/data/2.5/weather';

    if (inputValue) {
        axios
            .get(apilink, {
                params: {
                    q: inputValue,
                    appid: appid,
                },
            })
            .then((response) => {
                const apiCoord = response.data.coord;
                callback(apiCoord);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function fetchWeatherDataBasedOnCoord(coord, callback) {
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

function TabSwitcher({inputValue}) {
    const [coord, setCoord] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = ({tabNumber}: { tabNumber: any }) => {
        setActiveTab(tabNumber);
    };

    useEffect(() => {
        fetchDataBasedOnInput(inputValue, (apiCoord) => {
            setCoord(apiCoord);
        });
    }, [inputValue]);

    useEffect(() => {
        fetchWeatherDataBasedOnCoord(coord, (data) => {
            setWeatherData(data);
        });
    }, [coord]);

    useEffect(() => {
        setCurrentTime(new Date(1696571328 * 1000))
    }, []);

    return (
        <div>
            <div className="flex flex-row gap-8">
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
            <div className="tab-content">
                {activeTab === 1 &&
                    <div>
                        {
                            weatherData && (
                                <div>
                                    <div>{weatherData.current.uvi}</div>
                                    <div>{(parseFloat(weatherData.current.wind_speed) * 3.6).toFixed(2)}</div>
                                    <div>{currentTime.getUTCHours() + ":" + (currentTime.getUTCMinutes() > 12 ? (currentTime.getUTCMinutes() + " am") : (currentTime.getUTCMinutes() - 12 + " pm" ) ) }</div>
                                </div>
                            )
                        }
                    </div>
                }
                {activeTab === 2 && <p>Content for Tab 2</p>}
                {activeTab === 3 && <p>Content for Tab 3</p>}
            </div>
        </div>
    );
}

export default TabSwitcher;
