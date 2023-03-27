import React, { useState, useEffect } from 'react';
import { MdMovie, MdClose, MdOutlineSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

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
    <div className="bg-mtblack fixed top-0 w-full z-50">
      <div className="flex justify-between items-center h-20 max-w-[1200px] mx-auto px-6">
        <h1 className="w-full md:text-6xl text-4xl font-bold text-mtyellow title-font mt-2 tracking-[0.1rem]"
        style={{ textShadow: '4px 4px #8F43EE'}}>
          <a href="#home">Movie Twins</a>
        </h1>
        <ul className="md:flex hidden justify-center items-center">
          <li className="px-4 py-2 text-2xl text-mtpurple hover:underline">
            <a href="#home">HOME</a>
          </li>
          <li className="px-4 py-2 text-2xl text-mtpurple hover:underline">
            <a href="#menu">TMDB</a>
          </li>
          <li>
            <div className="flex items-center ml-4">
              <div className="relative">
              <input
                type="text"
                placeholder="Search for a twin"
                className="lg:w-96 w-60 py-1 px-2 text-xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite"
              />
                <button type="submit" className="absolute inset-y-0 right-0 flex rounded-md items-center px-4  bg-mtgray">
                  <MdOutlineSearch size={26} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300" />
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div className="text-mtpurple bg-mtgray p-2 rounded-full block md:hidden z-50" onClick={handleNav}>
          {!nav ? <MdMovie size={28}/> : <MdClose size={28}/>}
        </div>
        <div className=" z-20">
          <div
            className={
              !nav
                ? 'ease-in-out fixed top-[-100%]'
                : 'fixed left-0 top-0 w-full border-b border-b-mtyellow bg-mtblack ease-in-out duration-500 z-20'
            }
          >
            <h1 className="w-full text-4xl font-bold text-mtyellow m-6 title-font">
              Movie Twins
            </h1>
            <ul className="text-mtpurple">
              <li className='border-b border-mtyellow'>
                <div className="p-4 flex items-center justify-center mb-3">
                  <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for a twin"
                    className="w-[100%] py-1 px-2 text-xl rounded-md focus:outline-none focus:shadow-outline bg-mtgray text-mtwhite"
                  />
                    <button type="submit" className="absolute inset-y-0 right-0 flex rounded-md items-center px-4  bg-mtgray">
                      <MdOutlineSearch size={26} className="text-mtpurple hover:text-mtyellow hover:scale-125 duration-300" />
                    </button>
                  </div>
                </div>
              </li>
              <li className="p-6 text-2xl border-b border-mtyellow flex items-center justify-center">
                <a href="#home" className='hover:underline'>Home</a>
              </li>
              <li className="p-6 text-2xl border-b border-mtyellow flex items-center justify-center">
                <a href="#menu" className='hover:underline'>TMDB</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar