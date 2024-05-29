import React from 'react';

const FlightTable = ({ flightData }) => {
  console.log('flightData in FlightTable: ', flightData);
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Flight Date</th>
          <th className="border border-gray-300 px-4 py-2">Flight Status</th>
          <th className="border border-gray-300 px-4 py-2">Airline</th>
          <th className="border border-gray-300 px-4 py-2">Flight Number</th>
          <th className="border border-gray-300 px-4 py-2">Departure Airport</th>
          <th className="border border-gray-300 px-4 py-2">Departure IATA</th>
          <th className="border border-gray-300 px-4 py-2">Departure ICAO</th>
          <th className="border border-gray-300 px-4 py-2">Departure Terminal</th>
          <th className="border border-gray-300 px-4 py-2">Departure Gate</th>
          <th className="border border-gray-300 px-4 py-2">Departure Delay</th>
          <th className="border border-gray-300 px-4 py-2">Scheduled Departure</th>
          <th className="border border-gray-300 px-4 py-2">Estimated Departure</th>
          <th className="border border-gray-300 px-4 py-2">Actual Departure</th>
          <th className="border border-gray-300 px-4 py-2">Estimated Runway Departure</th>
          <th className="border border-gray-300 px-4 py-2">Actual Runway Departure</th>
          <th className="border border-gray-300 px-4 py-2">Arrival Airport</th>
          <th className="border border-gray-300 px-4 py-2">Arrival IATA</th>
          <th className="border border-gray-300 px-4 py-2">Arrival ICAO</th>
          <th className="border border-gray-300 px-4 py-2">Arrival Terminal</th>
          <th className="border border-gray-300 px-4 py-2">Arrival Gate</th>
          <th className="border border-gray-300 px-4 py-2">Baggage Claim</th>
          <th className="border border-gray-300 px-4 py-2">Arrival Delay</th>
          <th className="border border-gray-300 px-4 py-2">Scheduled Arrival</th>
          <th className="border border-gray-300 px-4 py-2">Estimated Arrival</th>
          <th className="border border-gray-300 px-4 py-2">Actual Arrival</th>
          <th className="border border-gray-300 px-4 py-2">Estimated Runway Arrival</th>
          <th className="border border-gray-300 px-4 py-2">Actual Runway Arrival</th>
        </tr>
      </thead>
      <tbody>
        {flightData.map((flight, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{flight.flight_date}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.flight_status}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.airline.name}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.flight.number}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.airport}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.iata}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.icao}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.terminal}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.gate}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.delay}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.scheduled}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.estimated}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.actual}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.estimated_runway}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.departure.actual_runway}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.airport}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.iata}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.icao}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.terminal}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.gate}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.baggage}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.delay}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.scheduled}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.estimated}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.actual}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.estimated_runway}</td>
            <td className="border border-gray-300 px-4 py-2">{flight.arrival.actual_runway}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
