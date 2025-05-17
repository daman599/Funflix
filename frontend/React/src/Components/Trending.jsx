import { useState ,useEffect } from "react";
import axios from "axios";
import { MovieList } from "../Components/MovieList"

export function Trending(){
  const [ trendMovies , setTrendMovies ] = useState([]);
  const [ loading , setLoading ] =useState(false);

  useEffect(()=>{

    async function makeApiCall(){
      setLoading(true);
      const gotMovies = await axios.get("http://localhost:3000/movie/trending");
      
      const moviesArray = gotMovies.data.trendmovies;
      
      if (Array.isArray(moviesArray)) {
          setTrendMovies(moviesArray);
      }else{
        throw new Error("Error");
      }
      setLoading(false)
    } 
    makeApiCall();

  },[])

  return  <>
    <div style={{backgroundColor:"yellowgreen"}}>Trending Movies </div>
    {loading ? <p>loading....</p>:
    <div style={{display:"flex"}}>
      {trendMovies.map((movie)=>{
        return (
           <MovieList
             key={movie._id} 
             poster_path={movie.poster_path}
             title={movie.title}
           />
        );
      })
      }
      </div>
    }
  </>
}