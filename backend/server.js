const axios = require("axios");
const express = require("express");
const app = express();
const session=require("express-session");
const mongoose = require("mongoose");
const UserModel = require("./db.js");
const dotenv=require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);
const jwt = require("jsonwebtoken");
const JWT_KEY=process.env.JWT_KEY;
const cors = require("cors");
app.use(cors());
app.use(express.json());
//session
app.use(session({
   secret:process.env.SECRET_KEY,
   resave:false,
   uninitialized:false,
   cookie:{maxAge:24*60*60*100}
}))

//Oauth
const { OAuth2Client } =require("google-auth-library");
const { GoogleAuthExceptionMessages } = require("google-auth-library/build/src/auth/googleauth.js");
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
app.get("/callback",async (req,res)=>{
    const auth_code = req.query.code;
   const params= {
        "grant_type":"authorization_code",
        "code":auth_code,
        "redirect_uri":"http://localhost:3000/callback",
        "client_id":GOOGLE_CLIENT_ID,
        "client_secret":GOOGLE_CLIENT_SECRET
    }
    const response = await axios.post("https://oauth2.googleapis.com/token",params,{
        Headers:{
            "Content_Type": "application/x-www-form-urlencoded",
            "Accept": "application/json" 
        },
    })
    const accessToken= response.data.access_token;
    const api_endpoint="https://www.googleapis.com/oauth2/v1/userinfo"
    const respi = await axios.get(api_endpoint,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
    req.session.user={
        id:respi.data.id,
        name:respi.data.name,
        email:respi.data.email
    }
    res.redirect("http://localhost:5500/frontend/secondpage.html");
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
