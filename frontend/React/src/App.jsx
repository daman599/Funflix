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
    <div style={{ height: "100vh" }}>
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
  const [ loading, setLoading  ] = useState(true)
  const [userLoggedin, setUserLoggedin] = useState(false);
    
    useEffect(() => {
      setLoading(true);
       async function checkUserAuth() {

        const isuserLoggedin = await axios.get("http://localhost:3000/user/check-auth", {
          withCredentials: true
        })
        if (isuserLoggedin.data.status) {
          setUserLoggedin(true)
        }
        setLoading(false)
       }
      checkUserAuth();
    }, [])

  return <>
    <div>
       { loading ? <p>loading...</p>:
        (<>
          <div class="flex justify-between px-30 py-4">
            <div class="text-2xl">Funflix</div>
            <div class="bg-[#373D90] rounded-lg px-2 text-xl">
              {userLoggedin ? (<Link to="/me"><button class="cursor-pointer">Profile</button></Link>) :
                <Link to="/auth"><button >Sign in</button></Link>}
            </div>
          </div>
          <Outlet />
        </>)
     }
  </div>
  </>
}

function PageNotFound() {
  return <div>
      <h2>No page found</h2>
    </div>
}

export default App;






