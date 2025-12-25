import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { useFetch } from "../hooks/useFetch";
import { Error } from "./helper/Error";
import { Loader } from "../components/helper/Loader";
import { NoMovieFound } from "../components/helper/NoMovieFound";

const backend_url = import.meta.env.VITE_backend_url;

export const SearchMovie = ({ movieName }) => {
  const [actualTitle, setTitle] = useState("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      setTitle(movieName.trim());
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

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {
        noMovieFound ? <NoMovieFound /> : (
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            {movieList.map((movie) => {
              if (movie.poster_path) {
                return (
                  < MovieCard
                    key={movie._id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    tmdb_id={movie.tmdb_id}
                    searched={true}
                  />
                );
              }
            })}
          </div>
        )
      }
    </>
  );
}