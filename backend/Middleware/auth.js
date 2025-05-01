const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

function Userauthentication(req,res,next){
   const token = req.cookies.token;
   if(!token){
    res.json({
        message:"you are not signed in"
    })
    return
   }
try{
  const obj = jwt.verify(token,JWT_KEY);
  req.body.userId=obj.userId;
  next();
}catch(err){
    res.json({
        error:"invalid token"
    })
   }
}
module.exports = {
    Userauthentication
}