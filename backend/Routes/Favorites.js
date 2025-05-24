const express = require('express');
const favoritesRouter = express.Router();
const { Userauthentication } = require('../Middleware/auth');
const { UserModel , MovieModel } = require('../db');

favoritesRouter.get('/',Userauthentication,async (req,res)=>{
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
  try{
    const favMovies = await MovieModel.find({tmdb_id :{$in : user.favorites}});
     if(favMovies.length==0){
      res.json({
        message:"There is no movie added to favs list"
      })
      return ;
     }
    return res.json({
        favoriteMovies:favMovies
    }) 
  }catch(err){
    return res.json({
        error:"Something went wrong"
    })
  }
})

favoritesRouter.post('/movie',Userauthentication ,async (req,res)=>{
    const movieId = req.body.movieId;
    const userId = req.user.userId;

    try{
    await UserModel.updateOne({ _id : userId },{ $addToSet:{ favorites : movieId } });
    await MovieModel.updateOne({tmdb_id:movieId},{$set :{isUserAdded:"True"}});

    res.json({
        message:"This movie is added to favorites"
    })
   }catch(err){
    return res.json({
        error:"Something went wrong"
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
            error:"Something went wrong"
        })
     }
})

module.exports={
   favoritesRouter:favoritesRouter
}