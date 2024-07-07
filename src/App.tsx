import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieLayout from './scenes/Movie/MovieLayout';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MovieRoutes from "./routes/movie-routes";

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <MovieLayout>
        <MovieRoutes />
      </MovieLayout>
      <Footer/>
    </Router>
  );
};

export default App;
