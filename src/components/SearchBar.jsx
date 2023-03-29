import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';

const SearchBar = () => {
  return (
    <div className='mt-4 bg-mtblack flex justify-center'>
      <div className='max-w-[1300px]'>
        <div className='mt-6'>
          <h1 className='text-4xl text-mtyellow font-bold text-center'>SEARCH FOR SIMILAR MOVIES</h1>
        </div>
        <div className='mt-6 mb-6'>
          <form className="flex items-center ml-4 mr-4">
            <input
              type="text"
              placeholder="Search for a twin"
              className="lg:w-[800px] md:w-[500px] flex-grow  py-1 px-2 text-xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite scale-x-105"
            />
            <button type="submit" className="flex items-center justify-center w-16 h-full rounded-md bg-mtgray z-40">
              <MdOutlineSearch size={36} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;