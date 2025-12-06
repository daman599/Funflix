import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MovieCard } from "../Components/MovieCard";
import { useFetch } from "../Custom-hook/useFetch";
import { motion } from "motion/react";

const backend_url = import.meta.env.VITE_backend_url;

export const MyProfile = () => {
  const navigate = useNavigate();
  const [favMovies, setFavMovies] = useState([]);
  const [watchlaterMovies, setWatchLaterMovies] = useState([]);

  const { userInfo } = useFetch(`${backend_url}/user/profile`)
  const token = localStorage.getItem('token');

  async function getFavMovies() {
    const favMovies = await axios.get(`${backend_url}/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (favMovies.data.error) {
      alert(favMovies.data.error);
    }
    else if (favMovies.data.message) {
      alert(favMovies.data.message)
    }
    else {
      setFavMovies(favMovies.data.favoriteMovies)
    }
  }

  async function getWatchLaterMovies() {
    const watchLaterMovies = await axios.get(`${backend_url}/watchlater/list`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (watchLaterMovies.data.error) {
      alert(watchLaterMovies.data.error);
    }
    else if (watchLaterMovies.data.message) {
      alert(watchLaterMovies.data.message)
    }
    else {
      setWatchLaterMovies(watchLaterMovies.data.watchlaterMovies);
    }
  }

  async function logout() {
    const response = await axios.get(`${backend_url}/user/signout`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    localStorage.removeItem('token')
    alert(response.data.message)
    navigate("/")
  }

  async function deleteAccount() {
    const response = await axios.delete(`${backend_url}/user/account`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    localStorage.removeItem('token')
    alert(response.data.message)
    navigate("/")
  }

  return (
    <motion.div initial={{ opacity: 0, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-blue-950/50 rounded-xl flex flex-col items-center justify-center p-3 md:p-5 gap-2">

        <div className="w-full text-lg md:text-2xl font-medium flex flex-col items-start justify-center ">
          <h2 className="text-gray-400">
            Hi there!&nbsp;
            <span className="text-gray-300">{userInfo.username}</span>
          </h2>

          <div className="flex flex-col items-start justify-center text-gray-400 text-sm md:text-base gap-1 my-1">
            <p>Username:&nbsp;
              <span className="text-gray-600">{userInfo.username}</span>
            </p>

            <p>Email:&nbsp;
              <span className="text-gray-600">{userInfo.email}</span>
            </p>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-600/10 rounded-full "></div>

        <div className="flex felx-col items-start justify-center w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base md:text-xl font-medium text-white/90">Favorite Movies</h2>

            <button onClick={getFavMovies}
              className="cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium
             border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
            >
              Load Favorites
            </button>
          </div>

          <div className="flex flex-wrap items-start gap-3">
            {favMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-600/10 rounded-full "></div>

        <div className="flex flex-col items-start justify-center w-full">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-base md:text-xl font-medium text-white/90">Watch Later</h3>

            <button onClick={getWatchLaterMovies}
              className="cursor-poniter px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium
             border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
            >
              Load Watch Later
            </button>
          </div>

          <div className="flex flex-wrap items-start gap-3">
            {watchlaterMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 text-sm md:text-base font-medium">
        <button onClick={logout}
          className="cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md border-1 border-blue-900 text-blue-900 hover:bg-blue-500/10 transition"
        >
          Logout
        </button>

        <button onClick={deleteAccount}
          className="cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md border border-red-900 text-red-900 hover:bg-red-500/10 transition"
        >
          Delete Account
        </button>
      </div>

    </motion.div>
  );
}
