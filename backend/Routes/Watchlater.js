const express = require("express");
const watchlaterRouter = express.Router();
const { Userauthentication } = require("../Middleware/auth");
const { UserModel, MovieModel } = require("../db");

watchlaterRouter.get('/list', Userauthentication, async (req, res) => {
  const userId = req.user.userId;
  const user = await UserModel.findById(userId);

  try {
    const list = await MovieModel.find({ tmdb_id: { $in: user.watchlater } });
    if (list.length == 0) {
      res.json({
        message: "There is no movie added to your watchlater list."
      })
      return;
    }
    return res.json({
      watchlaterMovies: list
    })
  } catch (err) {
    return res.json({
      error: "Something went wrong."
    })
  }
})

watchlaterRouter.post('/add/movie', Userauthentication, async (req, res) => {
  const userId = req.user.userId;
  const movieId = req.body.movieId;

  try {
    await UserModel.updateOne({ _id: userId }, { $addToSet: { watchlater: movieId } });
    await MovieModel.updateOne({ tmdb_id: movieId }, { $set: { isUserAdded: "True" } });

    return res.json({
      message: "Movie is added to your watchlater list."
    })
  } catch (err) {
    return res.json({
      error: "Something went wrong"
    })
  }
})

watchlaterRouter.delete('/remove/movie', Userauthentication, async (req, res) => {
  const userId = req.user.userId;
  const movieId = req.body.movieId;

  try {
    await UserModel.updateOne({ _id: userId }, { $pull: { watchlater: movieId } });
    await MovieModel.updateOne({ tmdb_id: movieId }, { $set: { isUserAdded: "False" } });

    return res.json({
      message: "The movie is removed from your watchlater list."
    })
  } catch (err) {
    return res.json({
      error: "Something went wrong"
    })
  }
})

module.exports = { watchlaterRouter }