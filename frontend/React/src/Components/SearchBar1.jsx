import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export const SearchBar = () => {
    const [movieName, setMovieName] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="relative min-w-[290px] max-w-full  md:max-w-[300px] lg:max-w-[380px] xl:max-w-[600px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300 pointer-events-none" />
            <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value.trim())}
                placeholder="Search Movies..."
                className="w-full pl-10 pr-4 py-1 text-white placeholder-gray-500 border-2 border-blue-900/90 
                    rounded-md text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors"
                aria-label="Search movies"
            />
        </motion.div>
    );
}