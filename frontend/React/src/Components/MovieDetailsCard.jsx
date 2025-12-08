import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import axios from "axios";

const backend_url = import.meta.env.VITE_backend_url;

export const MovieDetailsCard = ({ poster_path, title, overview, rating, release_date, isTrending, streaming = [] }) => {

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const { id } = useParams();
  const navigate = useNavigate();
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

  const items = [
    { title: "Watch Later", icon: Plus, handler: handleWatchlater, color: "white", size: 25 },
    { title: "Add to Favs", icon: Heart, handler: handleAddtoFavs, color: "#FF4D6D", size: 20 }
  ];

  return (
    <div className="max-w-6xl p-6 bg-blue-900/10 rounded-xl shadow-xl
  flex flex-col md:flex-row gap-4 border-1 border-[#ffffff1a]">

      <img src={imageUrl}
        alt={title}
        className="w-full lg:w-60 h-auto rounded-lg object-cover shadow-md"
      />

      <div className="flex flex-col items-start justify-start md:gap-2 gap-4 pb-4">

        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl md:text-3xl font-semibold text-white">{title}</h1>

          <div className="flex items-center justify-center gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div className="group flex flex-col items-center justify-center">
                  <span className="relative z-20 bottom-full mb-2 text-xs md:text-sm text-white bg-blue-900 px-2 py-1 rounded shadow-xl 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.title}
                  </span>

                  <button className="cursor-pointer" onClick={item.handler}>
                    <Icon color={item.color} size={item.size} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <span className="text-white/80 text-sm md:text-base">{overview}</span>

        <div className="text-white/60 text-xs md:text-sm flex flex-col items-start justify-center gap-1 my-2">
          <div className="flex gap-2 items-center justify-center">
            <strong className="text-white font-medium">Rating:</strong>
            <Star color={"yellow"} size={15} />
            {rating || "N/A"}
          </div>

          <span><strong className="text-white font-medium">Release Date:</strong> {release_date || "Unknown"}</span>
          <span><strong className="text-white font-medium">Trending:</strong> {isTrending ? "Yes" : "Nope"}</span>
        </div>

        {streaming.length > 0 && (
          <div className="flex flex-col items-start justify-center gap-2 my-1">
            <h2 className="text-lg md:text-xl font-medium text-white/50">Available On :</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {streaming.map((platform, index) => (
                <a key={index} href={platform.link} target="_blank" rel="noopener noreferrer">
                  <div
                    className="flex items-start justify-start gap-6 bg-blue-950
                backdrop-blur-sm border-1 border-[#ffffff1a] rounded-xl px-3 py-2
                hover:shadow-[0_0_5px_#373D90] transition duration-300"
                  >
                    <div className="flex flex-col items-start justify-start gap-2 font-medium">
                      <span className="text-gray-100 text-base md:text-lg">{platform.serviceName}</span>

                      <div className="flex flex-wrap items-start justify-start gap-2 text-gray-300 text-xs">
                        {platform.type && <span className="bg-blue-950/20 px-1 py-0.5 rounded-full">
                          {platform.type === "addon" ? "Subscription" : platform.type}
                        </span>}

                        {platform.quality && <span className="bg-blue-950/20 px-1 py-0.5 rounded-full">
                          {platform.quality}
                        </span>}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
