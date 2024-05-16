
import './index.css';


import React, {useState, useEffect} from 'react';
import { fetchFlightData } from './services/api';


function App() {
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFlightData = async() => {
      try {
        const data = await fetchFlightData();
        setFlightData(data.states);
        setLoading(false);
      
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getFlightData();
  }, []);
  if (loading) {
    return <div>loading ...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  return (
    <div className='App'>
      <h1>Flight Tracking Data</h1>
      <table>
        <thead>
          <tr>
            <th>ICA024</th>
            <th>Callsign</th>
            <th>Origin Country</th>
            <th>Time Position</th>
            <th>Last Contact</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Altitude</th>
            <th>Velocity</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((flight, index)=>{
            console.log("Flight data: ", flight);
            return(
              <tr key={index}>
                <td>{flight[0] || 'N'}</td>
                <td>{flight[1]}</td>
                <td>{flight[2]}</td>
                <td>{flight[3]}</td>
                <td>{flight[4]}</td>
                <td>{flight[5]}</td>
                <td>{flight[6]}</td>
                <td>{flight[7]}</td>
                <td>{flight[9]}</td>
                {/*<td>{flight[9]}</td>*/}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export default App;
