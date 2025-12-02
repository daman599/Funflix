import { Hero } from "./Pages/Hero";
import { Stream } from "./Pages/Stream";
import { MovieDetails } from "./Pages/MovieDetails";
import { Auth } from "./Pages/Auth";
import { NewAccount } from "./Pages/NewAccount";
import { MyProfile } from "./Pages/MyProfile";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./Components/SearchBar";
import { Search } from "lucide-react";

import { ErrorBoundary } from "./Components/ErrorBoundary";
import { OAuthCallback } from "./Pages/OAuthCallback";
import { PageNotFound } from "./Components/helper/PageNotFound";

const Backend_url = "https://funflix-backend-j5wb.onrender.com";

export const App = () => {
  return (
    <div class="max-h-screen bg-[#0C0516] scroll-smooth overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Hero />}></Route>
            <Route path="/stream" element={<Stream />}></Route>
            <Route path="/movie-details/:id" element={<MovieDetails />}></Route>
          </Route>

          <Route path="/oauth" element={<OAuthCallback />}></Route>
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
      const token = localStorage.getItem('token');

      const isuserLoggedin = await axios.get(`${Backend_url}/user/check-auth`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
              className="pl-9 pr-3 py-1 w-full text-white placeholder-[#999494] bg-[#0C0516] border border-[#373D90] rounded-md text-sm md:text-xl sm:text-base focus:outline-none focus:ring-2 focus:ring-[#291e36] transition"
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

    {isStreamPage && (
      <ErrorBoundary>
        <SearchBar movieName={movieName} />
      </ErrorBoundary>
    )}
    <Outlet />

  </>
}





