import React, {useEffect, useState, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import moment from 'moment';
import MemberCard from '../../components/UI/MemberCard/MemberCard';
import {IoMdArrowRoundBack} from 'react-icons/io';
import { useMovieContext } from '../../contexts/MovieContext';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [cast, setCast] = useState<ICastMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const prevIdRef = useRef<string | null>(null);
  const { fetchMovieDetails, fetchMovieCredits } = useMovieContext();

  useEffect(() => {
    if (!id) return;

    const movieId = parseInt(id);

    if (!isNaN(movieId)) {
      if (id !== prevIdRef.current) {
        prevIdRef.current = id;

        const fetchMovieDetailsAndCast = async () => {
          try {
            setIsLoading(true);

            const movieDetails: IMovie | undefined = await fetchMovieDetails(movieId);
            if (movieDetails) {
              setMovie(movieDetails);
            }

            const movieCast: ICast = await fetchMovieCredits(movieId);
            if (movieCast) {
              const actorsCast: ICastMember[] = movieCast.cast.filter(
                (member) =>
                  member.known_for_department.toLowerCase() === 'acting' && member.popularity >= 50
              );
              setCast(actorsCast);
            }

            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching movie details and cast:', error);
            setIsLoading(false);
          }
        };

        fetchMovieDetailsAndCast();
      }
    }
  }, [id, fetchMovieDetails, fetchMovieCredits]);

  if (!movie) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <div className="p-4">
      <Link
        to="/"
        className="bg-gradient-to-r from-tmdb-green to-tmdb-blue text-transparent bg-clip-text inline-flex items-center mb-4 hover:text-tmdb-dark-blue"
      >
        <IoMdArrowRoundBack className="mr-2 text-tmdb-dark-blue" /> Retour à la recherche
      </Link>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-none lg:w-96">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.tagline}</p>
          <div className="flex mb-4">
            <span className="px-2 py-1 bg-gray-200 rounded-md mr-2">
              {moment(movie.release_date).format('LL')}
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded-md mr-2">{movie.runtime} min</span>
          </div>

          <p className="text-lg">{movie.overview}</p>

          {isLoading ? (
            <div className="mt-5 text-center bg-gradient-to-r from-tmdb-green to-tmdb-blue text-transparent bg-clip-text">
              Chargement du casting...
            </div>
          ) : (
            <div className="mt-5">
              {cast.length > 0 && <h2 className="text-2xl font-bold mb-2">Casting</h2>}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cast.map((member) => (
                  <MemberCard key={member.id} member={member}></MemberCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
