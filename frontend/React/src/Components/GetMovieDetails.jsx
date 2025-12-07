import { useParams } from "react-router-dom"
import { MovieDetailsCard } from "../Components/MovieDetailsCard"
import { useFetch } from "../Custom-hook/useFetch"
import { BackgroundBeamsWithCollision } from "../Components/ui/background-beams-with-collision"
import { Loader } from "../Components/helper/Loader";
import { Error } from "../Components/helper/Error";
import { MovieNotAvailable } from "./helper/MovieNotAvailable";

const backend_url = import.meta.env.VITE_backend_url;

export const GetMovieDetails = () => {
    const { id } = useParams();

    const { loading: detailsLoading, data: movieDetails, isError } = useFetch(`${backend_url}/movie/details`, { movieId: id })
    const { loading: streamingLoading, data: streamingDetails, message } = useFetch(`${backend_url}/movie/streaming/availability`, { movieId: id })

    if (isError) {
        return <Error />
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

    if (detailsLoading || streamingLoading) {
        return <Loader />
    }

    return <>
        <div className="relative overflow-hidden min-h-screen bg-[#0C0516] flex items-center justify-center">
            {message !== "" ? (
                <MovieNotAvailable />
            ) : (
                <BackgroundBeamsWithCollision>
                    <MovieDetailsCard
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