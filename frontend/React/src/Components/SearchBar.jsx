import { useState , useEffect } from "react";
import axios from "axios"
import { MovieList } from "./MovieList"

export function SearchBar(){

    const [ movieName , setMovieName ] = useState("");
    const [ movieList , setMovieList ] = useState([]);
    const [ loading , setLoading ] = useState(false);
    
    useEffect(()=>{
        if(movieName == ""){
            setLoading(false)
            setMovieList([]);
            return;
        }
        //loading
        setLoading(true);
        //side effect
       const update = setTimeout(async()=>{
         //api call
        const response = await axios.get("http://localhost:3000/movie/search",{
            params:{
                title:movieName
            }
         })
         setLoading(false);
         const data = response.data
         if(data.message ){
            console.log("Something went wrong")
         }
         else{
            const movies = data.movies;
            setMovieList(movies);
         }
      },2000)

      return ()=>{
         clearTimeout(update)
      }
    },[movieName])

    return (
        <>
            <input 
            type="text"
            placeholder="Search Movies...."
            onChange={(e)=>{setMovieName(e.target.value)}}
            ></input>
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