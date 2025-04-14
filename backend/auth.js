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
//Oauth
const { OAuth2Client } =require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const client = new OAuth2Client(GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,REDIRECT_URI);

app.get("/auth/google",(req,res)=>{
    const auth_url= client.generateAuthUrl({
        access_type:"online",
        scope:["profile","email"],
        response_type:"code"
    })
    res.redirect(auth_url);
})
app.get("/callback",async (res,req)=>{
    const auth_code= res.query.code;
    const token = client.getToken(auth_code);
})

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
app.listen(3000,()=>{
    console.log("Server has started")
})
