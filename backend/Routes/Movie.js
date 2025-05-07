const express = require("express");
const movieRouter = express.Router();
require("dotenv").config()
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const axios = require("axios");
const { MovieModel } = require('../db');

movieRouter.get('/trending',async (req,res)=>{
   const url='https://api.themoviedb.org/3/trending/movie/day';
   const response = await axios.get(url,{
      params:{
         api_key:TMDB_API_KEY
      },
      timeout:5000
   })
   const trendMovies =response.data.results;

   await Promise.all(trendMovies.map(async (movie)=>{
      const oldMovie= await MovieModel.findOne({tmdb_id:movie.id })
      if(!oldMovie){
       await MovieModel.create({
        title :movie.title,
        tmdb_id :movie.id,
        type :"movie",
        overview:movie.overview,
        release_date:movie.release_date,
        poster_path:movie.poster_path,
        rating:movie.vote_average,
       })
      }
   }))
    res.json({
      trendmovies:trendMovies
    })
})

module.exports ={
    movieRouter : movieRouter
}

