import { useState , useEffect } from "react";
import axios from "axios"
import { MovieList } from "./MovieList"

export function SearchBar(){

    const [ movieName , setMovieName ] = useState("");
    const [ movieList , setMovieList ] = useState([]);
    const [ loading , setLoading ] = useState(false);
    const [ error , setError ] =useState(false)
    const [ noMovieFound , setNoMovieFound ] = useState(false)

    if(error){
      throw new Error("error")
    }

    useEffect(()=>{
        if(movieName == ""){
            setLoading(false);
            setMovieList([]);
            setNoMovieFound(false);
            return;
        }

        setLoading(true);
        setNoMovieFound(false);

        const update = setTimeout(async()=>{
          const response = await axios.get("http://localhost:3000/movie/search",{
            params:{
                title:movieName
            }
          })
         setLoading(false);
         const data = response.data
         if(data.message ){
           setError(true)
         }
         else if(data.movies.length == 0){
           setNoMovieFound(true);
         }
         else{
            const movies = data.movies;
            setMovieList(movies);
         }
      },500)

      return ()=>{
         clearTimeout(update)
      }

    },[movieName])

    return (
        <>
          <input 
            type="text"
            placeholder="Search Movies...."
            onChange={(e)=>{setMovieName(e.target.value.trim())}}
          ></input>

            {noMovieFound && <p>Oops! Sorry...no such movie found </p>}

            { loading ? <p>Loading ....</p> : (
            <div style={{
                display:"flex",
                overflowX:"auto"
            }}>
            { movieList.map((movie) =>{
              if(movie.poster_path){
                return (
                <MovieList 
                  key={movie._id}
                  poster_path = {movie.poster_path}
                  title={movie.title}
                  tmdb_id={movie.tmdb_id}
                />
                );
               }
             }) 
            }
          </div>)
         }
       </>
    );
}