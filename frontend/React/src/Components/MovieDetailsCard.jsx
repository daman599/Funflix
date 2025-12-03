import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const backend_url = process.env.backend_url;

export function MovieCard({ poster_path, title, overview, rating, release_date, isTrending, streaming = [] }) {

  const url = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const { id } = useParams();
  const navigate = useNavigate();
  const [watchLater, setWatchLater] = useState("➕");
  const [addToFavs, setAddTofavs] = useState("❤️");
  const [watchCount, setWatchCount] = useState(1);
  const [favsCount, setFavsCount] = useState(1);

  const token = localStorage.getItem('token');

  async function handleWatchlater() {
    const isLoggedin = await axios.get(`${backend_url}/user/check-auth`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (isLoggedin.data.error) {
      navigate("/auth")
    }
    else {
      if (watchCount % 2 == 0) {
        //api call to remove 
        const ismovieRemoved = await axios.delete(`${backend_url}/watchlater/remove/movie`, {
          data: { movieId: id }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        )

        if (ismovieRemoved.data.Error) {
          alert(ismovieRemoved.data.Error)
        }
        else {
          setWatchLater("➕")
          alert(ismovieRemoved.data.message)
          return;
        }
      }

      const ismovieAdded = await axios.post(`${backend_url}/watchlater/add/movie`, {
        movieId: id
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (ismovieAdded.data.message) {
        setWatchLater("✔️")
        alert(ismovieAdded.data.message);
      }
      else {
        alert(ismovieAdded.data.Error);
      }
      setWatchCount(count => count + 1);
    }
  }

  async function handleAddtoFavs() {
    const isLoggedin = await axios.get(`${backend_url}/user/check-auth`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (isLoggedin.data.error) {
      navigate("/auth")
    }
    else {
      if (favsCount % 2 == 0) {
        //api call to remove 
        const ismovieRemoved = await axios.delete(`${backend_url}/favorites/movie`, {
          data: { movieId: id }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        )

        if (ismovieRemoved.data.Error) {
          alert(ismovieRemoved.data.Error)
        }
        else {
          setAddTofavs("❤️")
          alert(ismovieRemoved.data.message)
          setFavsCount(count => count + 1)
          return;
        }
      }
      const ismovieAdded = await axios.post(`${backend_url}/favorites/movie`, {
        movieId: id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )

      if (ismovieAdded.data.message) {
        setAddTofavs("✔️");
        setFavsCount(count => count + 1);
        alert(ismovieAdded.data.message);
      }
      else {
        alert(ismovieAdded.data.Error);
      }
    }
  }

  return <>
    <div class="max-w-7xl mx-auto  mt-2 mb-10 my-10 p-6 bg-[#0C0516] rounded-xl shadow-lg flex flex-col md:flex-row gap-6 border border-[#ffffff1a]">
      <img
        src={url}
        alt={title}
        class="w-full md:w-80 h-auto rounded-lg object-cover shadow-md"
      />

      <div class="flex-1 space-y-4">
        <div class="flex justify-between items-start flex-wrap">
          <h1 class="text-3xl font-bold text-white">{title}</h1>
          <div class="flex gap-2 mt-2 md:mt-0">
            <div class="flex gap-4">
              <div class="relative group flex flex-col items-center">
                <span class="absolute bottom-full mb-2 text-sm text-white bg-[#373D90] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Watch Later
                </span>
                <button
                  class="text-2xl cursor-pointer text-white hover:text-[#4ADE80] transition"
                  onClick={handleWatchlater}
                >
                  {watchLater}
                </button>
              </div>

              <div class="relative group flex flex-col items-center">
                <span class="absolute bottom-full mb-2 text-sm text-white bg-[#373D90] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Add to Favs
                </span>
                <button
                  class="text-2xl cursor-pointer text-white hover:text-[#FF4D6D] transition"
                  onClick={handleAddtoFavs}
                >
                  {addToFavs}
                </button>
              </div>
            </div>

          </div>
        </div>

        <p class="text-white/80 text-sm md:text-base">{overview}</p>

        <div class="text-white/60 text-sm space-y-1">
          <p><strong class="text-white">Rating:</strong> ⭐ {rating || "N/A"}</p>
          <p><strong class="text-white">Release Date:</strong> {release_date || "Unknown"}</p>
          <p><strong class="text-white">Trending:</strong> {isTrending ? "Yes" : "No"}</p>
        </div>

        {streaming.length > 0 ? (
          <div class="mt-6">
            <h3 class="text-2xl font-semibold text-white mb-4">Available On :</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {streaming.map((platform, index) => (
                <div
                  key={index}
                  class="flex items-center gap-4 bg-[#151028]/80 backdrop-blur-sm border border-[#ffffff1a] rounded-xl p-4 hover:shadow-[0_0_10px_#373D90] transition duration-300"
                >
                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={platform.logo_url}
                      alt={platform.serviceName}
                      class="w-12 h-12 object-contain hover:scale-105 transition-transform"
                    />
                  </a>
                  <div class="flex flex-col">
                    <p class="text-white text-lg font-semibold">{platform.serviceName}</p>
                    <div class="flex flex-wrap items-center gap-2 text-sm mt-1">
                      <span class="bg-[#373D90]/30 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        {platform.type === "addon" ? "Subscription" : platform.type}
                      </span>
                      <span class="bg-[#373D90]/30 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        {platform.quality}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p class="text-white/60 mt-4">Not available on any platform to watch.</p>
        )}
      </div>
    </div>
  </>
}
