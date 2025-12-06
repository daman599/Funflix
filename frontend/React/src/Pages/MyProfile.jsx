import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MovieCard } from "../Components/MovieCard";
import { useFetch } from "../Custom-hook/useFetch";

const backend_url = import.meta.env.VITE_backend_url;

export const MyProfile = () => {
  const navigate = useNavigate();
  const [favMovies, setFavMovies] = useState([])
  const [watchlaterMovies, setWatchLaterMovies] = useState([])

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

  return <>
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1338] via-[#0C0516] to-[#1c1c3b] animate-gradient-slow opacity-20 z-0" />

      <div className="relative z-10 w-full max-w-5xl space-y-12">
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold text-white tracking-wide animate-slide-in">
            Hi there ,<span class="text-white/80">{userInfo.username}</span> 👋
          </h2>
          <div classNamw="mt-4 space-y-1 text-white/70 text-base">
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
        </div>

        <section className="space-y-5 animate-fade-in-up">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-white/90">🎬 Favorite Movies</h3>
            <button
              onClick={getFavMovies}
              className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
            >
              Load Favorites
            </button>
          </div>
          <div className="flex flex-wrap gap-5">
            {favMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            ))}
          </div>
        </section>

        <section className="space-y-5 animate-fade-in-up delay-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-white/90">⏳ Watch Later</h3>
            <button
              onClick={getWatchLaterMovies}
              className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
            >
              Load Watch Later
            </button>
          </div>
          <div className="flex flex-wrap gap-5">
            {watchlaterMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-6 border-t border-white/10 mt-8 animate-fade-in-up delay-300">
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md border border-red-500 text-red-400 hover:bg-red-500/10 transition"
          >
            Logout
          </button>
          <button
            onClick={deleteAccount}
            className="px-4 py-2 rounded-md border border-red-700 text-red-500 hover:bg-red-700/10 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </>
}
