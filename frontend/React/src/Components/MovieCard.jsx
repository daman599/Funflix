import { Link } from "react-router-dom";

export const MovieCard = ({ poster_path, title, tmdb_id, searched = false }) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    return (
        <Link to={`/movie-details/${tmdb_id}`}
            className="no-underline text-inherit">

            <div className="relative z-10 w-40 h-[250px] md:h-[280px] lg:h-[320px] md:w-48 lg:w-56 cursor-pointer
             bg-blue-950/50 rounded-2xl overflow-hidden shadow-md 
            hover:scale-105 transition-all 
            duration-300 ease-in-out">

                <img src={posterUrl}
                    className={`w-full ${searched ? "h-52 md:h-64" : "h-full"} object-cover rounded-t-2xl`}
                    alt={title}
                />

                {searched && <div className="p-2 text-center text-white font-semibold text-sm sm:text-base line-clamp-2">
                    {title}
                </div>}
            </div>

        </Link>
    );
}