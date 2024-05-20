import React from 'react';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/sidebar';
import MapView from './components/MapView/mapview';
import Footer from './components/Footer/footer';
import './app.css';
import { ThemeProvider, useTheme } from './ThemeContext';

function AppContent() {
  const { theme } = useTheme();

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <Header />
      <div className="main-content">
        <Sidebar />
        <MapView />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
