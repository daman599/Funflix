import { useState, useEffect } from "react";
import { MovieList } from "./MovieList"
import { useFetch } from "../Custom-hook/useFetch";

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
    <>
      <input
        type="text"
        placeholder="Search Movies...."
        onChange={(e) => { setMovieName(e.target.value.trim()) }}
      ></input>

      {noMovieFound && <p>Oops! Sorry...no such movie found </p>}

      {loading ? <p>Loading ....</p> : (
        <div style={{
          display: "flex",
          overflowX: "auto"
        }}>
          {movieList.map((movie) => {
            if (movie.poster_path) {
              return (
                <MovieList
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
    </>
  );
}