
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
  //const [selectedFligth, setSelectedFligth] = useState(null);


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
  
    const handleSearch  = (searchTerm, selectedFilter) => {
      
      const filterIndex = {
        icao24: 'icao_24',
        callsign: 'callsign',
        origin_country: 'departure.airport.country',
        velocity: 'speed.horizontal',
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
    return (
      <div>
        <div>Error fetching data: {error.message}</div>
        {error.response && <div>Response: {JSON.stringify(error.response.data)}</div>}
        {error.request && <div>Request: {JSON.stringify(error.request)}</div>}
      </div>
    );
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
