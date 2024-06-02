/*
FilterBar-komponenten tillåter användaren att välja ett filter för att söka efter specifik flyginformation.
*/
import React from 'react';

const FilterBar = ({selectedFilter, setSelectedFilter}) => {
    {/* Hanterar ändringar i filtervalet */}
   const handleChange = (e) => {
    setSelectedFilter(e.target.value);
   };
   
    {/* Hanterar ändringar i filtervalet */}
    return (
        <select value={selectedFilter} onChange={handleChange} className="w-full p-2 border rounded"
        style={{ backgroundColor: 'var(--input-background)', color: 'var(--input-text-color)', borderColor: '#ccc',}}>
            <option value="flight_date">Flight Date</option>
            <option value="flight_status">Flight Status</option>
            <option value="flight.name">Airline</option>
            <option value="flight.number">Flight Number</option>
            <option value="departure.airport">Departure Airport</option>
            <option value="arrival.airport">Arrival Airport</option>

        </select>
        
    );

};

export default FilterBar;