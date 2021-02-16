import React from 'react';
import './assets/css/App.css';
import FeatherIcon from 'feather-icons-react';
import useFetch from "./hooks/useFetch";
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState({
    lat: -6.2146,
    lon: 106.8451,
    exclude: 'minutely',
    units: 'metric'
  })
  const [weather, setWeather] = useState({})
  const {data, error} = useFetch('https://api.openweathermap.org/data/2.5/onecall', query)

  const diffToHuman = (unix) => {
    const time = unix * 1000
    const date = new Date(time).toLocaleTimeString('id', {
      hour: '2-digit',
      minute: '2-digit'
    }).split('.').join(':')

    return date
  }

  const searchWeather = async (e) => {
    if(e.key === 'Enter'){
      let { data: res } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: search,
          appid: '73e6e6d958db7d3a2b72cc4c827e1f50'
        }
      })

      console.log(data)

      setQuery({
        lat: res[0].lat,
        lon: res[0].lon,
        exclude: 'minutely',
        units: 'metric'
      })

      setSearch('')

      setWeather({
        name: res[0].name,
        currentDate: new Date(data.current.dt * 1000).toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' }),
        wind_speed: data.current.wind_speed,
        sunset: diffToHuman(data.current.sunset),
        sunrise: diffToHuman(data.current.sunrise),
        humidity: data.current.humidity,
        temp: data.current.temp,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
      })
    }
  }

  return (
      <div id="app">
        <nav id="navbar">
          <div className="grid grid-cols-2">
            <a href="#" id="brand" className="text-4xl justify-self-start text-white header-font">The Weather</a>
            {/* search form */}
            <div className="bg-white rounded-3xl flex items-center py-3 px-5 input-wrapper justify-self-end">
              <FeatherIcon icon="search" width="25" height="25" className="text-gray-500 mr-3" />
              <input
                  type="text"
                  name="search"
                  className="border-none outline-none text-lg bg-transparent"
                  autoComplete="off"
                  placeholder="Search Country or City..."
                  onKeyPress={searchWeather}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
            </div>
           {/* End search form */}
          </div>
        </nav>

        { weather.sunrise
          &&
        <div id="content" className="container px-32 grid grid-cols-2">
          <div className="left-content">
            <div className="header text-white mb-12">
            <span className="block text-lg mb-3">
              { weather.currentDate }
            </span>
              <h1 className="text-6xl font-bold mb-7">
                { weather.name }
              </h1>
            </div>
            <div className="information grid max-w-lg grid-cols-4 gap-7">
              <div
                  className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                <FeatherIcon icon="sunrise" width="60" height="60" />
                <span className="text-xl text-center font-semibold mt-3">{ weather.sunrise }</span>
              </div>
              <div
                  className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                <FeatherIcon icon="sunset" width="60" height="60" />
                <span className="text-xl text-center font-semibold mt-3">{ weather.sunset }</span>
              </div>
              <div
                  className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                <FeatherIcon icon="droplet" data-feather="droplet" width="60" height="60" />
                <span className="text-xl text-center font-semibold mt-3">{ weather.humidity }</span>
              </div>
              <div
                  className="grid justify-center card rounded-lg glasses-blur glasses-shadow-black bg-linear-accent w-25 text-white">
                <FeatherIcon icon="wind" width="60" height="60" />
                <span className="text-xl text-center font-semibold mt-3">{ weather.wind_speed }</span>
              </div>
            </div>
          </div>
          <div className="right-content justify-self-end">
            <div
                className="card glasses-blur glasses-shadow-black rounded-2xl bg-linear-accent text-white grid justify-center text-center p-7">
              <img className="city-icon -mt-12" src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
              <span className="block text-5xl font-bold mb-5 -mt-8">
                 { Math.floor(weather.temp) } &deg;
                </span>
              <h2 className="text-2xl font-medium capitalize">{ weather.description }</h2>
            </div>
          </div>
        </div>
        }
      </div>
  );
}

export default App;
