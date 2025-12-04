import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { useFetch } from "../Custom-hook/useFetch";
import { Error } from "./helper/Error";
import { Loader } from "../Components/helper/Loader";
import { NoMovieFound } from "../Components/helper/NoMovieFound";

const backend_url = import.meta.env.VITE_backend_url;

export const SearchMovie = ({ movieName }) => {
  const [actualTitle, setTitle] = useState("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      setTitle(movieName);
    }, 500)

    return () => {
      clearTimeout(delay)
    }
  }, [movieName])

  const { loading, isError, data: movieList, noMovieFound } = useFetch(`${backend_url}/movie/search`,
    { title: actualTitle },
    actualTitle !== ""
  )
  if (isError) {
    return <Error />
  }

  return (
    <div class="relative z-10">
      {noMovieFound ? <NoMovieFound /> : loading ? <Loader /> : (
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 mx-auto">
          {movieList.map((movie) => {
            if (movie.poster_path) {
              <MovieCard
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
                searched={true}
              />
            }
          }
          )}
        </div>
      )
      }
    </div >
  )
}