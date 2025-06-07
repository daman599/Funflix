import { Landing } from "./Pages/Landing"
import { Stream } from "./Pages/Stream"
import { MovieDetails } from "./Pages/MovieDetails"
import { Auth } from "./Pages/Auth"
import { NewAccount } from "./Pages/NewAccount"
import { MyProfile } from "./Pages/MyProfile"
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

function App() {

  return (
    <div class="h-screen scroll-smooth">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />}></Route>
             <Route path="/stream" element={<Stream />}></Route>
            <Route path="/movie-details/:id" element={<MovieDetails />}></Route>
          </Route>
          
          <Route path="/me" element={<MyProfile />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/new-account" element={<NewAccount />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  const [userLoggedin, setUserLoggedin] = useState(false);
    
    useEffect(() => {
       async function checkUserAuth() {

        const isuserLoggedin = await axios.get("http://localhost:3000/user/check-auth", {
          withCredentials: true
        })
        if (isuserLoggedin.data.status) {
          setUserLoggedin(true)
        }
       }
      checkUserAuth();
    }, [])

  return <>
          <div class="flex justify-between items-center relative z-10 bg-[#0C0516] py-6 px-6 sm:px-20 sm:py-10 md:px-24 md:py-8">
            <div class="md:text-3xl sm:text-2xl text-2xl font-semibold">Funflix</div>
            <div class="bg-[#373D90] rounded-lg text-white px-3 pb-1 sm:text-base md:text-xl  hover:scale-105 transition duration-300 ease-in-outease-in-out">
              {userLoggedin ? (<Link to="/me"><button class="cursor-pointer">Profile</button></Link>) :
                <Link to="/auth"><button class="cursor-pointer">Sign in</button></Link>}
            </div>
          </div>
          <Outlet />
  </>
}

function PageNotFound() {
    <div class="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 class="text-7xl font-extrabold text-[#2b085c]  mb-4">404</h1>
      <p class="text-xl sm:text-2xl text-gray-300 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        class="bg-[#2b085c] hover:bg-[#4a3864] transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
}

export default App;






