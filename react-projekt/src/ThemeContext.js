import React, { createContext, useState, useContext } from 'react';

{/*
  Denna fil definierar en kontext för att hantera applikationens tema (ljus eller mörk).
  Inkluderar en ThemeProvider-komponent och en useTheme-hook för att använda temat i andra komponenter.
*/}

{/* Skapa en kontext för temat. */}
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  {/* Funktion för att växla mellan ljus och mörk tema. */}
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);