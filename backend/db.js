const mongoose =require("mongoose")
const Schema=mongoose.Schema;

const user=new Schema({
    email:String,
    password:String
})
const UserModel=mongoose.model("Users",user);

module.exports={
    UserModel
}
