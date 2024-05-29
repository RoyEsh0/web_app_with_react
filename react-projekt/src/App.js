import React, { useState, useEffect } from 'react';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/sidebar';
import MapView from './components/MapView/mapview';
import Footer from './components/Footer/footer';
import './app.css';
import { ThemeProvider, useTheme } from './ThemeContext';
import { fetchFlightData } from './services/api';
import SearchBar from './components/SearchBar/SearchBar';
import FlightTable from './components/FlightTable/FlightTable';
import RouteSearch from './components/RouteSearch/RouteSearch';




function AppContent() {
  const { theme } = useTheme();

  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const getFlightData = async () => {
      
      try {
        const data = await fetchFlightData();
       
        if (data.data) {
          setFlightData(data.data);
          setFilteredData(data.data);
        } else {
          setLoading(false);
          console.error("No flight data available in the response!");
        }
        setLoading(false);
      } catch (error) {
        console.log("Error in useEffect: ", error.message);
        setError(error);
        setLoading(false);
      }
    };

    getFlightData();
  }, []);

  const handleSearch = (searchTerms) => {
    const { departure, destination, filter, value } = searchTerms;

    let filtered = flightData;

    if (departure) {
      filtered = filtered.filter((flight) =>
        flight.departure.airport?.toLowerCase().includes(departure.toLowerCase())
      );
    }

    if (destination) {
      filtered = filtered.filter((flight) =>
        flight.arrival.airport?.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (value) {
      filtered = filtered.filter((flight) => {
        const fieldValue = filter.split('.').reduce((obj, key) => obj?.[key], flight)?.toString().trim().toLowerCase() || '';
        return fieldValue.includes(value.toLowerCase());
      });
    }

    if (filtered.length === 0) {
      setSearchError(`No results found for the given search criteria`);
    } else {
      setSearchError('');
    }

    console.log("Filtered data: ", filtered);
    setFilteredData(filtered);
  };

  const handleRouteSearch = (departure, destination) => {
    const filtered = flightData.filter((flight) =>
      flight.departure.airport?.toLowerCase().includes(departure.toLowerCase()) &&
      flight.arrival.airport?.toLowerCase().includes(destination.toLowerCase())
    );

    if (filtered.length === 0) {
      setSearchError(`No routes found from ${departure} to ${destination}`);
    } else {
      setSearchError('');
    }

    console.log("Filtered data: ", filtered);
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
          <MapView  flightData={filteredData}/>
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