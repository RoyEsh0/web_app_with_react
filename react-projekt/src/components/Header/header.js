import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <input type="text" placeholder="Search..." className="search-bar" />
      <button className="theme-toggle">Theme Toggle</button>
    </header>
  );
};

export default Header;
