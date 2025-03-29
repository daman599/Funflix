const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_KEY="hfkwerwircncsdfj";
const app=express();

function auth(req,res,next){
   const token=req.headers.token;
   if(!token){
      return res.send("not logged in");
   }
   try{
   const verifyInfo=jwt.verify(token,JWT_KEY);
   const name=verifyInfo.username;
   if(name){
      req.username=name;
      next();
   }
   }
   catch(err){
      return res.status(404).json({message:"invalid token"})
   }

}
app.use(express.json());
let users=[];
app.post('/signup',function(req,res){
   const username=req.body.username;
   const password=req.body.password;
   
   users.push({
      username:username,
      password:password
   })
   console.log(users)

   res.send("you are signed up");
})

app.post('/login',function(req,res){
   const username=req.body.username;
   const password=req.body.password;
   
   let foundUser= users.find((user)=>user.username == username && user.password == password)
   if(foundUser){
   const token=jwt.sign({
         username
        },JWT_KEY)
   res.json({
      "token":token
      })
   }
   else{
      res.json({
         message:"wrong credantials"
      })
   }
})

app.get('/me',auth,function(req,res){

 const foundUser= users.find((user)=> user.username == req.username);
 if(foundUser){
   res.json({
      username:foundUser.username,
      password:foundUser.password
   })
 }

})

app.listen(3000,function(){
   console.log("Server is up");
})


