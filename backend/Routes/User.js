const express = require("express");
const userRouter = express.Router();
const {  UserModel , MovieModel , ServiceModel , AvailabilityModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();
const JWT_KEY=process.env.JWT_KEY;
const { Userauthentication } = require("../Middleware/user");
const TMDB_API_KEY = process.env.API_KEY;

userRouter.get("/search",async (req,res)=>{
    const movieTitle = req.query.title;
    
    const found = await MovieModel.find({
        title: { $regex: new RegExp(movieTitle, "i") }
    })
    if(found.length == 0){
        const url="https://api.themoviedb.org/3/search/movie";
        const movieData = await axios.get(url,{
        params:{
            api_key:API_KEY,
            query:movieTitle
        }
       })
       const results = movieData.data.results;
       for(let i = 0;i<results.length;i++){
         let movieObj = results[i];
         await MovieModel.create({
            title:movieObj.original_title,
            overview:movieObj.overview,
            id:movieObj.id,
            release_year:movieObj.release_date,
            posterURL:movieObj.poster_path,
            content_type:"movie",
         })
       }
      
      const data =await MovieModel.find({
        title:{ $regex: new RegExp(movieTitle, "i") }
      })
    } 
})
userRouter.post("/signup",async (req,res)=>{
    const zodSchema = z.object({
       username:z.string().max(6),
       email:z.string().min(8).max(20).email(),
       password:z.string().regex(/[a-z]/,"Password must contain one lowercase character")
       .regex(/[A-Z]/,"Password must contain one uppercase character")
       .regex(/[^A-Z0-9a-z]/,"Password must contain one special character")
    })
    const parsedObj = zodSchema.safeParse(req.body);
    if(!parsedObj.success){
       res.json({
           ERROR:parsedObj.error
       })
       return
    }
    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
try{
    await UserModel.create({
       username:username,
       email:email,
       password:hashedPassword
    })
    res.json({
       message:"You have signed up"
    })
}catch(err){
    res.json({
        error:"a user with this email already exists in db "
    })
}
})
userRouter.post("/login",async(req,res)=>{
    const { username,email,password } = req.body;
    const userFound = await UserModel.findOne({
        email:email,
        username:username
    })
    if(!userFound){
       res.json({
        error:"wrong credentials"
       })
       return
    }
    const hashedPassword = bcrypt.compare(password,userFound.password);
    if(!hashedPassword){
        res.json({
            error:"wrong password"
        })
        return 
    }
    const token = jwt.sign({
        email,
        username
    },JWT_KEY);
    res.json({
        token:token
    })
})
userRouter.get("/fav",Userauthentication,(req,res)=>{

})
userRouter.delete("/logout",(req,res)=>{
    res.json({
        message:"token delete"
    })
})
module.exports ={
   userRouter:userRouter
}