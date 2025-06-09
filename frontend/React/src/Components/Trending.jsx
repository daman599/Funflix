import { MovieList } from "./TrendingMovieCard"
import { useFetch } from "../Custom-hook/useFetch"
import { TextGenerateEffect } from "../Components/ui/text-generate-effect"

export function Trending() {

  const { loading, isError, data: trendMovies } = useFetch("http://localhost:3000/movie/trending");

  if (isError) {
    throw new Error("Error");
  }
  return <>
    <TextGenerateEffect
       className="text-[#373D90] w-72 sm:w-80 text-xl sm:text-2xl md:text-3xl font-medium px-4 sm:px-8 pt-4 sm:pt-5 pb-3 sm:pb-4 ml-4 sm:ml-8 md:ml-16 -mt-2 sm:-mt-4"
       words="Trending Movies"
    />

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