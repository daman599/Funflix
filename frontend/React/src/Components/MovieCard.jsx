import { useNavigate, useParams  } from "react-router-dom"
import { useState  } from "react"
import axios from "axios"
export function MovieCard({ poster_path , title , overview , rating , release_date  ,isTrending , streaming=[]}){
  
  const url =`https://image.tmdb.org/t/p/w500${poster_path}`;
  const {id} = useParams();
  const navigate = useNavigate();
  const [ watchLater ,setWatchLater ] =useState("➕");
  const [ addToFavs ,setAddTofavs ] =useState("❤️");

  async function handleWatchlater(){
   const isLoggedin= await axios.get("http://localhost:3000/user/check-auth",
       {
         withCredentials:true
       }
     )
     
     if(isLoggedin.data.message || isLoggedin.data.error){
       navigate("/auth")
     }
     else{
      const ismovieAdded = await axios.post("http://localhost:3000/watchlater/add/movie",{
           movieId:id
      },{
           withCredentials:true
      })
      if(ismovieAdded.data.message){
       setWatchLater("✔️")
       alert(ismovieAdded.data.message);
      }
      else{
        alert(ismovieAdded.data.Error);
      }
     }
  }

   async function handleAddtoFavs(){
   const isLoggedin= await axios.get("http://localhost:3000/user/check-auth",
       {
         withCredentials:true
       }
     )

     if(isLoggedin.data.message || isLoggedin.data.error){
       navigate("/auth")
     }
     else{
      const ismovieAdded = await axios.post("http://localhost:3000/favorites/movie",{
           movieId:id
      },
           {
            withCredentials:true
           }
      )
      if(ismovieAdded.data.message){
       setAddTofavs("✔️")
       alert(ismovieAdded.data.message);
      }
      else{
        alert(ismovieAdded.data.Error);
      }
     }
  }
  

  return <>
    <div style={{height:500,width:1000,backgroundColor:"grey" ,borderRadius:20,padding:10 ,display:"flex"}}>
       <div><img src={url} style={{height:300,width:300}}></img></div>
       <div style={{marginLeft:10}}>

            <button style={{cursor:"pointer"}} onClick={handleWatchlater}>{watchLater}</button>
            <button style={{cursor:"pointer"}} onClick={handleAddtoFavs}>{addToFavs}</button>

         <div>Title : {title}</div>
         <div>Overview : {overview}</div>
         <div>Rating : {rating}</div>
         <div>Release date : {release_date}</div>
         <div>Trending : {isTrending ? <span>Yes</span> : <span>No</span>}</div>
         <div>Available on:
            
            <div> 
             { streaming.map((platform)=>{
                  return (
                     <div style={{display:"flex" , gap:10}}>
                        <div style={{cursor:"pointer"}}>
                          <a href={platform.link}>
                            <img src={platform.logo_url}></img>
                          </a>
                        </div>
                        <div>{platform.serviceName}</div>
                        <div>{platform.type == "addon" ? (<p>Needs Subscription </p>) : platform.type}</div>
                        <div>{platform.quality}</div>
                     </div>
                  );
               })
             }
            </div>
         </div>
       </div>
    </div>
  </>
}