import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { gifs } from "../data/gifs";

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_REACT_TMDB_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]); // state for top rated movies

  // function to fetch and set top rated movies
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  // effect hook to get top rated movies on component mount
  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  const [selectedGif, setSelectedGif] = useState(gifs[Math.floor(Math.random() * gifs.length)]); // state for random movie gif


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
      <div id="SearchBar">
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;