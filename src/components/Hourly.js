import React from "react";
import FeatherIcon from "feather-icons-react";

export default function Hourly({weather, diffToHuman, display, searchWeather, search, submit}){
    let footerStyles = 'grid gap-3 grid-cols-3 pt-2';

    if(display === "7"){
        footerStyles = 'flex flex-auto flex-nowrap flex-row items-center'
    }

    return(
        <div className={`card rounded-tl-3xl rounded-tr-3xl glasses-shadow-black w-full text-white p-7 ${display === "7" ? 'bg-linear-accent glasses-blur' : 'bg-primary'}`}>
            <div className={`justify-between ${footerStyles}`}>
                { weather.hourly.slice(0, display).map((weather, i) => {
                    return(
                        <div className={`wrapper relative text-center ${display === "3" ? 'h-full bg-accent rounded-2xl py-2 px-4 shadow-2xl glasses-blur' : ''}`} key={i}>
                            <span className="block text-md">{ diffToHuman(weather.dt).time }</span>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" className={`weather-icon mx-auto -mt-3`}/>
                            <span className="block text-xl font-semibold -mt-2 ml-1 header-font">
                            { Math.floor(weather.temp) } &deg;
                        </span>
                        </div>
                    )
                }) }
            </div>

            {
                display === "7"
                    ?
                    <span className="block font-medium text-gray-300 text-center mt-4">
                        Background by <a href="https://www.freepik.com">Freepik</a>
                    </span>
                    :
                        <div className="bg-white rounded-3xl flex items-center py-2 px-4 input-wrapper justify-self-end mt-5 mb-3 shadow-2xl">
                            <FeatherIcon icon="search" width="25" height="25" className="text-gray-500 mr-3 max-w-md" />
                            <input
                            type="text"
                            name="search"
                            className="border-none text-gray-700 text-center outline-none text-md bg-transparent max-w-3xl"
                            autoComplete="off"
                            placeholder="Search Country or City..."
                            value={search}
                            onChange={searchWeather}
                            onKeyPress={submit}
                            />
                        </div>
            }
        </div>
    )
}