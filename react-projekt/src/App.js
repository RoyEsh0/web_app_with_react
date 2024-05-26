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



import React, {useState, useEffect} from 'react';
import { fetchFlightData } from './services/api';
import SearchBar from './components/SearchBar';
import FlightTable from './components/FlightTable';
import RouteSearch from './components/RouteSearch';



function App() {
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');
  


  useEffect(() => {
    const getFlightData = async() => {
      console.log("getFlightData")
      try {
        const data = await fetchFlightData();
        console.log("Fetched flight data:", data)
        if (data.data){
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
    return <div>loading ...</div>;
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
    <div className={`app ${theme}`}>
      <Header />
      <div className="main-content">
        <Sidebar />
        <MapView />
        <h1>Flight Tracking Data</h1>
        <SearchBar onSearch={handleSearch}/>
        <RouteSearch onRouteSearch={handleRouteSearch}/>
        {searchError && <div style={{color: 'red'}}>{searchError}</div>}
        <FlightTable flightData={filteredData}/>
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



