import { Link } from "react-router-dom"

export function Landing() {
    return <div class="text-center">
        <div class="text-[#B0B1C4] text-4xl font-medium py-2">
            Your Universal Streaming Guide
        </div>
        <div class="text-[#4A4E86] text-4xl font-medium py-4">
            Sick of switching between apps just to find a movie?We get it.
        </div>
        <div class="text-[#817F8B] text-3xl py-2">Let Funflix find it for you - instantly.</div>
        <div class="py-4">
            <Link to="/stream"><button class="text-center bg-[#4A4E86] text-white px-6 py-4 font-semibold rounded-xl text-4xl cursor-pointer">Search now</button></Link>
        </div>
        <div class="text-[#3D3C43] py- text-3xl">Or</div>
        <div class="text-[#B9A7A7] py-3 text-2xl">Sign in for better experience</div>
        <div class="py-4 flex justify-evenly items-center ">
            <img class="w-12 h-15" src="https://imgs.search.brave.com/8lOBQnmzX5jWJYXW09wQ1z0yoJETz4gA7OoklLszTko/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9uZXRmbGl4/LWljb24tNTMweDEw/MjQtcnJwcGxkeGwu/cG5n"></img>
            <img class="w-25 h-25" src="https://imgs.search.brave.com/MimOFVbDF-OBPcY_qlAJj576kZAYv8_dUbtWP7byl4I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtYnJh/bmRzLWluLWNvbG9y/cy85Mi9hbWF6b24t/cHJpbWUtbG9nby01/MTIucG5n"></img>
            <img class="w-28 h-25" src="https://imgs.search.brave.com/Qn6YvsqAyAC-5MzaoQbl9VPZxAx2Z2-BaGVIAzLCmbA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWxvZ292ZWN0/b3JzLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8xMi9k/aXNuZXlwbHVzLWhv/dHN0YXItbG9nby1m/cmVlbG9nb3ZlY3Rv/cnMubmV0Xy00MDB4/NDAwLnBuZw"></img>
            <img class="w-32 h-30" src="https://imgs.search.brave.com/sYicTCvliW2CrtTpdToxJC2i1Y3PNy61vpCPWYZwd1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9IdWx1L0h1/bHUtTG9nby53aW5l/LnN2Zw"></img>
            <img class="w-27 h-33" src="https://imgs.search.brave.com/3fhJQT2oA5eui76Y7qzil_0tVsI1gclYCvU2yxJ5F-A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUxLzIvYXBwbGUt/dHYtbG9nby1wbmdf/c2Vla2xvZ28tNTE3/MDczLnBuZw"></img>
        </div>
        <div class="py-3 text-2xl text-[#4A4E86]">Supported platforms</div>
    </div>
}