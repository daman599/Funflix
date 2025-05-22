const express = require("express");
const watchlaterRouter = express.Router();
const { Userauthentication } = require("../Middleware/auth");
const { UserModel ,MovieModel } = require("../db");

watchlaterRouter.get('/list',Userauthentication,async (req,res)=>{
    const userId =req.user.userId;
    const user=await UserModel.findById(userId);
 try{
    const list= MovieModel.find({tmdb_id:{$in : user.watchlater}});
    return res.json({
     watchlaterMovies:list
    })
 }catch(err){
     Error:"There is no movie in the watch later lsit "
 }
 })
 
watchlaterRouter.post('/add/movie',Userauthentication,async (req,res)=>{
     const userId = req.user.userId;
     const movieId = req.body.movieId;
      
     try{
      await UserModel.updateOne({ _id:userId },{ $addToSet:{ watchlater:movieId }});
      await MovieModel.updateOne({tmdb_id:movieId},{$set :{isUserAdded:"True"}});
      
      return res.json({
         message:"Movie is added to watch later list"
      })
     }catch(err){
         return res.json({
             Error:"Something went wrong"
         })
     }
 })
 
watchlaterRouter.delete('/remove/movie',Userauthentication,async(req,res)=>{
   const userId = req.user.id;
   const movieId = req.body.movieId;
   try{
     await UserModel.updateOne({ _id :userId},{$pull:{watchlater:movieId}})
     
     return res.json({
     message:"The movie is removed from watch later list"
    })
   }catch(err){
     return res.json({
     Error:"Something went wrong"
     })
   }
 })

module.exports={
    watchlaterRouter:watchlaterRouter
}