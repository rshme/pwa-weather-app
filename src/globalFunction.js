import axios from "axios";
import {fetchWeather} from "./hooks/fetchWeather";

export const loadWeather = async (search) => {
    let {data : countries} = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: search,
            appid: '73e6e6d958db7d3a2b72cc4c827e1f50',
        }
    })

    const country = countries[0]

    if(countries.length === 0){
        alert(`Country or City doesn't exists`)

        return false;
    }

    const data = await fetchWeather({
        lat: country.lat,
        lon: country.lon,
        units: 'metric',
        exclude: 'minutely'
    })

    return Object.assign(data, {
        name: country.name
    })
}

export const diffToHuman = (unix) => {
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