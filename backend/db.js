const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User=new Schema({
    username:String,
    email:{type:String,unique:true,required:true},
    password:String,
})
const Movie_TVshow = new Schema({
    title:{type:String,required:true},
    content_type:String,
    release_year:Number,
    posterURL:String,
    overview:String
})
const Streaming_Service = new Schema({
     serviceName:{type:String,required:true},
     logoURL:String,
     websiteURL:String
})
const Availability = new Schema({
    movieId:{type:ObjectId,Required:true},
    serviceId:{type:ObjectId,Required:true},
    regionCode:String,
    availability_type:String,
})

Availability.index({ movieId: 1, regionCode: 1 }); 

const UserModel = mongoose.model("UserInfo",User);
const MovieModel = mongoose.model("Movie_tvInfo",Movie_TVshow);
const ServiceModel = mongoose.model("Streaming_Service",Streaming_Service);
const AvailabilityModel = mongoose.model("Availability",Availability);

module.exports={
    UserModel:UserModel,
    MovieModel:MovieModel,
    ServiceModel:ServiceModel,
    AvailabilityModel:AvailabilityModel
}

