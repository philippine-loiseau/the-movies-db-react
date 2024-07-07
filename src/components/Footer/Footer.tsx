import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tmdb-dark-blue text-white p-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <h3 className="font-bold mb-2">LES BASES</h3>
          <ul>
            <li><a href="#!" className="hover:underline">À propos de TMDB</a></li>
            <li><a href="#!" className="hover:underline">Nous contacter</a></li>
            <li><a href="#!" className="hover:underline">Forums de support</a></li>
            <li><a href="#!" className="hover:underline">API</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <h3 className="font-bold mb-2">PARTICIPER</h3>
          <ul>
            <li><a href="#!" className="hover:underline">Bible de contribution</a></li>
            <li><a href="#!" className="hover:underline">Ajouter un nouveau film</a></li>
            <li><a href="#!" className="hover:underline">Ajouter une nouvelle série</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <h3 className="font-bold mb-2">COMMUNAUTÉ</h3>
          <ul>
            <li><a href="#!" className="hover:underline">Directives</a></li>
            <li><a href="#!" className="hover:underline">Discussions</a></li>
            <li><a href="#!" className="hover:underline">Classement</a></li>
            <li><a href="#!" className="hover:underline">Twitter</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4">
          <h3 className="font-bold mb-2">LÉGAL</h3>
          <ul>
            <li><a href="#!" className="hover:underline">Conditions d'utilisation</a></li>
            <li><a href="#!" className="hover:underline">Conditions d'utilisation de l'API</a></li>
            <li><a href="#!" className="hover:underline">Politique de confidentialité</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
