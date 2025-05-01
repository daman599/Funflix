const express = require("express");
const userRouter = express.Router();
const {  UserModel , MovieModel , ServiceModel , AvailabilityModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const axios = require("axios");
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
        "email":email,
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
      const userId = req.body.userId;
      const profileInfo = await UserModel.findById(userId).select('-password');
      res.status(200).json({
        profile_info:profileInfo
      })
})

userRouter.delete("/account",Userauthentication,async (req,res)=>{
    const userId=req.body.userId;
    res.clearCookie('token');
    await UserModel.deleteOne( {_id : userId});
    res.json({
        message:"your account is deleted"
    })
})

module.exports ={
   userRouter:userRouter
}