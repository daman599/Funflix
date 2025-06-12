const express = require("express");
const app = express();

const { userRouter } = require("./Routes/User");
const { movieRouter } = require("./Routes/Movie");
const { googleAuthRouter }  = require("./Routes/Google_auth");
const { favoritesRouter }  = require("./Routes/Favorites");
const { watchlaterRouter } = require("./Routes/Watchlater");

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors({
  origin: "https://funflix-frontend.onrender.com",  
  credentials: false                
}));

mongoose.connect(process.env.MONGODB_URL);
app.use(express.json());

app.use("/user",userRouter);
app.use("/movie",movieRouter);
app.use("/google",googleAuthRouter);
app.use("/favorites",favoritesRouter);
app.use("/watchlater",watchlaterRouter);

app.listen(3000,()=>{
    console.log("server has started");
})
