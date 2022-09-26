import React from 'react';
import './assets/css/App.css';
import { useState, useEffect } from 'react';
import { loadWeather, saveWeather } from "./globalFunction";
// import views
import Desktop from "./views/Desktop";
import Mobile from "./views/Mobile";

function App() {
    // setting state
    const [screen, setScreen] = useState(false)
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState(false);

    // first load page
    useEffect(() => {
        loadWeather('Jakarta').then(res => {
            setWeather(res)
            saveWeather(res)
        })
        setScreen(window.screen.width)
    }, [])

    const searchWeather = (e) => {
        setSearch(e.target.value)
    }
    const submit = (e) => {
        if(e.key === 'Enter'){
           loadWeather(search).then(res => {
               setWeather(res)
               saveWeather(res)
               setSearch('')
           })
        }
    }

  return (
      <div id="app">
          {
              screen > 420
                  ? weather && <Desktop weather={weather} searchWeather={searchWeather} search={search} submit={submit} />
                  : weather && <Mobile weather={weather} searchWeather={searchWeather} search={search} submit={submit} />
          }
      </div>
  );
}

export default App;
