import { MovieCard } from "./MovieCard";
import { useFetch } from "../Custom-hook/useFetch";
import { motion, stagger } from "motion/react";
import { Error } from "./helper/Error";
import { LoadingSkeleton } from "./helper/LoadingSkeleton";

const backend_url = import.meta.env.VITE_backend_url;

export const Trending = () => {
  const { loading, isError, data: trendMovies } = useFetch(`${backend_url}/movie/trending`);

  if (isError) {
    return <Error />
  }

  if (loading) {
    return <LoadingSkeleton count={20} />
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      {trendMovies ? (trendMovies.length > 0 && trendMovies.map((movie, i) => {
        if (movie.poster_path) {
          return (
            <motion.div
              initial={{ opacity: 0, filter: "blur(2px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeInOut", dealy: stagger(i * 0.05) }}
              viewport={{ once: true }}
              key={movie._id}
            >
              <MovieCard
                poster_path={movie.poster_path}
                title={movie.title}
                tmdb_id={movie.tmdb_id}
              />
            </motion.div>
          )
        }
      })) :
        <Error />
      }
    </div>
  );
}