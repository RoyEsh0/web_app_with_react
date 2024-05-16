import React from "react";

const FlightTable = ({flightData}) =>{
    return (
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
    );
}; 


export default FlightTable;
