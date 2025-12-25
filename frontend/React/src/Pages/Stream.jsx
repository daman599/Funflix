import { Trending } from "../components/Trending";
import { useState } from "react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { SearchBar } from "../components/SearchBar";
import { SearchMovie } from "../components/SearchMovie";

export const Stream = () => {
    const [movieName, setMovieName] = useState("");

    return (
        <div className="flex flex-col items-center justify-center mt-6 px-4 md:px-16 lg:px-24 xl:px-40">
            <div className="flex items-center justify-between w-full px-4 md:px-0">
                <TextGenerateEffect
                    className="text-blue-900 hidden md:inline-block text-base md:text-xl lg:text-2xl font-medium"
                    words="Trending Movies"
                />
                <SearchBar setMovieName={setMovieName} movieName={movieName} />
            </div>
            {movieName == "" ? <Trending />
                : <SearchMovie movieName={movieName} />}
        </div>
    );
}