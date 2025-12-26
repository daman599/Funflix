const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    password: String,
    favorites: [Number],
    watchlater: [Number]
})

const Movie = new Schema({
    title: { type: String, required: true },
    tmdb_id: { type: Number, unique: true },
    type: String,
    overview: String,
    release_date: String,
    poster_path: String,
    rating: Number,
    isTrending: String,
    isUserAdded: { type: String, default: "False" },
    streaming: [Object]
})

const UserModel = mongoose.model("UserInfo", User);
const MovieModel = mongoose.model("MovieInfo", Movie);

module.exports = {
    UserModel,
    MovieModel,
}

