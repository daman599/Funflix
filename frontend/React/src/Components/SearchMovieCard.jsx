import { Link } from "react-router-dom";

export function SearchMovieCard({ poster_path, title, tmdb_id }) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link
      to={`/movie-details/${tmdb_id}`}
      className="group relative mx-auto w-36 sm:w-44 md:w-48 lg:w-52 h-[280px] sm:h-[300px] overflow-hidden rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
    >
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-full object-cover rounded-xl"
      />

      <div className="absolute inset-0 bg-[#0e0e33] bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
        <span className="text-white text-sm font-semibold text-center px-2">
          {title.length > 30 ? title.slice(0, 28) + "..." : title}
        </span>
      </div>
    </Link>
  );
}
