import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-2">
            <span className="text-4xl md:text-5xl font-bold text-[#181d49] mb-2 md:mb-4">404</span>
            <p className="text-base md:text-xl text-gray-400 text-center mb-3 md:mb-5">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="bg-[#110225] hover:bg-[#181d49] transition-all duration-300 
                text-xs md:text-base text-gray-400 flex items-center justify-center font-medium px-4 py-1 md:py-2 rounded-full"
            >
                <span>Go Back To Home</span>
            </Link>
        </div>
    );
}