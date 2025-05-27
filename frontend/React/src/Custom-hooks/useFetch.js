import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url,params = {},shouldFetch = true) {
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState([]);
    const [noMovieFound,setNoMovieFound]=useState(false);

    async function makeApiCall() {
        if(!shouldFetch){
            return ;
        }
        setLoading(true);
        setError(false);
        setNoMovieFound(false);

        const response = await axios.get(url,{ params });
        console.log(response.data);
        if(response.data.ERROR || response.data.message){
            setError(true);
        }
        else if(response.data.trendmovies){
            const moviesArray=response.data.trendmovies
            if (Array.isArray(moviesArray)) {
              setData(moviesArray);
             }
        }
        else if(response.data.movies){
             if(response.data.movies.length == 0){
                setNoMovieFound(true);
             }else{
              setData(response.data.movies)
             }
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
        noMovieFound:noMovieFound
    }
}