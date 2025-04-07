import express, { json } from "express";
import jwt from "jsonwebtoken";
const JWT_KEY="daman@1234";
const app=express();
import cors from "cors";

app.use(cors());
app.use(json());
import { connect } from "mongoose";
await connect("mongodb+srv://admin:daman%401234@cluster0.ixobnmc.mongodb.net/flixFusion");

import { UserModel } from "./db.js";
// // function auth(req,res,next){
// //     const token= req.headers.token;
// //     if(!token){
// //         return res.send("not logged in")
// //     }
// // try{
// //     const verifiedData=verify(token,JWT_KEY);
// //     const username=verifiedData.username;
// //     req.username=username;
// //     next();
// // }
// // catch(err){
// //       return res.status(404).send("invalid token")
// //  }        
// // }

app.post('/signup',async function (req,res){
   const email=req.body.email;
   const password=req.body.password;

  await UserModel.create({
      email:email,
      password:password
   })
   res.send("You are signed up");
})

// app.post('/login',function (req,res){
//     const username=req.body.username;
//     const password=req.body.password;
    
//     const foundUser=users.find((user) => user.username==username && user.password == password);
//     if(foundUser){
//       const token=sign({
//         username
//       },JWT_KEY);
//       res.json({
//         "token":token
//       })
//     }
//     else{
//         res.send("wrong credantials");
//     }
//  })

// app.get('/me',auth ,function(req,res){
//     res.json({
//     username:req.username
//   })
// })
app.listen(3000,()=>{
    console.log("server has started");
})