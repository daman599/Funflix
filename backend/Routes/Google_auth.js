const express =require('express');
const googleAuthRouter = express.Router();
const { OAuth2Client } =require('google-auth-library')
const axios =require('axios')
require('dotenv').config()
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI=process.env.REDIRECT_URI

const client = new OAuth2Client(GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,REDIRECT_URI);

googleAuthRouter.get('/auth',(req,res)=>{
   const url = client.generateAuthUrl({
    access_type:'offline',
    prompt:'consent',
    scope:['profile','email'],
    response_type:'code'
   })
   res.redirect(url);
})

googleAuthRouter.get('/auth/callback',async (req,res)=>{
    const auth_code=req.query.code;
    const { tokens } = await client.getToken(auth_code);

    client.setCredentials(tokens);
    const access_token=tokens.access_token;

    const userInfo= await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',{
        headers:{
            Authorization:'Bearer ${access_token}'
        }
    })
    res.json({
        message:"Signed in with google successfully"
    })
    
})

module.exports = {
    googleAuthRouter:googleAuthRouter
}




