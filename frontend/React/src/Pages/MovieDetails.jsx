import { useParams } from "react-router-dom"
import { MovieCard } from "../Components/MovieCard"
import { useState, useEffect } from "react";
import axios from "axios"
import { ErrorBoundary } from "../Components/ErrorBoundary";

export function MovieDetails() {
  return <>
    <ErrorBoundary>
      <GetMovieDetails />
    </ErrorBoundary>
  </>
}
function GetMovieDetails() {

  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [streamingDetails, setStreamingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  if (error) {
    throw new Error("Error");
  }

  useEffect(() => {

    setLoading(true);

    async function apiCall() {
      const movieDetails = await axios.get("http://localhost:3000/movie/details", {
        params: {
          movieId: id
        }
      })

      setMovieDetails(movieDetails.data.moviedetails);
      const streamingDetails = await axios.get("http://localhost:3000/movie/streaming/availability", {
        params: {
          movieId: id
        }
      })

      if (streamingDetails.data.message) {
        setMessage("Not Available on any streaming platform")
      }
      else if (streamingDetails.data.Error) {
        setError(true);
      }
      else {
        const streamingOptions = streamingDetails.data.streamingdetails.map((movie) => {
          return ({
            serviceName: movie.service.name,
            logo_url: movie.service.imageSet.lightThemeImage,
            type: movie.type,
            link: movie.link,
            quality: movie.quality
          });
        })
        setStreamingDetails(streamingOptions);
      }
      setLoading(false);
    }
    apiCall();
  }, [])

  return <div>
    {loading && <p>Loading....</p>}

    {!loading && message == "" ? <MovieCard
    
      key={movieDetails._id}
      poster_path={movieDetails.poster_path}
      title={movieDetails.title}
      overview={movieDetails.overview}
      rating={movieDetails.rating}
      release_date={movieDetails.release_date}
      isTrending={movieDetails.isTrending}
      streaming={streamingDetails}

    /> : null}

    {message != "" && message}
  </div>
}