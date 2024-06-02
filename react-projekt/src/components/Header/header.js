import React from 'react';

const Header = () => {
  return (
    <header className="fixed w-full top-0 left-0 bg-white bg-opacity-50 shadow-lg z-50 flex justify-between items-center p-4">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <span className="text-xl font-bold">FlightTracker</span>
      </div>
    </header>
  );
};

export default Header;
