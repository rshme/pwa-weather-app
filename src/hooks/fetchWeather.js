import axios from 'axios';
import { useState } from 'react';
const appid = '73e6e6d958db7d3a2b72cc4c827e1f50'

export const fetchWeather = async (params)  => {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: Object.assign(params, {
            appid,
            lang: 'id'
        })
    })

    return data;
}