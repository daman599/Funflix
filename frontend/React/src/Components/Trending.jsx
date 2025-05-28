import { MovieList } from "../Components/MovieList"
import { useFetch } from "../Custom-hooks/useFetch";

export function Trending() {

  const { loading, isError, data: trendMovies } = useFetch("http://localhost:3000/movie/trending");

  if (isError) {
    throw new Error("Error");
  }

  return <>
    <div style={{ backgroundColor: "yellowgreen" }}>Trending Movies </div>
    {loading ? <p>loading....</p> :
      <div style={{ display: "flex" }}>
        {trendMovies.map((movie) => {
          if (movie.poster_path) {
            return (
              <MovieList
                key={movie._id}
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            )
          }
        })
        }
      </div>
    }
  </>
}