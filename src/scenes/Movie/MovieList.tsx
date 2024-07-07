import React, {useState, useEffect, useRef, useCallback} from 'react';
import useDebounce from '../../hooks/useDebounce';
import MovieCard from "../../components/UI/MovieCard/MovieCard";
import HelmetMeta from "../../components/UX/HelmetMeta/HelmetMeta";
import {IoMdArrowRoundUp} from "react-icons/io";
import {useMovieContext} from "../../contexts/MovieContext";
import useScrollPosition from "../../hooks/useScrollPosition";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searching, setSearching] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 1000);
  const {scrollY} = useScrollPosition();
  const showScroll = scrollY > 300;

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasMoreRef = useRef<boolean>(true);

  const {fetchTrendingMovies, searchMovies} = useMovieContext();

  const loadMoreMovies = useCallback(async () => {
    if (!hasMoreRef.current) return;

    let fetchedMovies: IMovie[] = [];

    try {
      if (searching && debouncedQuery.length > 2) {
        fetchedMovies = await searchMovies(debouncedQuery, page);
      } else if (!searching && debouncedQuery.length <= 0) {
        fetchedMovies = await fetchTrendingMovies(page);
      }

      if (fetchedMovies.length === 0) {
        hasMoreRef.current = false;
      } else {
        setMovies(prevMovies => [...prevMovies, ...fetchedMovies]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }, [searching, debouncedQuery, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreMovies();
      }
    }, {
      rootMargin: '100px',
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [searching, debouncedQuery, page, loadMoreMovies]);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setSearching(true);
      setPage(1);
      setMovies([]);
      hasMoreRef.current = true;
    } else {
      setSearching(false);
      setPage(1);
      setMovies([]);
      hasMoreRef.current = true;
    }
  }, [debouncedQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div>
      <HelmetMeta title={'The Movies Database'} description={'Recherche de films'}></HelmetMeta>
      <h1
        className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-tmdb-green to-tmdb-blue text-transparent bg-clip-text">Recherche
        de films</h1>
      <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto mb-5">
        <div className="relative z-30 text-base text-black">
          <input type="text"
                 placeholder="Rechercher un film..."
                 value={query}
                 onChange={handleSearch}
                 className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"/>
          <div
            className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto">
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
      <div ref={loaderRef}
           className="mt-5 text-center bg-gradient-to-r from-tmdb-green to-tmdb-blue text-transparent bg-clip-text">Chargement
        des films...
      </div>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed h-14 w-14 lg:h-16 lg:w-16 bottom-8 right-3 bg-gradient-to-r from-tmdb-green to-tmdb-blue text-white rounded-full shadow-lg hover:bg-tmdb-green transition-colors duration-300"
        >
          <IoMdArrowRoundUp className='mx-auto text-2xl'></IoMdArrowRoundUp>
        </button>
      )}
    </div>
  );
};

export default MovieList;
