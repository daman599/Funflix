import { useParams } from "react-router-dom"
import { MovieCard } from "../Components/MovieCard"
import { ErrorBoundary } from "../Components/ErrorBoundary";
import { useFetch } from "../Custom-hooks/useFetch"

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

  const streamingOptions = streamingDetails.map((movie) => {
    return ({
      serviceName: movie.service.name,
      logo_url: movie.service.imageSet.lightThemeImage,
      type: movie.type,
      link: movie.link,
      quality: movie.quality
    });
  })

  return <div>
    {detailsLoading || streamingLoading ? <p>loading....</p> :
      message !== "" ? message :
        <MovieCard
          key={movieDetails._id}
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