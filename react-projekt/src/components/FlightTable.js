import React from "react";

const FlightTable = ({flightData}) =>{
  if (!flightData || flightData.length === 0) 
      {
      return <div>No flight data available</div>
      }
    return (
        <table>
          <thead>
            <tr>
            <th>Flight Date</th>
          <th>Flight Status</th>
          <th>Airline</th>
          <th>Flight Number</th>
          <th>Departure Airport</th>
          <th>Arrival Airport</th>
          <th>Scheduled Departure</th>
          <th>Scheduled Arrival</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Altitude</th>
          <th>On The Ground</th>
          <th>Horizontal Speed</th>
            </tr>
          </thead>
          <tbody>
            {flightData.map((flight, index)=>{
              console.log("Flight data: ", flight);
              return(
                <tr key={index}>
                  <td>{flight.flight_date || 'N/A'}</td>
              <td>{flight.flight_status || 'N/A'}</td>
              <td>{flight.airline?.name || 'N/A'}</td>
              <td>{flight.flight?.number || 'N/A'}</td>
              <td>{flight.departure?.airport || 'N/A'}</td>
              <td>{flight.arrival?.airport || 'N/A'}</td>
              <td>{flight.departure?.scheduled || 'N/A'}</td>
              <td>{flight.arrival?.scheduled || 'N/A'}</td>
              <td>{flight.live?.latitude || 'N/A'}</td>
              <td>{flight.live?.longitude || 'N/A'}</td>
              <td>{flight.live?.altitude || 'N/A'}</td>
              <td>{flight.live?.is_ground ? 'Yes' : 'No'}</td>
              <td>{flight.live?.speed_horizontal || 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    );
}; 


export default FlightTable;
