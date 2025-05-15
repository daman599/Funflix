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
    const [ loading , setLoading ] = useState(false);
    
    useEffect(()=>{
        if(movieName == ""){
            setLoading(false)
            setMovieList([]);
            return;
        }
        //loading
       setLoading(true);
       const update = setTimeout(async()=>{
         //api call
        const response = await axios.get("http://localhost:3000/movie/search",{
            params:{
                title:movieName
            }
         })
         setLoading(false);
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
            <br></br>
            { loading ? <p>Loading ....</p> : (
            <div style={{
                display:"flex",
                overflowX:"auto"
            }}>
            { movieList.map((movie) =>{
                return (
                <MovieList 
                  poster_path = {movie.poster_path}
                  title={movie.title}
                />
                   );
             }) 
            }
            </div>)
            }
        </div>
    );
}
export default App;
