import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header/header';
import MapView from './components/MapView/mapview';
import Footer from './components/Footer/footer';
import { ThemeProvider, useTheme } from './ThemeContext';
import { fetchFlightData } from './services/api';
import SearchBar from './components/SearchBar/SearchBar';
import RouteSearch from './components/RouteSearch/RouteSearch';
import Favorites from './components/Favorites/Favorites';

{/*
  Denna fil innehåller huvudkomponenten för applikationen.
  Den hanterar inläsning av data, sökfunktioner, favoritlistor och temaväxling.
*/}

function AppContent() {
  const { theme } = useTheme();
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  {/* Använd effektkrok för att ändra temaklass på body-elementet när temat ändras */}
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  {/* Funktion för att hämta och sätta flygdata */}
  const fetchAndSetFlightData = async () => {
    try {
      const data = await fetchFlightData();
      console.log("Fetched flight data: ", data);
      setFlightData(data);
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  {/* Använd effektkrok för att hämta data vid komponentens montering och sätta intervall för datauppdatering */}
  useEffect(() => {
    fetchAndSetFlightData();

    const interval = setInterval(() => {
      fetchAndSetFlightData();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchResultsRef]);

  {/* Använd effektkrok för att uppdatera favoritlistan i localStorage när den ändras */}
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  {/* Funktion för att lägga till flyg i favoritlistan */}
  const handleAddFavorite = (flight) => {
    setFavorites((prevFavorites) => [...prevFavorites, flight]);
  };

  {/* Funktion för att ta bort flyg i favoritlistan */}
  const handleRemoveFavorite = (icao24) => {
    setFavorites((prevFavorites) => prevFavorites.filter(flight => flight.icao24 !== icao24));
  };

  {/* Funktion för att hantera sökningar baserat på användarens inmatade söktermer */}
  const handleSearch = (searchTerms) => {
    const { departure, destination, filter, value } = searchTerms;
    let filtered = flightData;

    if (departure) {
      filtered = filtered.filter((flight) =>
        flight.origin_country?.toLowerCase().includes(departure.toLowerCase())
      );
    }

    if (destination) {
      filtered = filtered.filter((flight) =>
        flight.callsign?.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (value) {
      filtered = filtered.filter((flight) => {
        const fieldValue = flight[filter]?.toString().trim().toLowerCase() || '';
        return fieldValue.includes(value.toLowerCase());
      });
    }

    if (filtered.length === 0) {
      setSearchError(`No results found for the given search criteria`);
    } else {
      setSearchError('');
    }

    console.log('Filtered data: ', filtered);
    setFilteredData(filtered);
    console.log('Filtered data state set:', filteredData);
  };

  {/* Funktion för att hantera rutsökningar baserat på avgångs- och destinationsflygplats */}
  const handleRouteSearch = (departure, destination) => {
    const filtered = flightData.filter((flight) =>
      flight.origin_country?.toLowerCase().includes(departure.toLowerCase()) &&
      flight.callsign?.toLowerCase().includes(destination.toLowerCase())
    );

    if (filtered.length === 0) {
      setSearchError(`No routes found from ${departure} to ${destination}`);
    } else {
      setSearchError('');
    }

    console.log('Filtered data: ', filtered);
    setFilteredData(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>Error fetching data: {error.message}</div>
        {error.response && <div>Response: {JSON.stringify(error.response.data)}</div>}
        {error.request && <div>Request: {JSON.stringify(error.request)}</div>}
      </div>
    );
  }

  return (
    /* Temaklass appliceras dynamiskt baserat på valt tema. */
    <div className={`app ${theme} flex flex-col h-screen`}>
      <Header />
      <div className="flex-grow flex flex-col lg:flex-row relative overflow-hidden">
        <div className="relative flex-grow w-full h-full">
        <MapView flightData={filteredData} onAddFavorite={handleAddFavorite} />
          <div className="absolute top-20 right-0 lg:top-24 lg:right-4 lg:w-80 w-full px-4 lg:px-0 space-y-4 z-10">
            <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-full lg:w-80"
            style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-full lg:w-80"
            style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
              <RouteSearch onRouteSearch={handleRouteSearch} />
            </div>
            {searchError && (
              <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg text-red-500 w-full lg:w-80">
                {searchError}
              </div>
            )}
            <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-full lg:w-80">
              <Favorites favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
            </div>
          </div>
        </div>
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