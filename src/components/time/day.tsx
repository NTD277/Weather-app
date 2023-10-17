import React from 'react';
import { TbUvIndex, TbWind, TbSunrise, TbSunset } from 'react-icons/tb'
import { WiHumidity } from 'react-icons/wi'
import { MdVisibility } from 'react-icons/md'
import { AiOutlineCloud } from 'react-icons/ai'
interface WeatherData {
    current: {
        uvi: number
        wind_speed: string
        sunrise: number
        sunset: number
        humidity: number
        visibility: number
        clouds: number
    }
}
const Day = ({ weatherData }:{ weatherData: any }) => {
    return (
        weatherData && (<div className={"grid grid-cols-3 gap-6 text-center"}>
            <div className={"flex justify-center items-center gap-6 p-6 bg-cyan-100 rounded-xl"}>
                <TbUvIndex className={"w-10 h-10"} />
                <div className={"font-bold text-2xl"}>
                    {weatherData.current.uvi}
                </div>
            </div>
            <div className={"flex justify-center items-center gap-6 p-6 bg-cyan-100 rounded-xl"}>
                <TbWind className={"w-10 h-10"} />
                <div className={"font-bold text-2xl"}>
                    {(parseFloat(weatherData.current.wind_speed) * 3.6).toFixed(2)} km/h
                </div>
            </div>
            <div className={"flex flex-col justify-center items-center gap-6 p-6 bg-cyan-100 rounded-xl"}>
                <div className={"flex flex-row gap-6 justify-center items-center"}>
                    <TbSunrise className={"w-10 h-10"} />
                    <div className={"font-bold text-2xl"}>
                        {new Date(weatherData.current.sunrise * 1000).getHours() + ":" + (new Date(weatherData.current.sunrise * 1000).getMinutes() > 12 ? (new Date(weatherData.current.sunrise * 1000).getMinutes() + " am") : (new Date(weatherData.current.sunrise * 1000).getUTCMinutes() - 12 + " pm" ) ) }
                    </div>
                </div>
                <div className={"flex flex-row gap-6 justify-center items-center"}>
                    <TbSunset className={"w-10 h-10"} />
                    <div className={"font-bold text-2xl"}>
                        {
                            (
                                new Date(weatherData.current.sunset * 1000).getHours() < 12
                                    ? (new Date(weatherData.current.sunset * 1000).getHours() + ":" + new Date(weatherData.current.sunset * 1000).getMinutes() + " am")
                                    : (new Date(weatherData.current.sunset * 1000).getHours() - 12 + ":" + new Date(weatherData.current.sunset * 1000).getMinutes() +  " pm" )
                            )

                        }
                    </div>
                </div>
            </div>
            <div className={"flex justify-center items-center gap-6 p-6 bg-cyan-100 rounded-xl"}>
                <WiHumidity className={"w-10 h-10"} />
                <div className={"font-bold text-2xl"}>
                    {weatherData.current.humidity} %
                </div>
            </div>
            <div className={"flex justify-center items-center gap-6 p-6 bg-cyan-100 rounded-xl"}>
                <MdVisibility className={"w-10 h-10"} />
                <div className={"font-bold text-2xl"}>
                    {weatherData.current.visibility / 1000} km
                </div>
            </div>
            <div className={"flex justify-center items-center gap-6 p-6 bg-cyan-100 rounded-xl"}>
                <AiOutlineCloud className={"w-10 h-10"} />
                <div className={"font-bold text-2xl"}>
                    {weatherData.current.clouds } %
                </div>
            </div>
        </div>)
    );
};

export default Day;