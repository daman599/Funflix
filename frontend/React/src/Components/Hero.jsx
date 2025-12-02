import { Link } from "react-router-dom"
import { StarsBackground } from "./ui/stars-background"
import { ShootingStars } from "./ui/shooting-stars"
import { motion } from "motion/react";

const platformsImages = [
    "https://imgs.search.brave.com/PB5yRAMMx9Zj5K0-moZiBh554HkkVHgi5HAVctvv8c4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZE5yYW5rOEpZ/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc0NDM4MjE4MjQ2/Mg  ",
    "https://imgs.search.brave.com/UH_CrWPUGvtC0Gu7AYURnPzXaZF7N5KNLCZ1qID5L68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2Lzg3/L2Y2LzY2ODdmNmU5/MWE5YWM3Y2RiZmM1/ZTE4YTllNWFhMjU2/LmpwZw  ",
    "https://imgs.search.brave.com/fdUz_9jvk2TbSnAk1dyMd9A5SyZ7YNhmIMwiGF-3xwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VkLzI4/LzNiL2VkMjgzYmRi/NzE3NjgyYjQ3NjE1/ZjEzOGNiMzdiNzlk/LmpwZw  ",
    "https://imgs.search.brave.com/-3y76ubwfc_jsJyYNZNP1QQmLfBpRxri-54_fwsoVNg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y1L2Rl/LzIzL2Y1ZGUyMzM1/MmJkMjYyMGM1YTFi/MmUxOTNlNmM4ZjIw/LmpwZw  ",
    "https://imgs.search.brave.com/v_T5FpLhWZJ8Msma8eSlbkI6zxGdqaKoiDFLcoCjxmI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdlLzhh/LzgxLzdlOGE4MTYz/YjYxODllMmJlMWY3/NGZjN2FkODc1Nzgw/LmpwZw  ",
];

export const Hero = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-10 md:gap-20 text-center px-4 sm:px-6 md:px-12 relative overflow-hidden">
            <StarsBackground />
            <ShootingStars />

            <motion.div
                initial={{ opacity: 0, filter: "blur(2px)", }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center z-10 max-w-4xl mx-auto space-y-3 lg:space-y-5">
                <h1 className="bg-gradient-to-r from-blue-100 via-gray-500 to-blue-600 bg-clip-text p-1 text-transparent 
                              text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide animate-pulse">
                    Your Universal Streaming Guide
                </h1>

                <p className="text-[#e0e0ff] text-base sm:text-lg md:text-xl font-medium">
                    Sick of switching between apps just to find a movie? We get it.
                </p>

                <p className="text-gray-300 text-sm sm:text-base md:text-lg font-medium">
                    Let Funflix find it for you instantly.
                </p>

                <Link to="/stream" className="group relative inline-flex items-center justify-center my-1 md:my-2">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-l from-blue-600 to-gray-600 opacity-75 blur-md 
                                    group-hover:opacity-100 group-hover:blur-lg transition-all duration-300"></span>
                    <span className="relative z-10 bg-gradient-to-l from-blue-600 to-gray-600 text-white 
                                    px-6 py-2.5 sm:px-8 sm:py-3 font-semibold rounded-xl text-base sm:text-lg md:text-xl 
                                    cursor-pointer transition-all duration-300 transform shadow-lg hover:shadow-2xl">
                        Search now
                    </span>
                </Link>

                <div className="text-gray-400 text-xs sm:text-sm font-medium mt-2 md:mt-3">
                    <span className="transition-colors hover:text-purple-300 cursor-pointer">
                        Sign in for better experience.
                    </span>
                </div>
            </motion.div>

            <div className="flex flex-col items-center justify-center z-10 mt-10 md:mt-16">
                <h2 className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">
                    Supported platforms
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-5 max-w-4xl mx-auto">
                    {platformsImages.map((src, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeIn", delay: i * 0.2 }}
                            className="group flex items-center justify-center bg-black w-20 h-10 md:w-20 md:h-12 lg:w-24 lg:h-14 md:p-1 p-0.5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:rotate-2 
                            backdrop-blur-sm border-1 border-blue-800/30 hover:border-blue-400/50"
                        >
                            <img src={src}
                                alt={`platform-${i}`}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div >
    );
}