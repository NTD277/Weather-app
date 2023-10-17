import React from 'react';
import {LiaCalendarDaySolid} from "react-icons/lia";
import {CiTempHigh} from "react-icons/ci";
import {MdOutlineDescription} from "react-icons/md";


interface WeatherItem {
    weather: any;
    description: string;
    dt: number;
    temp: {
        min: number;
        max: number;
    };
}

const Week = (
    { weatherDataAll }:{ weatherDataAll: any }
) => {
    return (
        weatherDataAll.daily.map((item: WeatherItem, index: number) => (
            <div key={index} className={"flex flex-col bg-cyan-100 p-4 rounded-xl"}>
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
        )
    ));
};

export default Week;