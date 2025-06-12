import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { MovieList } from "../Components/TrendingMovieCard"
import { useFetch } from "../Custom-hook/useFetch"
import { StarsBackground } from "../Components/ui/stars-background"
const Backend_url = "https://funflix-backend-j5wb.onrender.com"

export function MyProfile() {
    const navigate = useNavigate();
    const [favMovies, setFavMovies] = useState([])
    const [watchlaterMovies, setWatchLaterMovies] = useState([])

    const { userInfo } = useFetch(`${Backend_url}/user/profile`)

    async function getFavMovies() {
        const token = localStorage.getItem('token');
        const favMovies = await axios.get(`${Backend_url}/favorites`,{  
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
        const token = localStorage.getItem('token');
        const watchLaterMovies = await axios.get(`${Backend_url}/watchlater/list`, {
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
        const response = await axios.get(`${Backend_url}/user/signout`)
        localStorage.removeItem('token')
        alert(response.data.message)
        navigate("/")
    }

    async function deleteAccount() {
        const response = await axios.delete(`${Backend_url}/user/account`, {
            withCredentials: true
        })
        alert(response.data.message)
        navigate("/")
    }
    
    return <>
    <div class="min-h-screen relative bg-[#0C0516] overflow-hidden flex items-center justify-center px-4 py-10">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1a1338] via-[#0C0516] to-[#1c1c3b] animate-gradient-slow opacity-20 z-0" />

      <div class="relative z-10 w-full max-w-5xl space-y-12">
        <div class="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg animate-fade-in">
          <h2 class="text-3xl font-bold text-white tracking-wide animate-slide-in">
            Hi there ,<span class="text-white/80">{userInfo.username}</span> 👋
          </h2>
          <div class="mt-4 space-y-1 text-white/70 text-base">
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
        </div>

        <section class="space-y-5 animate-fade-in-up">
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-semibold text-white/90">🎬 Favorite Movies</h3>
            <button
              onClick={getFavMovies}
              class="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
            >
              Load Favorites
            </button>
          </div>
          <div class="flex flex-wrap gap-5">
            {favMovies.map((movie) => (
              <MovieList
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            ))}
          </div>
        </section>

        <section class="space-y-5 animate-fade-in-up delay-200">
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-semibold text-white/90">⏳ Watch Later</h3>
            <button
              onClick={getWatchLaterMovies}
              class="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:shadow-[0_0_10px_#ffffff20] transition-all duration-200 bg-white/5"
            >
              Load Watch Later
            </button>
          </div>
          <div class="flex flex-wrap gap-5">
            {watchlaterMovies.map((movie) => (
              <MovieList
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            ))}
          </div>
        </section>

        <div class="flex justify-end gap-4 pt-6 border-t border-white/10 mt-8 animate-fade-in-up delay-300">
          <button
            onClick={logout}
            class="px-4 py-2 rounded-md border border-red-500 text-red-400 hover:bg-red-500/10 transition"
          >
            Logout
          </button>
          <button
            onClick={deleteAccount}
            class="px-4 py-2 rounded-md border border-red-700 text-red-500 hover:bg-red-700/10 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
      <StarsBackground/>
    </div>
    </>
}
