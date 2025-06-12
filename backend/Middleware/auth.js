const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

function Userauthentication(req,res,next){
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
    
   if(!token){
    res.json({
        error:"You are not signed in"
    })
    return
   }
try{
  const obj = jwt.verify(token,JWT_KEY);
  req.user={
    userId :obj.userId
  };
  next();
}catch(err){
    res.json({
        error:"Invalid token"
    })
   }
}
module.exports = {
    Userauthentication
}
