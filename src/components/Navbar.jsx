import React, { useState, useEffect } from 'react';
import { MdMovie, MdClose, MdOutlineSearch } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const Navbar = () => {
  // State for search input value
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // React Router hook for navigation
  const navigate = useNavigate();


  const apiKey = import.meta.env.VITE_REACT_TMDB_KEY;

  // Function for handling search form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!search) return
  
    // Navigate to search page with search query
    navigate(`/search?search=${search}`);
    // Reset search input value
    setSearch("")
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State for mobile navigation menu toggle
  const [nav, setNav] = useState(false);

  // Function for handling mobile navigation menu toggle
  const handleNav = () => {
    setNav(!nav);
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

  // Component for smooth scrolling to page anchor links
  function ScrollLink({ to, children }) {
    const handleClick = () => {
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      // Link component with onClick handler for smooth scrolling
      <Link to={to} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  // Effect for adding event listeners to anchor links for smooth scrolling
  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault();
      // Get target anchor element
      const target = event.target.hash;
      const element = document.querySelector(target);
      // Scroll to target anchor element
      element.scrollIntoView({ behavior: 'smooth' });
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });
    // Cleanup function for removing event listeners
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);
  
  return (
    <div className="bg-mtblack fixed top-0 w-full z-50">
      <div className="flex justify-between h-20 max-w-[1200px] mx-auto px-6">
        <h1 className="w-full md:text-6xl text-4xl font-bold text-mtyellow title-font mt-5 md:mt-3 tracking-[0.1rem]"
        style={{ textShadow: '4px 4px #8F43EE'}}>
          <ScrollLink  to="/">Movie Twins</ScrollLink >
        </h1>
        <ul className="md:flex hidden mt-5.5">
          <li>
            <div className="ml-4">
              <div className="relative">
              <form onSubmit={handleSubmit}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionSelected={onSuggestionSelected}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={(suggestion) => (
                    <div className={'truncateNav bg-mtgray text-gray-300 -translate-y-1 px-6 py-2 cursor-pointer hover:bg-mtwhite hover:text-black'}>
                      {suggestion}
                    </div>
                  )}
                  inputProps={{
                    placeholder: 'Search for a twin',
                    value: search,
                    onChange: (_, { newValue }) => setSearch(newValue),
                    className: 'lg:w-[30rem] w-80 py-1 px-2 text-xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite',
                  }}
                />
                  <button type="submit" className="absolute inset-y-0 right-0 h-8 flex px-3 py-1.2 rounded-t-md bg-mtgray">
                    <MdOutlineSearch size={26} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300" />
                  </button>
                </form>
              </div>
            </div>
          </li>
        </ul>
        <div className="text-mtpurple bg-mtgray p-2 rounded-full mt-5 mb-4 block md:hidden z-50" onClick={handleNav}>
          {!nav ? <MdMovie size={30}/> : <MdClose size={30}/>}
        </div>
        <div className="block md:hidden z-20">
          <div
            className={
              !nav
                ? 'ease-in-out fixed top-[-100%]'
                : 'fixed left-0 top-0 w-full border-b border-b-mtyellow bg-mtblack ease-in-out duration-500 z-20'
            }
          >
            <h1 className="w-full text-4xl font-bold text-mtyellow m-6 title-font tracking-[0.1rem]"
            style={{ textShadow: '4px 4px #8F43EE'}}>
              <ScrollLink  to="/">Movie Twins</ScrollLink>
            </h1>
            <ul className='text-mtwhite'>
              <li className='border-b border-mtyellow'>
                <div className="p-4 flex items-center justify-center mb-3">
                  <div className="relative">
                    <form onSubmit={handleSubmit}>
                      <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        onSuggestionSelected={onSuggestionSelected}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => (
                          <div className={'truncate bg-mtgray text-gray-300 -translate-y-1 px-6 py-2 cursor-pointer hover:bg-mtwhite hover:text-black'}>
                            {suggestion}
                          </div>
                        )}
                        inputProps={{
                          placeholder: 'Search for a twin',
                          value: search,
                          onChange: (_, { newValue }) => setSearch(newValue),
                          className: 'w-[100%] py-1 px-2 text-xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite',
                        }}
                      />
                        <button type="submit" className="absolute inset-y-0 right-0 flex rounded-md p-1">
                          <MdOutlineSearch size={26} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300" />
                        </button>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar