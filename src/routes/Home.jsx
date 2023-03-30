import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { gifs } from "../data/gifs";

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_TMDB_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    console.log(topRatedUrl);
    getTopRatedMovies(topRatedUrl);
  }, []);

  const [selectedGif, setSelectedGif] = useState(gifs[Math.floor(Math.random() * gifs.length)]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-20 flex justify-between max-w-[1300px] mx-auto px-6 items-center">
          <div className="flex flex-col items-center justify-center md:relative pt-4 md:pt-0 flex-grow mr-O md:mr-8 lg:mr-16 text-shadow">
            <h1 className="text-8xl font-bold text-mtyellow title-font mt-2 text-center tracking-[0.1rem]"
            style={{ textShadow: '8px 8px #8F43EE, 6px 6px 14px black'}}>
              MOVIE TWINS
            </h1>
            <h1 className="text-6xl font-bold text-mtyellow title-font mt-14 text-center tracking-[0.1rem]">
              Go Safe. <br />
              Watch the <span style={{ textShadow: '4px 4px #8F43EE, 6px 6px 12px black'}}>Same</span>
            </h1>
            <div className="text-center mt-12">
              <button class="bg-mtyellow text-mtgray border-mtblack shadow-mtpurple rounded-none py-4 px-8 title-font text-4xl hover:scale-110 duration-300 tracking-[0.1rem] font-bold">
                SEARCH! 
              </button>
            </div>
          </div>
          <div className="hidden md:block pt-8 ml-O lg:ml-16">
            <img
              src={selectedGif}
              alt="Movie GIF"
              className="rounded-bl-xll rounded-tr-xll h-[70vh] max-h-[650px] w-[55vh] object-cover ml-auto"
            />
          </div>
        </div>
      </div>
      <SearchBar />
    </div>
    
    
  );
};

export default Home;