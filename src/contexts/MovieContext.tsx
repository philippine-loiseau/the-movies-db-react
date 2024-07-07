import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getMovieCredits, getMovieDetails, getTrendingMovies as fetchTrendingMoviesAPI, searchMoviesWithQuery } from '../services/the-movies-db-api';

const MovieContext = createContext<IMovieContext | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState<IMovie[]>([]);

  const fetchTrendingMovies = async (page: number): Promise<IMovie[]> => {
    const movies = await fetchTrendingMoviesAPI(page);
    setTrendingMovies(movies);
    return movies;
  };

  const fetchMovieDetails = async (id: number): Promise<IMovie | undefined> => {
    try {
      return await getMovieDetails(id);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return undefined;
    }
  };

  const searchMovies = async (query: string, page: number): Promise<IMovie[]> => {
    try {
      return await searchMoviesWithQuery(query, page);
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  };

  const fetchMovieCredits = async (id: number): Promise<ICast | undefined> => {
    try {
      return await getMovieCredits(id);
    } catch (error) {
      console.error('Error fetching movie credits:', error);
      return undefined;
    }
  };

  useEffect(() => {
    fetchTrendingMovies(1);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        fetchTrendingMovies,
        fetchMovieDetails,
        searchMovies,
        fetchMovieCredits,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
