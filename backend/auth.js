const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./db.js");
const dotenv=require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);
const jwt = require("jsonwebtoken");
const JWT_KEY=process.env.JWT_KEY;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    await UserModel.create({
        email:email,
        password:password
    })
    
    res.send("You are signed up successfully");
})

app.post("/signin",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

   const foundUser =  await UserModel.findOne({
        email:email,
        password:password
    })
    if(foundUser){
    const token = jwt.sign({
       id:foundUser._id
    },JWT_KEY);
    res.json({
        "token":token
    })
  }
    else{
     res.send("wrong credentials");
    }
})
app.post("/auth/google",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server has started")
})
