import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar1";

export const Navbar = ({ userLoggedin, isStreamPage }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 sm:px-8 md:px-16 lg:px-24 xl:px-40 z-10 relative w-full">
            <span className="text-lg md:text-2xl font-medium text-gray-400 pointer-events-none">
                Funflix
            </span>

            <div className="flex items-center gap-3 flex-grow overflow-hidden justify-end">

                {isStreamPage && <SearchBar />}

                <div className="bg-blue-950 hover:bg-blue-900 cursor-pointer flex items-center justify-center 
                  rounded-lg text-gray-300 hover:text-gray-100 
                  font-medium px-2 py-1 md:px-3 md:py-2 text-xs sm:text-sm 
                  transition-all duration-300">
                    {userLoggedin ? (<Link to="/me">Profile</Link>) :
                        (<Link to="/auth">Sign in</Link>)}
                </div>

            </div>
        </div >
    );
}