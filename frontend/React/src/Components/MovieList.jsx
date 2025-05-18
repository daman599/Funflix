import { Link } from "react-router-dom";

export function MovieList({poster_path , title }){
    const url =`https://image.tmdb.org/t/p/w500${poster_path}`
return (
        <Link to="/movie-details"><div style={{width:200,height:300 , cursor:"pointer"}}>
            <img src={url} style={{
                width:100,
                height:100,
                borderRadius:5,
                borderColor:"black"
            }}></img>
            <div>{title}</div> 
           </div>
        </Link>
);
}