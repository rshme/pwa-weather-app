import React from 'react';
import './assets/css/App.css';
import FeatherIcon from 'feather-icons-react';
import { useState, useEffect } from 'react';
import { fetchWeather } from "./hooks/fetchWeather";
import axios from 'axios';
// import views
import Desktop from "./views/Desktop";
import Mobile from "./views/Mobile";

// import components
import Hourly from "./components/Hourly";
import Navbar from "./components/Navbar";

function App() {
    // setting state
    const [screen, setScreen] = useState(false)
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState({});
    const [weather, setWeather] = useState(false);

    // first load page
    useEffect(() => {
        loadWeather('Jakarta')
        setScreen(window.screen.width)
    }, [])

    const searchWeather = (e) => {
        setSearch(e.target.value)
    }
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
      <div className="wrapper">
          <div id="app">
              <Navbar searchWeather={searchWeather} submit={submit} search={search}/>

              {
                  screen > 380
                  ? weather && <Desktop weather={weather} diffToHuman={diffToHuman} />
                  : weather && <Mobile weather={weather} diffToHuman={diffToHuman} />
              }
          </div>
      </div>
  );
}

export default App;
