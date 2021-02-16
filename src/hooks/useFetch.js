import axios from 'axios';
import { useState, useEffect } from 'react';
const appid = '73e6e6d958db7d3a2b72cc4c827e1f50'

const useFetch = (url, query) => {
    const [data, setData] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(url, {
            params: Object.assign(query, {
                appid,
                lang:'id'
            })
        })
            .then(({data}) => setData(data))
            .catch(({response}) => setError(response))
        console.log(query)
    }, [query.lat])

    return { data, error }
}

export default useFetch;