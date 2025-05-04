const express = require("express");
const app = express();
const { userRouter } = require("./Routes/User");
const { movieRouter } = require("./Routes/Movie")
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookie_parser = require("cookie-parser") ;
app.use(cookie_parser());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);
app.use(express.json());

app.use("/user",userRouter);
app.use("/movie",movieRouter);

app.listen(3000,()=>{
    console.log("server has started");
})

