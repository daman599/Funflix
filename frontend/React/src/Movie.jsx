import React from "react";

const style={width:200,height:200,padding:5,backgroundColor:"pink"};

export function MovieComponent({title,overview,posterUrl,release_year}){
return (
  <div style={style}>
    <img src={posterUrl} style={{
      height:50,
      width:50,
      borderRadius:5
    }}></img>
    <div>Title: {title}</div>
    <div>Overview: {overview}</div>
    <div>Release Year :{release_year}</div>
  </div>
);
}
