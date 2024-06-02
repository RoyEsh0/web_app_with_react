import React from 'react';
import './header.css';
import { useTheme } from '../../ThemeContext';

const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="text-xl font-bold">FlightTracker</span>
      </div>
      
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
      >
          Theme Toggle</button>
    </header>
  );
};

export default Header;