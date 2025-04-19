const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const User=new Schema({
    email:{
          type:String,
          unique:true,
          required:true
        },
    password:String,
    profile:{
      name:String,
      avatar_URL:String,
      country:String,
      language_preference:String
    },
    preferences:{
        notification_setting:Boolean,
    },
    watchlist:{
       favourite_movies:[String]
    },
    activity_log:{
       login:Boolean,
       logout:Boolean,
       searches:[String]
    }
})

const UserModel=mongoose.model("UserInfo",User);

module.exports= UserModel



