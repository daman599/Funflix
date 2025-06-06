import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function NewAccount() {
  return <div><CreateNewAccount /></div>
}

function CreateNewAccount() {
  const [loading, setLoading] = useState(false)

  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate();

  async function signup() {
    if (
      usernameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.data.message) {
        alert(response.data.message);
        navigate("/auth");
      } else if (response.data.errordetails) {
        const issues = response.data.errordetails.issues;
        issues.forEach((issue) => {
          alert(issue.message.replace("Invalid", "Please enter a valid"));
        });
      } else {
        alert(response.data.error || "Unknown error");
      }
    } catch (e) {
      alert("Server error. Try again later.");
    }

    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div class="min-h-screen flex items-center justify-center bg-[#0C0516]">
        <div class="min-h-screen flex justify-center items-center py-9">
          <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#373D90]"></div>
        </div>
      </div>
      ) : (
        <div class="min-h-screen flex items-center justify-center bg-[#0C0516] px-4 py-12">
          <div class="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden">

            <div class="absolute -top-16 -left-16 w-64 h-64 bg-[#441f93] rounded-full opacity-20 blur-3xl animate-pulse-slow" />
            <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse-slow" />

            <h2 class="text-3xl font-bold text-white text-center mb-8 drop-shadow">
              Create Your Account
            </h2>

            <div class="space-y-5">
              <input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                class="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#7064a7] transition-all"
              />
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                class="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#7064a7] transition-all"
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                class="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#7064a7] transition-all"
              />
            </div>

            <button
              onClick={signup}
              class="mt-8 w-full py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/10 hover:bg-white/20 transition duration-300 backdrop-blur-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
