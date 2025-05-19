export function MovieCard({ poster_path , title , overview , rating , release_date  ,isTrending , streaming=[]}){
  const url =`https://image.tmdb.org/t/p/w500${poster_path}`;
  return <>
    <div style={{height:500,width:1000,backgroundColor:"grey" ,borderRadius:20,padding:10 ,display:"flex"}}>
       <div><img src={url} style={{height:300,width:300}}></img></div>
       <div style={{marginLeft:10}}>

         <div style={{cursor:"pointer"}}>
            <button>Watch later</button>
            <button>Add to favs</button>
         </div>

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
                        <div>{platform.type == "addon" ? (<p>Subscription  </p>) : platform.type}</div>
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