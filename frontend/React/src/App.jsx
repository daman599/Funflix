import { LandingPage } from "./Pages/LandingPage";
import { Stream } from "./Pages/Stream";
import { MovieDetails } from "./Pages/MovieDetails";
import { Auth } from "./Pages/Auth";
import { NewAccount } from "./Pages/NewAccount";
import { MyProfile } from "./Pages/MyProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { OAuthCallback } from "./Pages/OAuthCallback";
import { PageNotFound } from "./Components/helper/PageNotFound";

export const App = () => {
  return (
    <div class="max-h-screen bg-[#0C0516] scroll-smooth overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LandingPage />}></Route>
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



