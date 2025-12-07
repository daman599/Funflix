import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MovieCard } from "../Components/MovieCard";
import { useFetch } from "../Custom-hook/useFetch";
import { motion } from "motion/react";
import { LoadingSkeleton } from "../Components/helper/LoadingSkeleton";

const backend_url = import.meta.env.VITE_backend_url;

export const MyProfile = () => {
  const { userInfo } = useFetch(`${backend_url}/user/profile`);

  const navigate = useNavigate();

  const [favMovies, setFavMovies] = useState([]);
  const [watchlaterMovies, setWatchLaterMovies] = useState([]);

  const token = localStorage.getItem('token');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const MovieListSection = ({ title, buttonText, onLoad, movieArr, loading, setLoading }) => {
    return (
      <div className="flex flex-col items-start justify-center w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-base md:text-xl font-medium text-white/90">{title}</h2>

          <button onClick={() => {
            onLoad();
            setLoading(true);
          }}
            className="cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium
             border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
          >
            {buttonText}
          </button>
        </div>

        {loading ? <LoadingSkeleton count={4} />
          : (
            <div className="flex flex-wrap items-start gap-3 my-2">
              {movieArr.map((movie) => (
                <MovieCard
                  key={movie._id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  tmdb_id={movie.tmdb_id}
                />
              ))}
            </div>
          )
        }
      </div>
    );
  }

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
      setFavMovies(favMovies.data.favoriteMovies);
      setLoading1(false);
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
      alert(watchLaterMovies.data.message);
    }
    else {
      setWatchLaterMovies(watchLaterMovies.data.watchlaterMovies);
      setLoading2(false);
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
            <motion.span initial={{ opacity: 0, filter: "blur(2px)", y: -5 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-gray-300">{userInfo.username}</motion.span>
          </h2>

          <div className="flex flex-col items-start justify-center text-gray-400 text-sm md:text-base gap-1 my-1">
            <p>Username:&nbsp;
              <motion.span initial={{ opacity: 0, filter: "blur(2px)", y: -5 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }} className="text-gray-600">{userInfo.username}</motion.span>
            </p>

            <p>Email:&nbsp;
              <motion.span initial={{ opacity: 0, filter: "blur(2px)", y: -5 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }} className="text-gray-600">{userInfo.email}</motion.span>
            </p>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-600/10 rounded-full "></div>

        <MovieListSection title={"Favorite Movies"} buttonText={"Load Favorites"} onLoad={getFavMovies} movieArr={favMovies} loading={loading1} setLoading={setLoading1} />

        <div className="w-full h-0.5 bg-gray-600/10 rounded-full "></div>

        <MovieListSection title={"Watch Later"} buttonText={"Load Watch Later"} onLoad={getWatchLaterMovies} movieArr={watchlaterMovies} loading={loading2} setLoading={setLoading2} />
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
