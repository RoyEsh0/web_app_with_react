import React from 'react';
import './header.css';
import { useTheme } from '../../ThemeContext';
{/*
Header-komponenten innehåller Logotyp samt en knapp som hanterar växlingen mellan ljus/mörk tema
*/}


const Header = () => {
  {/* Hämtar funktionen toggleTheme från ThemeContext för att växla mellan ljus och mörk tema. */}
  const { toggleTheme } = useTheme ( );
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