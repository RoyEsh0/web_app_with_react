{/*
  Denna fil är ingångspunkten för React-applikationen. Den ansvarar för att rendera huvudkomponenten (App) i DOM.
*/}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

{/* Skapa en root för React-applikationen och rendera App-komponenten inuti elementet med id 'root'. */}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
