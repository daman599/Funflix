export function MovieCard({ poster_path , title , overview , rating , release_date , streaming ,isTrending}){
  const url =`https://image.tmdb.org/t/p/w500${poster_path}`;
  return <>
      <div style={{height:500 ,width:800,backgroundColor:"grey",cursor:"pointer" ,borderRadius:20,padding:10}}>
         <div><img src={url} style={{height:300,width:300}}></img></div>
         <div>
            <button>Watch later</button>
            <button>Add to favs</button>
         </div>
         <div>Title : {title}</div>
         <div>Overview : {overview}</div>
         <div>Rating : {rating}</div>
         <div>Release date : {release_date}</div>
         <div>Trending : {isTrending ? <span>Yes</span> : <span>No</span>}</div>
         <div>Streaming on : {streaming}</div>
      </div>
  </>
}