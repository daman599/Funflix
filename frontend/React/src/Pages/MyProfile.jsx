import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { MovieList } from "../Components/MovieList"
import { useFetch } from "../Custom-hook/useFetch"

export function MyProfile() {
    const navigate = useNavigate();
    const [favMovies, setFavMovies] = useState([])
    const [watchlaterMovies, setWatchLaterMovies] = useState([])

    const { userInfo } = useFetch("http://localhost:3000/user/profile")

    async function getFavMovies() {
        const favMovies = await axios.get("http://localhost:3000/favorites", {
            withCredentials: true
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
        const watchLaterMovies = await axios.get("http://localhost:3000/watchlater/list", {
            withCredentials: true
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
        const response = await axios.get("http://localhost:3000/user/signout", {
            withCredentials: true
        })
        alert(response.data.message)
        navigate("/")
    }

    async function deleteAccount() {
        const response = await axios.delete("http://localhost:3000/user/account", {
            withCredentials: true
        })
        alert(response.data.message)
        navigate("/")
    }
    return <>
        <div>
            <div>Hi there! {userInfo.username} </div>
            <div style={{ color: "violet" }}>
                <div>Username: {userInfo.username}</div>
                <div>User Email:{userInfo.email}</div>
            </div>
            <br />
            <div>
                <button onClick={getFavMovies} style={{ cursor: "pointer" }}>My fav movies</button>
                <div style={{ display: "flex" }}>
                    {favMovies.map((movie) => {
                        return <MovieList
                            key={movie._id}
                            poster_path={movie.poster_path}
                            title={movie.title}
                            tmdb_id={movie.tmdb_id}
                        />
                    })}
                </div>
                <button onClick={getWatchLaterMovies} style={{ cursor: "pointer" }}>Watch later list </button>
                <div style={{ display: "flex" }}>
                    {watchlaterMovies.map((movie) => {
                        return <MovieList
                            key={movie._id}
                            poster_path={movie.poster_path}
                            title={movie.title}
                            tmdb_id={movie.tmdb_id}
                        />
                    })}
                </div>
            </div>
            <br />
            <div>

                <button onClick={logout} style={{ cursor: "pointer" }}>Logout</button>
                <button onClick={deleteAccount} style={{ cursor: "pointer" }}>Delete Account</button>
            </div>
        </div>
    </>
}