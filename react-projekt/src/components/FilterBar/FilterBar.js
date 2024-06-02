import React from 'react';

const FilterBar = ({selectedFilter, setSelectedFilter}) => {
   const handleChange = (e) => {
    setSelectedFilter(e.target.value);
   };

    
    return (
        <select value={selectedFilter} onChange={handleChange}>
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