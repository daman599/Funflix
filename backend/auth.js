const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_KEY="daman@1234";
const app=express();
const cors=require("cors");
app.use(cors());

const users=[];
app.use(express.json());
function auth(req,res,next){
    const token= req.headers.token;
    if(!token){
        return res.send("not logged in")
    }
try{
    const verifiedData=jwt.verify(token,JWT_KEY);
    const username=verifiedData.username;
    req.username=username;
    next();
}
catch(err){
      return res.status(404).send("invalid token")
 }        
}

app.post('/signup',function (req,res){
   const username=req.body.username;
   const password=req.body.password;
   users.push({
    username:username,
    password:password
   })
   res.send("you are signed up");
})

app.post('/login',function (req,res){
    const username=req.body.username;
    const password=req.body.password;
    
    const foundUser=users.find((user) => user.username==username && user.password == password);
    if(foundUser){
      const token=jwt.sign({
        username
      },JWT_KEY);
      res.json({
        "token":token
      })
    }
    else{
        res.send("wrong credantials");
    }
 })

app.get('/me',auth ,function(req,res){
    res.json({
    username:req.username
  })
})
app.listen(3000,()=>{
    console.log("server has started");
})