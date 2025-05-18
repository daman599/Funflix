const express = require("express");
const movieRouter = express.Router();
require("dotenv").config()
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const cron = require("node-cron");
const { MovieModel } = require('../db');

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

cron.schedule('0 * * * *', async () => {
  await MovieModel.deleteMany({isUserAdded:"False"});
});

movieRouter.get('/trending',async (req,res)=>{

 try{
   await MovieModel.deleteMany({isTrending : "True"})

   const url='https://api.themoviedb.org/3/trending/movie/day';
   const response = await axios.get(url,{
      params:{
         api_key:TMDB_API_KEY
      },
      timeout:10000
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
        isTrending:"True"
       })
      }
   }))
   const trending =await MovieModel.find({isTrending : "True"})
   res.json({
      trendmovies:trending
    })
}catch(err){
  return res.json({
   ERROR:"Something went wrong ,try again after some time"
  })
}
})

movieRouter.get('/search',async(req,res)=>{
   const title=req.query.title;
   if(!title){
      return res.json({
         message:"Type something to search for"
      })
   }
   const found = await MovieModel.find({
      title: { $regex: title, $options: 'i' }
   })

   if(found.length >0){
      return res.json({
         movies:found
      })
   }

   try{
   const url="https://api.themoviedb.org/3/search/movie"
   const response = await axios.get(url,{
      params:{
         api_key:TMDB_API_KEY,
         query:title
      },
      timeout:10000
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
   const foundArr = await MovieModel.find({
      title: { $regex: title, $options: 'i' }
   })

   return res.json({
     movies:foundArr
   })

}catch(err){
   res.json({
      message:"Something went wrong ,try again after some time"
   })
}
})

movieRouter.get('/details',async (req,res)=>{
  const movieId = req.query.movieId;
  if(!movieId){
   return res.json({
      message:"Unable to get movie details"
   })
  }
  const movieDetails = await MovieModel.findOne({tmdb_id:movieId});
  if(!movieDetails){
   return res.json({
      ERROR:"No such movie in db"
   })
  }

  res.json({
   moviedetails:movieDetails
  })
})

movieRouter.get('/streaming/availability',async(req,res)=>{
  const movieId = req.query.movieId;
  const movie = await MovieModel.findOne({tmdb_id:movieId});

  if(!movie){
   return res.json({
      message:"Movie not found"
   })
  }

  if(movie.streaming.length > 0){
     return res.json({
      streamingdetails:movie.streaming
     })
  }

  try{
  const response=await axios.get(`https://streaming-availability.p.rapidapi.com/shows/movie/${movieId}`,{
   params: {
     output_language: 'en'
   },
   headers: {
     'x-rapidapi-key': RAPID_API_KEY,
     'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
   },
   timeout: 50000
   });

  const geoResponse = await axios.get('https://ipwho.is/');

  const userCountryCode = geoResponse.data.country_code?.toLowerCase();

  const streamData= response.data.streamingOptions;
  const streaming_options=streamData[userCountryCode];
  
  if(!streaming_options){
   return res.json({
      message:"This movie is not available in your region"
   })
  }
  
  await Promise.all(streaming_options.map(async (object)=>{
    if (typeof object === 'string') {
      object = JSON.parse(object);
    }
   return await MovieModel.updateOne({tmdb_id:movieId},
      {
         $addToSet :{
            streaming:object
         }})
      })
   )

  const movie = await MovieModel.findOne({tmdb_id:movieId});
  return res.json({
    streamingdetails:movie.streaming
  })
  
}catch(err){
   return res.json({
      Error:"Something went wrong,try after some time"
   })
   } 
})

module.exports ={
    movieRouter : movieRouter
}