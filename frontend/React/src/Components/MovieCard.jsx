import { Link } from "react-router-dom";

export const MovieCard = ({ poster_path, title, tmdb_id, searched = false }) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    return (
        <Link to={`/movie-details/${tmdb_id}`}
            className="no-underline text-inherit">

            <div className="relative z-10 w-44 h-[320px] sm:w-48 md:w-52 lg:w-56 cursor-pointer
             bg-blue-950/50 rounded-2xl overflow-hidden shadow-md 
            hover:scale-105 hover:shadow-lg hover:shadow-blue-800 transition-all 
            duration-300 ease-in-out">
                <img
                    src={posterUrl}
                    className="w-full h-64 object-cover rounded-t-2xl"
                    alt={title}
                />

                {searched && <div className="p-2 text-center text-white font-semibold text-sm sm:text-base line-clamp-2">
                    {title}
                </div>}
            </div>

        </Link>
    );
}