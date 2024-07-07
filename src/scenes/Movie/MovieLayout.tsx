import React from 'react';
import {MovieProvider} from "../../contexts/MovieContext";

const MovieLayout: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MovieProvider>
        <main className="flex-grow container mx-auto p-4 mt-16 mb-16">
          {children}
        </main>
      </MovieProvider>
    </div>
  );
};

export default MovieLayout;
