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

movieRouter.get('/search',async(req,res)=>{
   const title=req.query.title;
   const found = await MovieModel.find({
      title: { $regex: title, $options: 'i' }
   })
   if(found){
      return res.json({
         movies:found
      })
   }

   const url="https://api.themoviedb.org/3/search/movie"
   const response = await axios.get(url,{
      params:{
         api_key:TMDB_API_KEY,
         query:title
      }
   })
   const results=response.data.results;
   await Promise.all(results.map(async (movie)=>{
      const exist = await MovieModel.findOne({tmdb_id:movie.id});
      if(!exist){
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
   return res.json({
     searchedContent:results
   })
})

movieRouter.get('/details/',async (req,res)=>{
  const movieId = req.query.movieId;
  const movieDetails = await MovieModel.findOne({tmdb_id:movieId});
  res.json({
   moviedetails:movieDetails
  })
})

//movieRouter.get('/streaming/availability/',(req,res)=>{
  // const movieId = req.query.movieId;
   
//})

module.exports ={
    movieRouter : movieRouter
}