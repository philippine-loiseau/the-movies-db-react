import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from './../../assets/logos/tmdb.svg';
import mobileLogo from './../../assets/logos/tmdb-mobile.svg';
import useScrollPosition from "../../hooks/useScrollPosition";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [headerVisible, setHeaderVisible] = useState(true);
  const {isScrollingUp} = useScrollPosition();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setHeaderVisible(isScrollingUp || window.scrollY === 0);
  }, [isScrollingUp]);

  return (
    <header
      className={`p-4 fixed top-0 w-full z-50 transition-all duration-500 ${
        headerVisible
          ? 'bg-gray-800 text-white p-3 opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className={`container mx-auto ${isMobile ? 'flex justify-center' : 'flex justify-between'
      } items-center`}>
        <Link to="/" className="text-xl">
          <img className={isMobile ? "w-14 h-auto" : "w-40 h-auto"} src={isMobile ? mobileLogo : logo} alt="logo"/>
        </Link>
      </div>
    </header>
  );
};

export default Header;
