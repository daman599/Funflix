import { MovieCard } from "./MovieCard";
import { useFetch } from "../Custom-hook/useFetch";
import { TextGenerateEffect } from "../Components/ui/text-generate-effect";
import { SearchBar } from "./SearchBar";
import { Loader } from "./helper/Loader";
import { motion, stagger } from "motion/react";
import { useState } from "react";

const backend_url = process.env.backend_url;

export const Trending = () => {
  const { loading, isError, data: trendMovies } = useFetch(`${backend_url}/movie/trending`);
  const [movieName, setMovieName] = useState("");

  if (isError) {
    throw new Error("Error");
  }

  return <div className="flex flex-col items-center justify-center mt-6 px-4 md:px-16 lg:px-24 xl:px-40">

    <div className="flex items-center justify-between w-full">
      <TextGenerateEffect
        className="text-blue-900 hidden md:inline-block text-base md:text-xl lg:text-2xl font-medium"
        words="Trending Movies"
      />
      <SearchBar setMovieName={setMovieName} movieName={movieName} />
    </div>

    {loading ? <Loader /> :
      <div className="flex flex-wrap justify-center gap-6 py-6 mx-auto">
        {trendMovies.map((movie) => {
          if (movie.poster_path) {
            return (
              <motion.div
                initial={{ opacity: 0, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeInOut", dealy: stagger(0.05) }}
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
        })
        }
      </div>
    }
  </div>
}