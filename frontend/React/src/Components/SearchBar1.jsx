import { Search } from "lucide-react";
import { useState } from "react";
import { ErrorBoundary } from "../Components/helper/ErrorBoundary";

export const SearchBar = () => {
    const [movieName, setMovieName] = useState("");

    return (
        <>
            <div className="flex items-center gap-3 flex-grow overflow-hidden justify-end">
                <div className="relative flex-grow min-w-[150px] max-w-[400px] lg:max-w-[480px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999494] w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Movies..."
                        onChange={(e) => setMovieName(e.target.value.trim())}
                        className="pl-9 pr-3 py-1 w-full text-white placeholder-[#999494] bg-[#0C0516] border border-[#373D90] rounded-md text-sm md:text-xl sm:text-base focus:outline-none focus:ring-2 focus:ring-[#291e36] transition"
                    />
                </div>
            </div>
        </>
    );
}