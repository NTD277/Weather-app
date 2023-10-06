import React, { useEffect, useState } from 'react';
import { fetchDataBasedOnInput } from './api';
import axios from 'axios';

function fetchWeatherDataBasedOnCoord(coord, callback) {
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

function Data({ inputValue }) {
    const [coord, setCoord] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const currentDate = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchDataBasedOnInput(inputValue, setCoord, setWeatherData);
        console.log(weatherData)
    }, [inputValue]);

    useEffect(() => {
        fetchWeatherDataBasedOnCoord(coord, (data) => {
            setWeatherData(data);
            console.log(weatherData)
        });
    }, [coord]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    return (
        <div>
            {weatherData && (
                <div>
                    <div>{weatherData.name}</div>
                    <div>{days[currentDate.getDay()]}</div>
                    <div>{currentTime.toLocaleTimeString()}</div>
                </div>
            )}
        </div>
    );
}

export default Data;
