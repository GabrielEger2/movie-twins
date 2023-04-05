import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import PageNotFound from "./PageNotFound";
import SearchBar from '../components/SearchBar';

const searchUrl = 'https://api.themoviedb.org/3/search/movie';
const apiKey = import.meta.env.VITE_TMDB_KEY;

const Search = () => {
  const location = useLocation();

  const [foundMovies, setFoundMovies] = useState(true);

  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const query = new URLSearchParams(location.search).get('search');
  const encodedQuery = encodeURIComponent(query);

  const getMovieId = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.status === 200 && data.results.length > 0) {
        const movieId = data.results[0].id;
        const movieTitle = data.results[0].title;
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`;
        setMovieTitle(movieTitle);
        getRecommendations(recommendationsUrl);
      } else {
        setFoundMovies(false);
      }
    } catch (error) {
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
    <div className='mt-20 bg-[#413543] '>
      {foundMovies ? (
        <>
          <div>
            <div className='pt-14 text-mtwhite font-bold text-5xl lg:text-6xl text-center title-font tracking-[0.2rem] text-shadow'>
              <h1 className='pb-2 lg:pb-4'>
                Showing similar movies to:
              </h1>
              <h1 className='text-mtyellow tracking-[0.2rem]'
                style={{ textShadow: '4px 4px #8F43EE, 4px 4px 12px black'}}>
                {movieTitle}
              </h1>
            </div>
            <div className="max-w-[1640px] m-auto px-4">
              <div className='flex flex-col lg:flex-row justify-between py-8'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                  {movies.map((movie) => (
                    <div className='border border-mtyellow shadow-lg bg-mtdarkgray rounded-lg'>
                      <MovieCard key={movie.id} movie={movie} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SearchBar />
          </div>
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default Search;