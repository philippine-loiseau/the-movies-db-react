import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieList from '../scenes/Movie/MovieList';
import MovieItem from '../scenes/Movie/MovieDetail';

const MovieRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieItem />} />
    </Routes>
  );
};

export default MovieRoutes;
