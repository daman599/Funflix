import { Landing } from "./Pages/Landing"
import { Stream } from "./Pages/Stream"
import { MovieDetails } from "./Pages/MovieDetails"
import { Auth } from "./Pages/Auth"
import { NewAccount } from "./Pages/NewAccount"
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom"

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/stream" element={<Stream />}></Route>
            <Route path="/movie-details/:id" element={<MovieDetails />}></Route>
          </Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/new-account" element={<NewAccount />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Layout() {
  return <div>
    <div style={{ display: "flex", backgroundColor: "blue", gap: 900 }}>
      <div>flixFusion</div>
      <div >
        <Link to="/auth"><button style={{ cursor: "pointer" }}>Sign in</button></Link>
      </div>
    </div>
    <Outlet />
  </div>
}

function PageNotFound() {
  return <div>
    <h2>No page found</h2>
  </div>
}

export default App;






