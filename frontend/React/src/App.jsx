import React ,{ useState , useEffect } from "react";
import axios from "axios"

function App(){
    return (
    <div>
        <SearchBar />
    </div>
    );
}

function SearchBar(){
    const [ movieName , setMovieName ] = useState("");
    useEffect(()=>{
        if(movieName == ""){
            return;
        }
      const update = setTimeout(async()=>{
         //api call
         setLoading(true);
         const response = await axios.get("http://localhost:3000/movie/search",{
            params:{
                title:movieName
            }
         })
         setLoading(false);
         const movies = response.data.movies
          console.log(movies)
      },5000)

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
            
        </div>
    );
}
export default App;
