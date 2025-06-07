import { MovieList } from "../Components/MovieList"
import { useFetch } from "../Custom-hook/useFetch"

export function Trending() {

  const { loading, isError, data: trendMovies } = useFetch("http://localhost:3000/movie/trending");

  if (isError) {
    throw new Error("Error");
  }
  return <>
    <div class="text-[#373D90] w-80 h-9 text-xl sm:text-2xl md:text-3xl font-medium px-4 pt-2 pb-5 sm:px-8 sm:pt-6 ml-4 sm:ml-8 md:ml-16">
      Trending Movies 
    </div>

    {loading ? 
    <div class="min-h-screen flex justify-center items-center py-9">
      <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#373D90]"></div>
    </div> :
      <div class="flex flex-wrap justify-center gap-6 px-8 py-6 max-w-7xl sm:px-8 mx-auto">
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