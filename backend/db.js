const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User=new Schema({
    username:String,
    email:{type:String,unique:true,required:true},
    password:String,
})

const Movie = new Schema({
    title:{type:String,required:true},
    tmdb_id:{type:Number,unique:true},
    type:String,
    overview:String,
    release_date:String,
    poster_path:String,
    rating:Number,
    streaming:[{
        provider_id:Number,
        country:String,
        type:String,
        price:Number,
        link:String
    }]
})

const Providers = new Schema({
    name:String,
    logo_url:String,
    provider_id:Number,
    countries:[String]
})

const UserModel = mongoose.model("UserInfo",User);
const MovieModel = mongoose.model("MovieInfo",Movie);
const ProviderModel = mongoose.model("ProvidersInfo",Providers);

module.exports={
   UserModel,
   MovieModel,
   ProviderModel
}

