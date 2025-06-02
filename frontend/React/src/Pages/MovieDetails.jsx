import { useParams } from "react-router-dom"
import { MovieCard } from "../Components/MovieCard"
import { ErrorBoundary } from "../Components/ErrorBoundary";
import { useFetch } from "../Custom-hook/useFetch"

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

  return <div>
    {detailsLoading || streamingLoading ? <p>loading....</p> :
      message !== "" ? message :
        <MovieCard
          poster_path={movieDetails.poster_path}
          title={movieDetails.title}
          overview={movieDetails.overview}
          rating={movieDetails.rating}
          release_date={movieDetails.release_date}
          isTrending={movieDetails.isTrending}
          streaming={streamingOptions}
        />
    }
  </div>
}