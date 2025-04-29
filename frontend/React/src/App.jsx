import React from 'react';
import { useState } from 'react';
import { MovieComponent } from './Movie';
import axios from 'axios'

//movie ->Array of objects (movies)
function App(){
      const [ movies , setMovies ] = useState([]);
      const [ movieName , setmovieName ] =useState('');

      const MoviesCard = movies.map((movie)=>{
        return (
        <MovieComponent 
           title={movie.title}
           overview={movie.overview}
           posterUrl={movie.posterUrl}
           release_year={movie.release_year}
        />
        );
      })

      async function searchMovie(){
        try{
          const response= await axios.get("http://localhost:3000/user/search",{
            params:{
              title:movieName
            }
          })
          const resArr = response.data;
          console.log(resArr)
      
        }catch(err){
          console.log("error")
        }
      }
      return (
        <div>
          <input 
          type='text' 
          placeholder='Search movie'
          onChange={(e) => setmovieName(e.target.value)}
          ></input>
          <button onClick={searchMovie} >Ok</button>
          <div>
             { MoviesCard }
          </div>
        </div>
      );
    }

export default App;


