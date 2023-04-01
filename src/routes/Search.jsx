import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

const searchUrl = 'https://api.themoviedb.org/3/movie/{movie_id}/similar'
const apiKey = import.meta.env.VITE_TMDB_KEY

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get('search');

  return (
    <div className='mt-20'>
      <h1>Search for {query}</h1>
    </div>
  )
}

export default Search