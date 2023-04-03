import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_TMDB_KEY;


const SearchBar = () => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!search) return
  
    navigate(`/search?search=${search}`);
    setSearch("")
  };

  const searchHandleSubmit = (event, movie) => {
    event.preventDefault();
    navigate(`/search?search=${movie.title}`);
    setSearch("");
  };

  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results);
  };
    
  useEffect(() => {
      const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}`;
      console.log(topRatedUrl);
      getTopRatedMovies(topRatedUrl);
  }, []);
      

  const [width, setWidth] = useState(0);
  const screenSize = useRef();

  useEffect(() => {
    setWidth(screenSize.current.scrollWidth - screenSize.current.offsetWidth)
  }, [topMovies]);

  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault();
      const target = event.target.hash;
      const element = document.querySelector(target);
      if (element) {
        const topOffset = element.offsetTop;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth',
        });
      }
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
            <form className="flex items-center -p-4" onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Search for a twin"
                className="
                lg:w-[800px] md:w-[500px] flex-grow py-2 px-4 text-2xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite translate-x-5"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                />
                <button type="submit" className="flex items-center justify-center w-16 h-full rounded-md bg-mtgray z-40 -translate-x-5">
                <MdOutlineSearch size={48} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300 p-2" />
                </button>
            </form>
            </div>
        </div>
      </div>
      <div className='flex justify-center md:mt-4 mt-2'>
        <div ref={screenSize} className='overflow-hidden flex' style={{ margin: '0 5%' }}>
          <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} className='flex gap-4 md:gap-8'>
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
  )
}

export default SearchBar;