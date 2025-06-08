import { Link } from "react-router-dom";

export function SearchMovieCard({ poster_path, title, tmdb_id }) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link
      to={`/movie-details/${tmdb_id}`}
      className="group relative mx-auto w-36 sm:w-44 md:w-48 lg:w-52 h-[280px] sm:h-[300px] overflow-hidden rounded-2xl shadow-lg hover:shadow-[0_0_20px_#373D90] transform transition duration-300 hover:scale-105"
    >
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e33]/80 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-opacity duration-300 p-4 rounded-2xl backdrop-blur-sm">
        <span className="text-white text-sm font-semibold text-center px-2 line-clamp-2">
          {title.length > 30 ? title.slice(0, 28) + "..." : title}
        </span>
      </div>
    </Link>
  );
}
