import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_TMDB_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setMovie(data);
  };

  const formatCurrency = (number) => {
    if (number) {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    return "";
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`;
    getMovie(movieUrl);
  }, []);

  return (
    <div className=" mt-20 bg-[#413543]">
      {movie && (
        <>
          <div className="mb-10 pt-12 flex items-center justify-center">
            <div className="flex items-stretch">
              <div className="bg-mtyellow p-8 w-[80vh] shadow-lg rounded-lg overflow-hidden -mr-8 z-0">
                <h2 className="text-2xl font-semibold mb-1">{movie.title}</h2>
                <span className="text-mtblack font-semibold">{movie.tagline}</span>
                <div className="mt-4 text-mtblack">
                  <div className="mb-2">
                    <h3 className="flex items-center">
                      <BsWallet2 className="mr-2" /> Budget:
                    </h3>
                    <p>{formatCurrency(movie.budget)}</p>
                  </div>
                  <div className="mb-2">
                    <h3 className="flex items-center">
                      <BsGraphUp className="mr-2" /> Revenue:
                    </h3>
                    <p>{formatCurrency(movie.revenue)}</p>
                  </div>
                  <div className="mb-2">
                    <h3 className="flex items-center">
                      <BsHourglassSplit className="mr-2" /> Length:
                    </h3>
                    <p>{movie.runtime} Minutes</p>
                  </div>
                  <div className="mb-2">
                    <h3 className="flex items-center">
                      <BsFillFileEarmarkTextFill className="mr-2" /> Synopsis:
                    </h3>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </div>
              <div className=" w-96 bg-cover bg-center shadow-lg rounded-lg -my-5">
                    <img  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" />
                  </div>
            </div>
          </div>
        </>
      )}
      <SearchBar />
    </div>
  );
};

export default Movie;
