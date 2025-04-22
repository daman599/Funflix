const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KWY = process.env.JWT_KEY;

function Userauthentication(req,res,next){
   const token = req.headers.token;
   if(!token){
    res.json({
        message:"you are not signed in"
    })
    return
   }
try{
  const obj = jwt.verify(token,JWT_KEY);
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