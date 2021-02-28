import FeatherIcon from "feather-icons-react";
import Hourly from "../components/Hourly";
import { diffToHuman } from "../globalFunction";
import React from "react";
import Navbar from "../components/Navbar";

export default function Mobile({ weather, searchWeather, search, submit }){


    return(
        <div className="wrapper">
            <div className="px-7 py-5 text-gray-600">
                <div className="header mb-12">
                    <span className="block text-base text-primary opacity-80 mb-1">Kam, 17 Feb</span>
                    <h1 className="text-4xl font-bold text-primary">Jakarta</h1>
                </div>

                <div className="w-full flex justify-center mb-8">
                    <div className="content">
                        <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@4x.png`} alt="" className="weather-icon -mb-16 -mt-28"/>
                        <div className="badge-primary shadow-inner py-3 px-5 rounded-full text-center mb-7 mt-3">
                            <span className="block capitalize font-semibold text-primary text-lg">{ weather.current.weather[0].description }</span>
                        </div>
                        <span className="block font-semibold text-5xl text-gray-600 text-center header-font">
                            25 &deg;
                        </span>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <div className="information grid grid-cols-4 justify-center items-center gap-10">
                        <div className="wrapper text-center">
                            <FeatherIcon icon="sunrise" width="45" height="45"/>
                            <span className="block text-gray-700 text-lg mt-2">
                                { diffToHuman(weather.current.sunrise).time }
                             </span>
                        </div>
                        <div className="wrapper text-center">
                            <FeatherIcon icon="sunset" width="45" height="45"/>
                            <span className="block text-gray-700 text-lg mt-2">
                                { diffToHuman(weather.current.sunset).time }
                            </span>
                        </div>
                        <div className="wrapper text-center">
                            <FeatherIcon icon="droplet" width="45" height="45"/>
                            <span className="block text-gray-700 text-lg mt-2">
                                { weather.current.humidity }
                            </span>
                        </div>
                        <div className="wrapper text-center">
                            <FeatherIcon icon="wind" width="45" height="45"/>
                            <span className="block text-gray-700 text-lg mt-2">
                                { weather.current.wind_speed }
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <footer id="footer" className="absolute -bottom-8 min-h-xl">
                <Hourly display="3" weather={weather} diffToHuman={diffToHuman} searchWeather={searchWeather} search={search} submit={submit} />
            </footer>
        </div>
    )
}