const express = require('express');
const favoritesRouter = express.Router();
const { Userauthentication } = require('../Middleware/auth');
const { UserModel , MovieModel } = require('../db');

favoritesRouter.get('/',Userauthentication,async (req,res)=>{
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
  try{
    const favMovies =await MovieModel.find({tmdb_id :{$in : user.favorites}});
    return res.json({
        favoriteMovies:favMovies
    }) 
  }catch(err){
    return res.json({
        Error:"There is no favorite movie"
    })
  }
})

favoritesRouter.post('/movie',Userauthentication ,async (req,res)=>{
    const movieId = req.body.movieId;
    const userId = req.user.userId;

    try{
    await UserModel.updateOne({ _id : userId },{ $addToSet:{ favorites : movieId } });

    res.json({
        message:"This movie is added to favorites"
    })
   }catch(err){
    return res.json({
        Error:"Something went wrong"
    })
  }
})

favoritesRouter.delete('/movie',Userauthentication,async (req,res)=>{
     const movieId = req.body.movieId;
     const userId = req.user.userId;
     
     try{
     await UserModel.updateOne({ _id : userId}, {$pull :{ favorites:movieId}});
    
     res.json({
        message:"Movie is removed from favorites"
     })
     }catch(err){
        return res.json({
            Error:"Something went wrong"
        })
     }
})

module.exports={
   favoritesRouter:favoritesRouter
}