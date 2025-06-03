import { MovieList } from "../Components/MovieList"
import { useFetch } from "../Custom-hook/useFetch";

export function Trending() {

  const { loading, isError, data: trendMovies } = useFetch("http://localhost:3000/movie/trending");

  if (isError) {
    throw new Error("Error");
  }
  return <>
    <div style={{ backgroundColor: "yellowgreen" }}>Trending Movies </div>
    {loading ? <div class="flex justify-center items-center h-screen">
      <div class="w-12 h-12 border-4 border-round rounded-full animate-spin border-white"></div>
    </div> :
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