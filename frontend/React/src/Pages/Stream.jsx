import { Trending } from "../Components/Trending";
import { useState } from "react";
import { TextGenerateEffect } from "../Components/ui/text-generate-effect";
import { SearchBar } from "../Components/SearchBar";
import { SearchMovie } from "../Components/SearchMovie";

export const Stream = () => {
    const [movieName, setMovieName] = useState("");

    return (
        <div className="flex flex-col items-center justify-center mt-6 px-4 md:px-16 lg:px-24 xl:px-40">
            <div className="flex items-center justify-between w-full">
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