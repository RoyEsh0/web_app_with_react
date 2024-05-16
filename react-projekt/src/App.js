
import './index.css';


import React, {useState, useEffect} from 'react';
import { fetchFlightData } from './services/api';
import SearchBar from './components/SearchBar';
import FlightTable from './components/FlighTable';



function App() {
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getFlightData = async() => {
      try {
        const data = await fetchFlightData();
        console.log("Fetched flight data:", data)
        setFlightData(data.states);
        setFilteredData(data.states);
        setLoading(false);
      
      } catch (error) {
        console.log("Error in useEffect: ", error.message);
        setError(error);
        setLoading(false);
      }
    };

    getFlightData();
  }, []);
    const handleSearch  = (searchTerm) => {
      const filtered = flightData.filter((flight) =>{
        return (
          (flight[0] && flight[0].toLowerCase().includes(searchTerm.toLowerCase())) ||
          (flight[1] && flight[1].toLowerCase().includes(searchTerm.toLowerCase())) ||
          (flight[2] && flight[2].toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredData(filtered);
    };


  if (loading) {
    return <div>loading ...</div>;
  }


  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className='App'>
      <h1>Flight Tracking Data</h1>
      <SearchBar onSearch={handleSearch}/>
      <FlightTable flightData={filteredData}/>
    </div>
  );
}


export default App;
