const apikey='69318cb897ca41bb2651034004fc0ed0';
const url=`https://api.themoviedb.org/3/movie/550?api_key=${apikey}`;

async function movieData(){
   console.log("lets go")
   const response=await fetch(url)
   const data=await response.json();
   console.log(data.overview);
}
movieData();




