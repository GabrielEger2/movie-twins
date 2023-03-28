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
    <div className="mt-20 flex justify-between max-w-[1300px] mx-auto px-6 items-center">
      <div className="flex flex-col items-center justify-center md:relative pt-4 md:p-4 md:pt-0  flex-grow">
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
      <div className="hidden md:block xl:pr-40 lg:pr-32 p-6 pt-8">
        <img
          src="https://giffiles.alphacoders.com/216/216074.gif"
          alt="Movie GIF"
          className="rounded-bl-xll rounded-tr-xll h-[500px] w-[55vh] object-cover ml-auto"
        />
      </div>
    </div>
  );
};

export default Home;