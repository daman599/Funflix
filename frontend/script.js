const apikey='69318cb897ca41bb2651034004fc0ed0';
const movie="Mrs.";
const url=`https://api.themoviedb.org/3/movie/100/videos?api_key=${apikey}`;


async function movieData(){
const response= await fetch(url);
const data=await response.json();
console.log(data);
//document.getElementById("movies").innerHTML=data.results[0];
}
movieData();