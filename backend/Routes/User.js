const express = require("express");
const userRouter = express.Router();
const {  UserModel, MovieModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY=process.env.JWT_KEY;
const { Userauthentication } = require("../Middleware/auth");

userRouter.post("/signup",async (req,res)=>{
    //input validation
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

userRouter.post("/signin",async(req,res)=>{
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
        "userId":userFound._id
    },JWT_KEY);

    //cookie set
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:24 * 60 * 60 * 1000 * 7
    })
    res.send("ok u are logged in ")
})

userRouter.get("/signout",(req,res)=>{
   res.clearCookie("token");
   res.send("ok u are logged out")
})

userRouter.get("/profile",Userauthentication,async (req,res)=>{
      const userId = req.user.userId;
      const profileInfo = await UserModel.findById(userId).select('-password');
      res.status(200).json({
        profile_info:profileInfo
      })
})

userRouter.put("/profile",Userauthentication,async (req,res)=>{
    const userId = req.user.userId;
    const { newUsername , newPassword , newEmail } = req.body;

    if(newUsername){
        const zodSchema = z.string().min(6).max(20);

        const parsedObj = zodSchema.safeParse(newUsername);
        if(!parsedObj.success){
           res.json({
               ERROR:parsedObj.error
           })
           return
        }
        await UserModel.updateOne({ _id : userId },{ $set: { username : newUsername }});
    }

    if(newEmail){
        const zodSchema = z.string().email();

        const parsedObj = zodSchema.safeParse(newEmail);
        if(!parsedObj.success){
           res.json({
               ERROR:parsedObj.error
           })
           return
        }
        await UserModel.updateOne({ _id : userId },{ $set: { email : newEmail }});
    }

    if(newPassword){
        const zodSchema =z.string().regex(/[a-z]/,"Password must contain one lowercase character").regex(/[A-Z]/,"Password must contain one uppercase character").regex(/[^A-Z0-9a-z]/,"Password must contain one special character")

        const parsedObj = zodSchema.safeParse(newPassword);
        if(!parsedObj.success){
            res.json({
                ERROR:parsedObj.error
            })
            return 
        }
        const hashedPassword = await bcrypt.hash(newPassword,5);

        await UserModel.updateOne({ _id:userId },{ $set : { password : hashedPassword }});
    }

    const updatedUser = await UserModel.findById(userId).select("-password");
    
    res.json({
        message:"your profile is updated",
        updated_info:updatedUser
    })
})

userRouter.delete("/account",Userauthentication,async (req,res)=>{
    const userId=req.user.userId;
    res.clearCookie('token');
    await UserModel.deleteOne( {_id : userId});
    res.json({
        message:"your account is deleted"
    })
})

userRouter.post('/favorites/movie',Userauthentication ,async (req,res)=>{
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

userRouter.get('/favorites',Userauthentication,async (req,res)=>{
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
  try{
    const favMovies =await MovieModel.find({tmdb_id :{$in : user.favorites}});
    return res.json({
        favoriteMovies:favMovies
    }) 
  }catch(err){
    return res.json({
        message:"There is no favorite movie"
    })
  }
})

userRouter.delete('/favorites/movie',Userauthentication,async (req,res)=>{
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

module.exports ={
   userRouter:userRouter
}