import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillStarFill } from 'react-icons/bs'

const imageUrl = 'https://image.tmdb.org/t/p/w500/'

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div>
        <img src={imageUrl + movie.poster_path} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>
            <BsFillStarFill className='text-yellow-400' /> {movie.vore_average}
        </p>
        {showLink && <Link to={`/movie/${movie.id}`}></Link>}
    </div>
  )
}

export default MovieCard