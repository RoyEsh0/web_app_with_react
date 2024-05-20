import React from 'react';
import './header.css';
import { useTheme } from '../../ThemeContext';

const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <span>FlightTracker</span>
      </div>
      <input type="text" placeholder="Search..." className="search-bar" />
      <button className="theme-toggle" onClick={toggleTheme}>Theme Toggle</button>
    </header>
  );
};

export default Header;
