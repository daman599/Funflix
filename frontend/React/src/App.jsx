import { Landing } from "./Pages/Landing"
import { Stream } from "./Pages/Stream"
import { MovieDetails } from "./Pages/MovieDetails"
import { Auth } from "./Pages/Auth"
import { NewAccount } from "./Pages/NewAccount"
import { MyProfile } from "./Pages/MyProfile"
import { UpdateMyProfile } from "./Pages/UpdateMyProfile"
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
          <Route path="/update-profile" element={<UpdateMyProfile />}></Route>
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
  const [message, setMessage] = useState("");
  const [loading ,setLoading ] =useState(false);
    
  try{
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
    } catch (err) {
        setMessage("Sorry! server is down please check your internet connection")
  }
  return <>
    <div>
      {message != "" ? <div>{message}</div> :
        loading ? <p>loading...</p>:
        (<div>
          <div style={{ display: "flex", backgroundColor: "blue", gap: 900 }}>
            <div>flixFusion</div>
            <div >
              {userLoggedin ? (<Link to="/me"><button style={{ cursor: "pointer" }}>Profile</button></Link>) :
                <Link to="/auth"><button style={{ cursor: "pointer" }}>Sign in</button></Link>}
            </div>
          </div>
          <Outlet />
        </div>)
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






