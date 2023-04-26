import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_REACT_TMDB_KEY;

// This component represents a search bar that allows users to search for similar movies.
const SearchBar = () => {

  // useState hooks for handling user input and navigation
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // handleSubmit function is called when the search form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!search) return
  
    navigate(`/search?search=${search}`);
    setSearch("")
  };

  // searchHandleSubmit function is called when a movie is clicked
  const searchHandleSubmit = (event, movie) => {
    event.preventDefault();
    navigate(`/search?search=${movie.title}`);
    setSearch("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // useState hook for storing the top rated movies
  const [topMovies, setTopMovies] = useState([]);

  // getTopRatedMovies function is called to retrieve the top rated movies from the API
  const getTopRatedMovies = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results);
  };

  const fetchSuggestions = async (value) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}&page=1&include_adult=false`);
    return response.data.results.slice(0, 5).map((result) => result.title);
  };
  
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestionValue }) => {
    setSearch(suggestionValue);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const onSuggestionsFetchRequested = async ({ value }) => {
    setIsLoading(true);
    const results = await fetchSuggestions(value);
    setSuggestions(results);
    setIsLoading(false);
  };
    
  // useEffect hook for retrieving the top rated movies from the API on initial render
  useEffect(() => {
      const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}`;
      console.log(topRatedUrl);
      getTopRatedMovies(topRatedUrl);
  }, []);
      
  // useState hook and useEffect hook for setting the width of the top rated movies container
  const constraintsRef = useRef();
  
  // useEffect hook for handling links within the search bar
  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault();
      const target = event.target.hash;
      const element = document.querySelector(target);
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return (
    <div className='pb-10 mt-6 bg-mtdarkgray'>
        <div className='flex justify-center'>
        <div className='max-w-[1300px]'>
            <div className='mt-6'>
            <h1 className='text-3xl md:text-5xl text-mtyellow font-bold text-center text-shadow mt-10'>SEARCH FOR SIMILAR MOVIES</h1>
            </div>
            <div className='mt-6 mb-6'>
              <form className="flex justify-center -p-4 rounde z-50" onSubmit={handleSubmit}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionSelected={onSuggestionSelected}
                  getSuggestionValue={(suggestion) => suggestion}
                  inputProps={{
                    placeholder: 'Search for a twin',
                    value: search,
                    onChange: (_, { newValue }) => setSearch(newValue),
                    className: 'lg:w-[800px] md:w-[500px] flex-grow py-2 px-4 text-2xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite translate-x-8',
                  }}
                  renderSuggestion={(suggestion) => (
                    <div className={'truncate bg-mtgray text-gray-300 -translate-y-1 translate-x-8 px-6 py-2 cursor-pointer hover:bg-mtwhite hover:text-black'}>
                      {suggestion}
                    </div>
                  )}
                />
                <button type="submit" className="flex justify-center w-16 h-1 rounded-md bg-mtgray -translate-x-8 z-0 ">
                  <MdOutlineSearch size={48} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300 p-2" />
                </button>
              </form>
            </div>
        </div>
      </div>
      <div className='flex justify-center md:mt-4 mt-2'>
        <div ref={constraintsRef} className='overflow-hidden flex' style={{ margin: '0 5%' }}>
          <div className="flex" style={{width: '100%'}}>
            <motion.div drag='x' dragConstraints={constraintsRef} className='flex gap-4 md:gap-8'>
              {topMovies && topMovies.map((element) => {
                return (
                  <motion.div key={element.id} className='w-52 md:w-60 p-2 bg-mtgray rounded-lg cursor-grab overflow-hidden'>
                    <img className='object-cover rounded-xl pointer-events-none' src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} alt='movie poster' />
                    <div className='flex flex-col'>
                      <h1 className='p-1 text-base md:text-2xl text-center text-mtyellow text-shadow mt-2 mb-0 md:mb-6 h-20'>{element.title}</h1>
                      <div className='flex justify-center'>
                        <div style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                          <button className="
                            mt-6 mb-6 bg-mtyellow text-mtgray border-mtblack rounded-none py-4 px-8 title-font text-2xl hover:scale-110 duration-300 tracking-[0.1rem] font-bold justify-center items-end"
                            onClick={(e) => searchHandleSubmit(e, element)}>
                            SEARCH! 
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;