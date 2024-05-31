import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header/header';
import MapView from './components/MapView/mapview';
import Footer from './components/Footer/footer';
import './app.css';
import { ThemeProvider, useTheme } from './ThemeContext';
import { fetchFlightData } from './services/api';
import SearchBar from './components/SearchBar/SearchBar';
import RouteSearch from './components/RouteSearch/RouteSearch';



function AppContent() {
  const { theme } = useTheme();
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [useCache, setUseCache] = useState(true); 
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchAndSetFlightData = async () => {
    try {
      const data = await fetchFlightData(useCache);
      console.log("Fetched flight data: ", data);
      setFlightData(data);
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetFlightData();

    const interval = setInterval(() => {
      fetchAndSetFlightData();
    }, 5000); // Fetch new data every 10 seconds

    return () => clearInterval(interval); 
  }, [useCache]);

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
    <div className={`app ${theme} flex flex-col h-screen`}>
      <Header />
      <div className="flex-grow flex relative">
        <div className="relative flex-grow">
          <MapView flightData={filteredData} />
          <div className="absolute top-24 right-4 space-y-4 z-10">
            <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-80">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-80">
              <RouteSearch onRouteSearch={handleRouteSearch} />
            </div>
            {searchError && (
              <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-80 text-red-500">
                {searchError}
              </div>
            )}
            <div className="bg-white bg-opacity-50 p-4 rounded shadow-lg w-80">
              <label>
                <input
                  type="checkbox"
                  checked={useCache}
                  onChange={() => setUseCache(!useCache)}
                />
                Use Cached Data
              </label>
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
