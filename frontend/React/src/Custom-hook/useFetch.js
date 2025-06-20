import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url, params = {}, shouldFetch = true) {
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [noMovieFound, setNoMovieFound] = useState(false);
    const [message, setMessage] = useState("")
    const [userInfo, setUserInfo] = useState("")
    const token = localStorage.getItem('token');

    async function makeApiCall() {
        if (!shouldFetch) {
            return;
        }

        setLoading(true);
        setError(false);
        setNoMovieFound(false);

        const response = await axios.get(url, { params,  headers: {
                'Authorization': `Bearer ${token}`
            } 
        });
        
        if (response.data.error) {
            setError(true);
        }
        else if (response.data.profile_info) {
            setUserInfo(response.data.profile_info);
        }
        else if (response.data.message) {
            setMessage(response.data.message)
        }
        else if (response.data.trendmovies) {
            const moviesArray = response.data.trendmovies
            if (Array.isArray(moviesArray)) {
                setData(moviesArray);
            }
        }
        else if (response.data.movies) {
            if (response.data.movies.length == 0) {
                setNoMovieFound(true);
            } else {
                setData(response.data.movies)
            }
        }
        else if (response.data.moviedetails) {
            setData(response.data.moviedetails)
        }
        else {
            setData(response.data.streamingdetails);
        }
        setLoading(false)
    }

    useEffect(() => {
        makeApiCall();
    }, [url, JSON.stringify(params), shouldFetch])

    return {
        loading: loading,
        isError: isError,
        data: data,
        noMovieFound: noMovieFound,
        message: message,
        userInfo: userInfo
    }
}
