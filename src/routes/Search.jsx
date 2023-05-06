import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import PageNotFound from "./PageNotFound";
import SearchBar from '../components/SearchBar';

// API endpoints and key
const searchUrl = 'https://api.themoviedb.org/3/search/movie';
const apiKey = import.meta.env.VITE_REACT_TMDB_KEY;

const Search = () => {
  // Get the current URL location
  const location = useLocation();

  // Set initial state for foundMovies
  const [foundMovies, setFoundMovies] = useState(true);

  // Set initial state for movies and movieTitle
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");

  // Extract the search query from the URL
  const query = new URLSearchParams(location.search).get('search');
  const encodedQuery = encodeURIComponent(query);

  // Function to get the ID of the first search result
  const getMovieId = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      // If search is successful and there are results, get the ID and title of the first movie
      if (res.status === 200 && data.results.length > 0) {
        const movieId = data.results[0].id;
        const movieTitle = data.results[0].title;
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`;

        // Set the movie title in state and get recommendations for the movie
        setMovieTitle(movieTitle);
        getRecommendations(recommendationsUrl);
      } else {
        // If search is unsuccessful or there are no results, set foundMovies to false
        setFoundMovies(false);
      }
    } catch (error) {
      // If there is an error, set foundMovies to false
      setFoundMovies(false);
    }
  };

  // Function to get movie recommendations based on ID
  const getRecommendations = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    // Set the recommendations in state
    setMovies(data.results);
  };

  // UseEffect hook to get the ID of the search result and recommendations when the component mounts or when the search query changes
  useEffect(() => {
    const movieSearchUrl = `${searchUrl}?api_key=${apiKey}&query=${encodedQuery}`;
    getMovieId(movieSearchUrl);
  }, [encodedQuery]);

  return (
    <div className='mt-20 bg-[#121212] '>
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
                    <div className='border border-mtyellow shadow-lg bg-mtdarkgray rounded-lg hover:scale-105 transition-transform duration-200'>
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