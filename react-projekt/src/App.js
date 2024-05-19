
import './index.css';


import React, {useState, useEffect} from 'react';
import { fetchFlightData } from './services/api';
import SearchBar from './components/SearchBar';
import FlightTable from './components/FlightTable';



function App() {
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');


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
    const handleSearch  = (searchTerm, selectedFilter) => {
      
      const filterIndex = {
        icao24: 0,
        callsign: 1,
        origin_country: 2,
        velocity: 9,
      }[selectedFilter];

      console.log("Search term: ", searchTerm);
      console.log("Selected filter: ", selectedFilter);
      console.log("Filter index: ", filterIndex);
      
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();

      if (!trimmedSearchTerm){
        setFilteredData(flightData);
        setSearchError('');
        return;
      }

      //Flitering the data according to the search term
      const filtered = flightData.filter((flight) => {
        console.log("Flight data Entry: ", flight);

        const fieldValue = flight[filterIndex] ? flight[filterIndex].toString().trim().toLowerCase() : '';
        console.log(`Comparing "${fieldValue}" with "${trimmedSearchTerm}"`);
        //console.log("Flight data: ", flight);

        return fieldValue.includes(trimmedSearchTerm);
        //return flight[filterIndex] && flight[filterIndex].toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (FileReader.length === 0 ){
        setSearchError(`No results found for "${searchTerm}" in ${selectedFilter}`);

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
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className='App'>
      <h1>Flight Tracking Data</h1>
      <SearchBar onSearch={handleSearch}/>
      {searchError && <div style={{color: 'red'}}>{searchError}</div>}
      <FlightTable flightData={filteredData}/>
    </div>
  );
}


export default App;
