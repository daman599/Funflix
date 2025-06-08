import { Landing } from "./Pages/Landing"
import { Stream } from "./Pages/Stream"
import { MovieDetails } from "./Pages/MovieDetails"
import { Auth } from "./Pages/Auth"
import { NewAccount } from "./Pages/NewAccount"
import { MyProfile } from "./Pages/MyProfile"
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { SearchBar } from "./Components/SearchBar"
import { Search } from "lucide-react"

function App() {

  return (
    <div class=" min-h-screen bg-[#0C0516] scroll-smooth">
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
  const location = useLocation();
  const isStreamPage = location.pathname === "/stream";
  const [userLoggedin, setUserLoggedin] = useState(false);
  const [movieName, setMovieName] = useState("");

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
    <div className="flex items-center gap-3 px-4 py-4 sm:px-8 md:px-16 bg-[#0C0516] z-10 relative w-full overflow-x-auto flex-nowrap">

      <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-white whitespace-nowrap shrink-0">
        Funflix
      </div>

      <div className="flex items-center gap-3 flex-grow min-w-0 overflow-hidden justify-end">

        {isStreamPage && (
          <div className="relative flex-grow min-w-[150px] max-w-[400px] lg:max-w-[480px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999494] w-4 h-4" />
            <input
              type="text"
              placeholder="Search Movies..."
              onChange={(e) => setMovieName(e.target.value.trim())}
              className="pl-9 pr-3 py-1 w-full text-white placeholder-[#999494] bg-[#0C0516] border border-[#373D90] rounded-md text-sm md:text-xl sm:text-base focus:outline-none focus:ring-2 focus:ring-[#373D90] transition"
            />
          </div>
        )}

        <div className="bg-[#373D90] rounded-lg text-white px-3 py-1 text-sm sm:text-base shrink-0 hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
          {userLoggedin ? (
            <Link to="/me">
              <button className="cursor-pointer">Profile</button>
            </Link>
          ) : (
            <Link to="/auth">
              <button className="cursor-pointer">Sign in</button>
            </Link>
          )}
        </div>

      </div>
    </div>

    {isStreamPage && <SearchBar movieName={movieName} />}

    <Outlet />

  </>
}

function PageNotFound() {
  return <>
    <div class="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 class="text-7xl font-extrabold text-[#2b085c]  mb-4">404</h1>
      <p class="text-xl sm:text-2xl text-gray-300 mb-6">
        Sorry,the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        class="bg-[#2b085c] hover:bg-[#4a3864] transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  </>
}

export default App;






