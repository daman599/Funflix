const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const User=new Schema({
    username:String,
    email:{type:String,unique:true,required:true},
    password:String,
})

const UserModel=mongoose.model("UserInfo",User);

module.exports= UserModel
