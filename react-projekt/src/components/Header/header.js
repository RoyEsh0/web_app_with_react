import React from 'react';
import './header.css';
import { useTheme } from '../../ThemeContext';

const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="fixed w-full top-0 left-0 bg-white bg-opacity-50 shadow-lg z-50 flex justify-between items-center p-4">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <span className="text-xl font-bold">FlightTracker</span>
      </div>
      
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={toggleTheme}
      >
          Theme Toggle</button>
    </header>
  );
};

export default Header;
