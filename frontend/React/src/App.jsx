import React ,{ useState , useEffect } from "react";
import axios from "axios"
import { MovieList } from "./MovieList"

function App(){
    return (
    <div>
        <SearchBar />
    </div>
    );
}

function SearchBar(){
    const [ movieName , setMovieName ] = useState("");
    const [ movieList , setMovieList ] = useState([]);
    
    useEffect(()=>{
        if(movieName == ""){
            setMovieList([]);
            return;
        }
        //loading
      const update = setTimeout(async()=>{
         //api call
         //loading
        const response = await axios.get("http://localhost:3000/movie/search",{
            params:{
                title:movieName
            }
         })
         
         const data = response.data
         if(data.message){
            console.log(data.message)
         }
         else{
            const movies = data.movies;
            setMovieList(movies);
         }
      },500)

      return ()=>{
        console.log("pishla wala delete")
         clearTimeout(update)
      }
    },[movieName])

    return (
        <div>
            <input 
            type="text"
            placeholder="Search Movies...."
            onChange={(e)=>{setMovieName(e.target.value)}}
            ></input>
            <div style={{display:"flex"}}>
            { movieList.map((movie) =>{
                return (
                <MovieList 
                  poster_path = {movie.poster_path}
                  title={movie.title}
                />
                );
             })}
            </div>
        </div>
    );
}
export default App;
