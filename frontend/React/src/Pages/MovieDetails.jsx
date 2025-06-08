import { useParams } from "react-router-dom"
import { MovieCard } from "../Components/MovieDetailsCard"
import { ErrorBoundary } from "../Components/ErrorBoundary"
import { useFetch } from "../Custom-hook/useFetch"
import { BackgroundBeamsWithCollision } from "../Components/ui/background-beams-with-collision"

export function MovieDetails() {
  return <>
    <ErrorBoundary>
      <GetMovieDetails />
    </ErrorBoundary>
  </>
}

function GetMovieDetails() {

  const { id } = useParams();

  const { loading: detailsLoading, data: movieDetails, isError } = useFetch("http://localhost:3000/movie/details", { movieId: id })
  const { loading: streamingLoading, data: streamingDetails, message } = useFetch("http://localhost:3000/movie/streaming/availability", { movieId: id })

  if (isError) {
    throw new Error("Error");
  }

  const streamingOptions = streamingDetails.map((platform) => {
    return ({
      serviceName: platform.service.name,
      logo_url: platform.service.imageSet.lightThemeImage,
      type: platform.type,
      link: platform.link,
      quality: platform.quality
    });
  })

  return <>
      <div class="relative overflow-hidden min-h-screen bg-[#0C0516] flex items-center justify-center">
       {detailsLoading || streamingLoading ? (
        <div class="flex justify-center items-center min-h-screen">
         <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#373D90]"></div>
        </div>
        ) : message !== "" ? (
         <p class="text-white text-2xl text-center">{message}</p>
        ) :  (
        <BackgroundBeamsWithCollision>
        <MovieCard
          poster_path={movieDetails.poster_path}
          title={movieDetails.title}
          overview={movieDetails.overview}
          rating={movieDetails.rating}
          release_date={movieDetails.release_date}
          isTrending={movieDetails.isTrending}
          streaming={streamingOptions}
        />
      </BackgroundBeamsWithCollision>
      )}
     </div>
  </>
}
