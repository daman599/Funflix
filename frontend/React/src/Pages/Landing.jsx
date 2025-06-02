import { Link } from "react-router-dom"

export function Landing() {
    return <div class="text-center">
        <div class="text-[#B0B1C4] text-4xl font-medium py-2 ">
            Your Universal Streaming Guide
        </div>
        <div class="text-[#4A4E86] text-4xl font-medium py-4">
            Sick of switching between apps just to find a movie? We get it.
        </div>
        <div class="text-[#817F8B] text-3xl py-2">Let Funflix find it for you - instantly.</div>
        <div class="py-3 ">
            <Link to="/stream"><button class="bg-[#4A4E86] text-white px-6 py-2 font-semibold rounded-4xl text-2xl cursor-pointer">Search now</button></Link>
        </div>
        <div class="text-[#3D3C43] py-2 text-xl">Or</div>
        <div class="text-[#B9A7A7] text-2xl">Sign in for better experience</div>
    </div>
}