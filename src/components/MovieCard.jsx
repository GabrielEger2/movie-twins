import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

const imageUrl = 'https://image.tmdb.org/t/p/w500/';

function ScrollLink({ to, children }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className='max-w-[1640px] m-auto'>
      <img src={imageUrl + movie.poster_path} alt={movie.title} className='w-full object-cover rounded-t-lg' />
      <div className='flex justify-between px-2 mt-2 flex-col'>
        <h2 className=' text-center text-mtwhite text-xl md:text-2xl lg:text-3xl font-bold'>{movie.title}</h2>
        <p className=' flex-row flex justify-center gap-2 mt-2 text-mtyellow content-center text-2xl'>
          <BsFillStarFill size={26} className="text-yellow-400" /> {movie.vote_average}
        </p>
        <div className='flex justify-center'>
          <div style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
            <button className='
            mt-4 mb-6 md:py-4 md:px-8 md:text-xl bg-mtyellow text-mtgray border-mtblack rounded-none py-2 px-4 title-font text-2xl hover:scale-110 duration-300 tracking-[0.1rem] font-bold justify-center items-end'>
              {showLink && <ScrollLink to={`/movie/${movie.id}`}>View Details</ScrollLink>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;