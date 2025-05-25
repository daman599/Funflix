const express = require('express');
const googleAuthRouter = express.Router();
const { OAuth2Client } = require('google-auth-library')
const axios = require('axios')
require('dotenv').config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

const { UserModel } = require("../db")
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

googleAuthRouter.get('/auth', (req, res) => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['profile', 'email'],
        response_type: 'code'
    })
    res.redirect(url);
})

googleAuthRouter.get('/auth/callback', async (req, res) => {
    const auth_code = req.query.code;
    const { tokens } = await client.getToken(auth_code);

    client.setCredentials(tokens);
    const access_token = tokens.access_token;

    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    const name = userInfo.data.name;
    const email = userInfo.data.email;

    const userFound = await UserModel.findOne({
        email: email,
        username: name
    })

    let user = userFound;
    let token;

    if (!userFound) {
        user = await UserModel.create({
            username: name,
            email: email
        })
    }
    token = jwt.sign({
        "userId": user._id
    }, JWT_KEY);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 * 7
    })
    res.redirect("http://localhost:5173/stream");
})

module.exports = {
    googleAuthRouter: googleAuthRouter
}




