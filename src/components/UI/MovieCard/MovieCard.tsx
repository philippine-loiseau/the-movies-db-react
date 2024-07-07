import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MovieCard: React.FC<{ movie: IMovie;}> = ({ movie }) => {
  return (
    <div className="relative bg-white rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-2">
            <p className="text-sm font-medium text-gray-800 truncate">{movie.title}</p>
            <p className="text-xs text-gray-500">{moment(movie.release_date).format('LL')}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
