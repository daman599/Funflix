import { Link } from "react-router-dom"

export function Landing() {
    return <div class="min-h-screen  bg-[#0C0516] text-center px-4 sm:px-6 md:px-12 py-8 sm:py-6 md:py-8">

        <div class="text-[#B0B1C4] text-2xl sm:text-3xl md:text-4xl font-medium py-2">
            Your Universal Streaming Guide
        </div>

        <div class="text-[#4A4E86] text-2xl sm:text-3xl md:text-4xl font-medium py-4">
            Sick of switching between apps just to find a movie?We get it.
        </div>

        <div class="text-[#817F8B] text-xl sm:text-2xl md:text-3xl py-2">Let Funflix find it for you - instantly.</div>

        <div class="py-4">
            <Link to="/stream"><button class="animate-pulse pb-1.5 text-center bg-[#4A4E86] text-white px-6 font-semibold rounded-xl text-2xl sm:text-3xl md:text-4xl cursor-pointer">Search now</button></Link>
        </div>

        <div class="text-[#3D3C43] text-xl sm:text-2xl md:text-3xl opacity-75">Or</div>

        <div class="text-[#B9A7A7] py-3 text-lg sm:text-xl md:text-2xl">Sign in for better experience</div>

        <div class=" gap-6 sm:gap-8 md:gap-10 text-lg sm:text-xl md:text-2xl text-[#4A4E86] py-6">Supported platforms</div>
        <div class="py-4 flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {[
                "https://imgs.search.brave.com/PB5yRAMMx9Zj5K0-moZiBh554HkkVHgi5HAVctvv8c4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZE5yYW5rOEpZ/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc0NDM4MjE4MjQ2/Mg",
                "https://imgs.search.brave.com/UH_CrWPUGvtC0Gu7AYURnPzXaZF7N5KNLCZ1qID5L68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2Lzg3/L2Y2LzY2ODdmNmU5/MWE5YWM3Y2RiZmM1/ZTE4YTllNWFhMjU2/LmpwZw",
                "https://imgs.search.brave.com/fdUz_9jvk2TbSnAk1dyMd9A5SyZ7YNhmIMwiGF-3xwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VkLzI4/LzNiL2VkMjgzYmRi/NzE3NjgyYjQ3NjE1/ZjEzOGNiMzdiNzlk/LmpwZw",
                "https://imgs.search.brave.com/-3y76ubwfc_jsJyYNZNP1QQmLfBpRxri-54_fwsoVNg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y1L2Rl/LzIzL2Y1ZGUyMzM1/MmJkMjYyMGM1YTFi/MmUxOTNlNmM4ZjIw/LmpwZw",
                "https://imgs.search.brave.com/v_T5FpLhWZJ8Msma8eSlbkI6zxGdqaKoiDFLcoCjxmI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdlLzhh/LzgxLzdlOGE4MTYz/YjYxODllMmJlMWY3/NGZjN2FkODc1Nzgw/LmpwZw",
            ].map((src, i) => (
                <div
                    key={i}
                    class="w-24 h-14 sm:w-28 sm:h-16 md:w-32 md:h-20 lg:w-36 lg:h-24 rounded-xl overflow-hidden transition duration-300 hover:drop-shadow-[0_0_12px_#8B5CF6]"
                >
                    <img
                        src={src}
                        alt={`platform-${i}`}
                        class="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    </div>
}