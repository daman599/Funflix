import { Search } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ErrorBoundary } from "../Components/helper/ErrorBoundary";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ userLoggedin, isStreamPage }) => {
    const [movieName, setMovieName] = useState("");

    return (
        <div className="flex items-center justify-between px-4 py-2 sm:px-8 md:px-16 lg:px-24 xl:px-40 z-10 relative w-full">
            <span className="text-lg md:text-2xl font-medium text-gray-400 pointer-events-none">
                Funflix
            </span>

            <div className="flex items-center gap-3 flex-grow overflow-hidden justify-end">
                {isStreamPage && (
                    <div className="relative flex-grow min-w-[150px] max-w-[400px] lg:max-w-[480px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999494] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Movies..."
                            onChange={(e) => setMovieName(e.target.value.trim())}
                            className="pl-9 pr-3 py-1 w-full text-white placeholder-[#999494] bg-[#0C0516] border border-[#373D90] rounded-md text-sm md:text-xl sm:text-base focus:outline-none focus:ring-2 focus:ring-[#291e36] transition"
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 flex-grow overflow-hidden justify-end">
                <div className="bg-blue-950 hover:bg-blue-900 cursor-pointer flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-100 
         font-medium px-2 py-1 md:px-3 md:py-2 text-xs sm:text-sm 
        transition-all duration-300">
                    {userLoggedin ? (
                        <Link to="/me">Profile</Link>
                    ) : (
                        <Link to="/auth">Sign in</Link>
                    )}
                </div>
            </div>

            {isStreamPage && (
                <ErrorBoundary>
                    <SearchBar movieName={movieName} />
                </ErrorBoundary>
            )}
        </div >
    );
}