import FeatherIcon from "feather-icons-react";
import Hourly from "../components/Hourly";
import React from "react";

export default function Desktop({weather, diffToHuman}){
    return(
        <div className="px-32">
            <div className="header text-white mb-12">
                <span className="block text-lg mb-3">
                    { diffToHuman(weather.current.dt).date }
                </span>
                <h1 className="text-6xl font-bold mb-7">
                    { weather.name }
                </h1>
            </div>
            <div id="content" className="grid grid-cols-2">
                <div className="left-content">
                    <div className="information grid max-w-2xl grid-cols-4 gap-7">
                        <div
                            className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                            <FeatherIcon icon="sunrise" width="60" height="60" />
                            <span className="text-xl text-center font-semibold mt-3">{ diffToHuman(weather.current.sunrise).time }</span>
                        </div>
                        <div
                            className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                            <FeatherIcon icon="sunset" width="60" height="60" />
                            <span className="text-xl text-center font-semibold mt-3">{ diffToHuman(weather.current.sunset).time }</span>
                        </div>
                        <div
                            className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                            <FeatherIcon icon="droplet" width="60" height="60" />
                            <span className="text-xl text-center font-semibold mt-3">{ weather.current.humidity }</span>
                        </div>
                        <div
                            className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                            <FeatherIcon icon="wind" className="ml-3" width="60" height="60" />
                            <span className="text-xl text-center font-semibold mt-3">{ weather.current.wind_speed } m/s</span>
                        </div>
                    </div>
                </div>
                <div className="right-content justify-self-end md:-mt-36">
                    <div
                        className="card glasses-blur glasses-shadow-black rounded-2xl bg-linear-accent text-white grid justify-center text-center p-7">
                        <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@4x.png`} alt="" className="weather-icon -mt-14 mx-auto"/>
                        <span className="block text-5xl font-bold -mt-10 mb-5 ml-4 header-font">
                              { Math.floor(weather.current.feels_like) } &deg;
                          </span>
                        <h2 className="text-2xl font-medium capitalize">{ weather.current.weather[0].description }</h2>
                    </div>
                </div>
            </div>

            <footer id="footer" className="absolute -bottom-5 min-h-xl">
                <Hourly display="7" weather={weather} diffToHuman={diffToHuman} />
            </footer>
        </div>
    )
}