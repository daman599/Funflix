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
    <div className="flex items-center justify-between px-4 py-2 lg:py-4 sm:px-8 md:px-16 lg:px-28 z-10 relative w-full">

      <span className="text-lg md:text-2xl font-medium text-gray-400 pointer-events-none">
        Funflix
      </span>

      <div className="flex items-center gap-3 flex-grow overflow-hidden justify-end">
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

        <div className="bg-blue-950 hover:bg-blue-900 cursor-pointer flex items-center justify-center rounded-lg text-gray-300 hover:text-gray-100 
         font-medium px-2 py-1 md:px-3 md:py-2 text-xs sm:text-sm 
        transition-all duration-300">
          {userLoggedin ? (
            <Link to="/me">
              <div >Profile</div>
            </Link>
          ) : (
            <Link to="/auth">
              <div >Sign in</div>
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





