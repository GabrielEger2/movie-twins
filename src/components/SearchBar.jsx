import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { motion } from 'framer-motion';

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_TMDB_KEY;

const SearchBar = () => {

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
    
const [width, setWidth] = useState(0);
const screenSize = useRef();

useEffect(() => {
    setWidth(screenSize.current.scrollWidth - screenSize.current.offsetWidth)
}, []);

  return (
    <div className='pb-10 mt-6 bg-mtdarkgray'>
        <div className='flex justify-center'>
        <div className='max-w-[1300px]'>
            <div className='mt-6'>
            <h1 className='text-3xl md:text-5xl text-mtyellow font-bold text-center text-shadow mt-10'>SEARCH FOR SIMILAR MOVIES</h1>
            </div>
            <div className='mt-6 mb-6'>
            <form className="flex items-center ml-4 mr-4">
                <input
                type="text"
                placeholder="Search for a twin"
                className="
                lg:w-[800px] md:w-[500px] flex-grow py-2 px-4 text-2xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite translate-x-2"
                />
                <button type="submit" className="flex items-center justify-center w-16 h-full rounded-md bg-mtgray z-40 -translate-x-2">
                <MdOutlineSearch size={48} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300" />
                </button>
            </form>
            </div>
        </div>
      </div>
      <div className='w-full flex px-4 mt-4'>
        <div ref={screenSize} className='overflow-hidden flex' style={{ margin: '0 5%' }}>
            <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} className='flex gap-4 md:gap-8'>
            {topMovies.map((element) => {
                return (
                    <motion.div key={element.id} className='w-52 md:w-60 p-2 bg-mtgray rounded-lg cursor-grab overflow-hidden'>
                    <img className='object-cover rounded-xl pointer-events-none' src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} alt='Movie Image' />
                    <h1 className='p-1 text-base md:text-2xl text-center text-mtyellow text-shadow mt-2'>{element.title}</h1>
                    <div className='flex justify-center'>
                      <button class="mt-6 mb-6 bg-mtyellow text-mtgray border-mtblack rounded-none py-4 px-8 title-font text-2xl hover:scale-110 duration-300 tracking-[0.1rem] font-bold justify-center">
                        SEARCH! 
                      </button>
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