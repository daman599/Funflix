export function MovieCard({ poster_path , title , overview , rating , release_date , streaming }){
  const url =`https://image.tmdb.org/t/p/w500${poster_path}`;
  return <>
      <div style={{backgroundColor:"grey",cursor:"pointer" }}>
         <div><img src={url}></img></div>
         <div>Title : {title}</div>
         <div>Overview : {overview}</div>
         <div>Rating : {rating}</div>
         <div>Release date : {release_date}</div>
         <div>Streaming on : {streaming}</div>
      </div>
  </>
}