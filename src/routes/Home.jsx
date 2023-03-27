import { useEffect, useState } from "react";

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

  console.log(topMovies);

  return (
    <div className="mt-20 flex justify-between max-w-[1340px] mx-auto px-6 items-center">
      <div className="p-6 overflow-hidden flex-col justify-center">
        <h1 className="text-8xl font-bold text-mtyellow title-font mt-2 text-center tracking-[0.1rem]"
        style={{ textShadow: '8px 8px #8F43EE'}}>
          MOVIE TWINS
        </h1>
        <h1 className="text-6xl font-bold text-mtyellow title-font mt-14 text-center tracking-[0.1rem]">
          Go Safe. <br />
          Watch the <span style={{ textShadow: '4px 4px #8F43EE'}}>Same</span>
        </h1>
        <div className="text-center mt-8">
          <button class="bg-mtyellow text-mtgray border-mtblack shadow-mtpurple rounded-none py-4 px-8 title-font text-4xl hover:scale-110">
            recommended films 
          </button>
        </div>
      </div>
      <div className="p-6 pt-12 overflow-hidden">
      <img
        src="https://imgs.search.brave.com/8APRHd03Kn0Vl1iKOPqD6wdzAr4FSXl_ZTOcQ-oX4n4/rs:fit:382:498:1/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/b2tvTkNOdXB4WklB/QUFBQy9zY3JlYW0t/bW92aWUtc2NyZWFt/LmdpZg.gif"
        alt="My Image"
        className="rounded-bl-xll rounded-tr-xll h-[80vh] w-[550px] object-cover ml-auto"
      />
      </div>
    </div>
  );
};

export default Home;