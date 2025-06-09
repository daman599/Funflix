import { useState, useEffect } from "react"
import { SearchMovieCard } from "./SearchMovieCard"
import { useFetch } from "../Custom-hook/useFetch"

export function SearchBar({ movieName }) {
  const [actualTitle, setTitle] = useState("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      setTitle(movieName);
    }, 500)

    return () => {
      clearTimeout(delay)
    }
  }, [movieName])

  const { loading, isError, data: movieList, noMovieFound } = useFetch("http://localhost:3000/movie/search",
    { title: actualTitle },
    actualTitle !== ""
  )
  if (isError) {
    throw new Error("error")
  }

  return (
    <div class="relative z-10">
      {actualTitle && (
        <>
          {noMovieFound ? (
            <div className="min-h-[200px] flex items-center justify-center text-center">
              <p className="text-[#655e5e] text-lg sm:text-xl md:text-2xl font-semibold">
                Oops! Sorry... no such movie found
              </p>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin border-[#373D90]"></div>
            </div>
          ) : (
       <div className="mt-10 mb-10 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-6">
              {movieList.map((movie) =>
                movie.poster_path ? (
                  <SearchMovieCard
                    key={movie._id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    tmdb_id={movie.tmdb_id}
                  />
                ) : null
              )}
            </div>
          )}
        </>
      )}

    </div>
  )

}