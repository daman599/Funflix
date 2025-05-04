const express = require("express");
const movieRouter = express.Router();
require("dotenv").config()
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const axios = require("axios");
const { MovieModel } = require('../db');

movieRouter.get('/trending',async (req,res)=>{
   
   const trendingMovies = await axios.get("https://api.themoviedb.org/3/trending/movie/day",{
       params:{
        api_key:TMDB_API_KEY
       }
    })

    let trendMovieArr = trendingMovies.data.results;

    await Promise.all(trendMovieArr.map(async (movie)=>{
        return(
         await MovieModel.create({
            title:movie.title,
            tmdb_id:movie.id,
            type:movie.media_type,
            release_date:movie.release_date,
            poster_path:movie.poster_path,
            overview:movie.overview,
            rating:movie.vote_average
        })
    );
    }))

    res.json({
      trendingMovies:trendMovieArr
    })
})

movieRouter.get('/search',async (req,res)=>{
   const title = req.query.title;
   
   const movies = await MovieModel.find({
     title: { $regex: title, $options: 'i' }
    })

   if(movies.length > 0){
    return res.json({
        movies:movies
    })
   }

   const response = await axios.get('https://api.themoviedb.org/3/search/movie',{
     params:{
        api_key:TMDB_API_KEY,
        query:title
     }
   })

   const moviesArr = response.data.results;
   await Promise.all(moviesArr.map(async (movie) =>{
    return(
     await MovieModel.create({
        title:movie.title,
        tmdb_id:movie.id,
        type:movie.media_type,
        release_date:movie.release_date,
        poster_path:movie.poster_path,
        overview:movie.overview,
        rating:movie.vote_average
    }));
   }))
   
   res.json({
    movies:moviesArr
   })
})

movieRouter.get('/id',async (req,res)=>{
     const movieId = req.query.movieId;
     const movie = await MovieModel.findOne({
       tmdb_id:movieId
     });
     res.json({
        movieDetails:movie
     })
})

movieRouter.get('/id/streaming',async (req,res)=>{
     const movieTitle = req.query.movieTitile;
     const country=req.query.country;
  
  const response= await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/title',{
   params: {
        title: movieTitle,          
        country: country,           
        show_type: 'movie',        
        output_language: 'en' 
   },
    headers: {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    },
   timeout:5000
    })
  console.log(response.data)

})

module.exports ={
    movieRouter : movieRouter
}

