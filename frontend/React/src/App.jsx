import { Landing } from "./Pages/Landing"
import { Stream } from "./Pages/Stream"
import { BrowserRouter ,Routes , Route , Outlet} from "react-router-dom"

function App(){
    return (
    <div>
       <BrowserRouter>
          <Routes>
             <Route path="/" element={<Layout />}>
               <Route path="/" element={<Landing />}></Route>
               <Route path="/stream" element={<Stream />}></Route>
             </Route>
          </Routes>
       </BrowserRouter>
    </div>
    );
}
function Layout(){
  return <div>
      <div style={{display:"flex",backgroundColor:"blue" , gap:900}}>
        <div>flixFusion</div>
        <div>
          <button>Sign in</button>
        </div>
      </div>
      <Outlet />
  </div>
}

export default App;



 


