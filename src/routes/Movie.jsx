import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";

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
    <div className="mt-20">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p>{movie.tagline}</p>
          <div>
            <h3>
              <BsWallet2 /> Budget:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div>
            <h3>
              <BsGraphUp /> Revenue:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div>
            <h3>
              <BsHourglassSplit /> Length:
            </h3>
            <p>{movie.runtime} Minutes</p>
          </div>
          <div>
            <h3>
              <BsFillFileEarmarkTextFill /> Synopsis:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
