import React from 'react';
import './assets/css/App.css';
import FeatherIcon from 'feather-icons-react';
import { useState, useEffect } from 'react';
import { fetchWeather } from "./hooks/fetchWeather";
import axios from 'axios';

function App() {

    // setting state
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState({});
    const [weather, setWeather] = useState(false);

    // first load page
    useEffect(() => {
        loadWeather('Jakarta')
    }, [])

    const submit = (e) => {
        if(e.key === 'Enter'){
           loadWeather(search)
        }
    }

    const loadWeather = async (search) => {
        let {data : countries} = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: search,
                appid: '73e6e6d958db7d3a2b72cc4c827e1f50',
            }
        })

        console.log(countries)

        const country = countries[0]

        if(countries.length === 0){
            alert(`Country or City doesn't exists`)
            setSearch('')
            return;
        }

        const data = await fetchWeather({
            lat: country.lat,
            lon: country.lon,
            units: 'metric',
            exclude: 'minutely'
        })

        setWeather(Object.assign(data, {
            name: country.name
        }))
        setSearch('')
    }

    const diffToHuman = (unix) => {
        const time = new Date(unix * 1000).toLocaleTimeString('id', {
            hour: '2-digit',
            minute: '2-digit',
        }).split('.').join(':')

        const date = new Date(unix * 1000).toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).split('.').join(':')

        return {
            time,
            date
        }
    }

  return (
      <div id="app">
          <nav id="navbar">
              <div className="grid grid-cols-2">
                  <a href="#" id="brand" className="text-4xl justify-self-start text-white header-font">The Weather</a>
                  {/* form search */}
                  <div className="bg-white rounded-3xl flex items-center py-3 px-5 input-wrapper justify-self-end">
                      <FeatherIcon icon="search" width="25" height="25" className="text-gray-500 mr-3" />
                      <input
                          type="text"
                          name="search"
                          className="border-none outline-none text-lg bg-transparent"
                          autoComplete="off"
                          placeholder="Search Country or City..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyPress={submit}
                      />
                  </div>
                  {/* end form search */}
              </div>
          </nav>

          {
              weather && (
              <div className="px-32">
                  <div id="content" className="grid grid-cols-2">
                      <div className="left-content">
                          <div className="header text-white mb-12">
                          <span className="block text-lg mb-3">
                              { diffToHuman(weather.current.dt).date }
                          </span>
                              <h1 className="text-6xl font-bold mb-7">
                                  { weather.name }
                              </h1>
                          </div>
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
                      <div className="right-content justify-self-end">
                          <div
                              className="card glasses-blur glasses-shadow-black rounded-2xl bg-linear-accent text-white grid justify-center text-center p-7">
                              <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@4x.png`} alt="" className="weather-icon -mt-14 mx-auto"/>
                              <span className="block text-5xl font-bold -mt-10 mb-5 ml-4">
                              { Math.floor(weather.current.temp) } &deg;
                          </span>
                              <h2 className="text-2xl font-medium capitalize">{ weather.current.weather[0].description }</h2>
                          </div>
                      </div>
                  </div>

                  <footer id="footer" className="fixed -bottom-5 min-h-xl">
                    <div className="card rounded-3xl glasses-blur glasses-shadow-black bg-linear-accent w-full text-white p-7 flex flex-auto flex-nowrap flex-row justify-center">
                        { weather.hourly.slice(0, 7).map(weather => {
                            return(
                                <div className="container text-center">
                                    <span className="block text-lg">{ diffToHuman(weather.dt).time }</span>
                                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" className="weather-icon mx-auto"/>
                                    <span className="block text-2xl font-semibold -mt-3">
                                        { Math.floor(weather.temp) } &deg;
                                    </span>
                                </div>
                            )
                        }) }
                    </div>
                  </footer>
              </div>
              )
          }
      </div>
  );
}

export default App;
