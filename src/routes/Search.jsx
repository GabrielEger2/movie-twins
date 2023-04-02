import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import PageNotFound from "./PageNotFound";

const searchUrl = 'https://api.themoviedb.org/3/search/movie';
const apiKey = import.meta.env.VITE_TMDB_KEY;

const Search = () => {
  const location = useLocation();

  const [foundMovies, setFoundMovies] = useState(true);

  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(location.search).get('search');
  const encodedQuery = encodeURIComponent(query);

  const getMovieId = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.status === 200 && data.results.length > 0) {
        const movieId = data.results[0].id;
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`;
        getRecommendations(recommendationsUrl);
      } else {
        setFoundMovies(false);
      }
    } catch (error) {
      console.log(error);
      setFoundMovies(false);
    }
  };

  const getRecommendations = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const movieSearchUrl = `${searchUrl}?api_key=${apiKey}&query=${encodedQuery}`;
    getMovieId(movieSearchUrl);
  }, [encodedQuery]);

  return (
    <div className='mt-20'>
      {foundMovies ? (
        <>
          <h1>Search for {query}</h1>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default Search;