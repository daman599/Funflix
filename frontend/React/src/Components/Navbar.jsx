import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const Navbar = ({ userLoggedin }) => {
    return (
        <motion.nav
            initial={{ opacity: 0, filter: "blur(3px)", y: -5 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            viewport={{ once: true }}
            className="flex items-center justify-between px-4 py-2 sm:px-8 md:px-16 lg:px-24 xl:px-40 z-10 relative w-full">
            <span className="text-lg md:text-2xl font-medium text-gray-400 pointer-events-none">
                Funflix
            </span>

            <div className="bg-blue-950 hover:bg-blue-900 cursor-pointer flex items-center justify-center 
                  rounded-md text-gray-300 hover:text-gray-100 
                  font-medium px-2 py-1 md:px-3 md:py-1.5 text-xs sm:text-sm 
                  transition-all duration-300">
                {userLoggedin ? (<Link to="/me">Profile</Link>) :
                    (<Link to="/auth">Sign in</Link>)}
            </div>
        </motion.nav>
    );
}