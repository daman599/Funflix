import { MovieList } from "./TrendingMovieCard"
import { useFetch } from "../Custom-hook/useFetch"
import { TextGenerateEffect } from "../Components/ui/text-generate-effect"
const Backend_url = "https://funflix-backend-j5wb.onrender.com"
import { SearchBar } from "./SearchBar1";
import { Loader } from "./helper/Loader";

export const Trending = () => {
  const { loading, isError, data: trendMovies } = useFetch(`${Backend_url}/movie/trending`);

  if (isError) {
    throw new Error("Error");
  }

  return <div className="flex flex-col items-center justify-center mt-4 px-40">

    <div className="flex items-center justify-between w-full">
      <TextGenerateEffect
        className="text-blue-900 inline-block text-xl sm:text-2xl font-medium"
        words="Trending Movies"
      />
      <SearchBar />
    </div>

    {loading ? <Loader />
      :
      <div className="flex flex-wrap justify-center gap-6 px-8 py-6 max-w-7xl sm:px-8 mx-auto">
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
  </div>
}