import { useState, useEffect } from "react"
import { SearchMovieCard } from "./SearchMovieCard"
import { useFetch } from "../Custom-hook/useFetch"

export function SearchBar() {

  const [movieName, setMovieName] = useState("");
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
      <input
        type="text"
        placeholder="Search Movies...."
        onChange={(e) => { setMovieName(e.target.value.trim()) }}
      ></input>

      {noMovieFound && <p>Oops! Sorry...no such movie found </p>}

      {loading ? <div class="flex justify-center items-center h-screen">
        <div class="w-12 h-12 border-4 border-round rounded-full border-t-transparent animate-spin border-[#373D90]"></div>
      </div> : (
        <div class="flex flex-wrap justify-center p-6 gap-6 max-w-7xl">
          {movieList.map((movie) => {
            if (movie.poster_path) {
              return (
                <SearchMovieCard
                  key={movie._id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  tmdb_id={movie.tmdb_id}
                />
              );
            }
          })
          }
        </div>)
      }
    </div>
  );
}