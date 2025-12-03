import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import axios from "axios"
import { Loader } from "../Components/helper/Loader"
const Backend_url = "https://funflix-backend-j5wb.onrender.com"
const path = `${Backend_url}/google/auth`

export function Auth() {
  return <div>
    <CheckAuthentication />
  </div>
}

function CheckAuthentication() {
  const [loading, setLoading] = useState(false)
  const google_url = "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/05/Google-2025-G-logo.webp?strip=info&w=460&ssl=1"

  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate();

  async function signin() {
    if (usernameRef.current.value == "" || emailRef.current.value == "" || passwordRef.current.value == "") {
      alert("All the fields are required")
      return;
    }
    setLoading(true);
    const response = await axios.post(`${Backend_url}/user/signin`, {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      alert("Login successful");
      navigate("/stream");
    }
    else if (response.data.message) {
      alert("Wrong credentials")
    }
    setLoading(false);
  }

  return <>
    {loading ?
      <Loader />
      : (
        <div class="min-h-screen flex items-center justify-center bg-[#0C0516]">
          <div class="w-[350px] p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl text-white space-y-6">
            <h2 class="text-2xl font-bold text-center text-[#373D90]">
              Sign in to your Account
            </h2>

            <input
              type="text"
              ref={usernameRef}
              placeholder="Username"
              class="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#373D90] placeholder-white/70"
            />
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              class="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#373D90] placeholder-white/70"
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              class="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#373D90] placeholder-white/70"
            />

            <button
              onClick={signin}
              class="w-full bg-[#373D90] hover:bg-[#31345b] transition-colors text-white py-2 rounded-lg font-semibold"
            >
              Sign in
            </button>

            <div class="text-center text-sm">
              <p class="text-white/70">New user?</p>
              <Link
                to="/new-account"
                class="text-[#373D90] hover:underline font-medium"
              >
                Create your account
              </Link>
            </div>

            <div class="text-center">
              <p class="text-white/70 mb-2">Sign in with</p>
              <a href={path}>
                <img
                  src={google_url}
                  alt="Google"
                  class="h-8 w-8 mx-auto cursor-pointer rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
      )}
  </>
}
