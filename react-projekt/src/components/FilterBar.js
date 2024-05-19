

import React from 'react';

const FilterBar = ({selectedFilter, setSelectedFilter}) => {
   const handleChange = (e) => {
    setSelectedFilter(e.target.value);
   };

    
    return (
        <select value={selectedFilter} onChange={handleChange}>
            <option value="icao24">ICAO24</option>
            <option value="callsign">Callsign</option>
            <option value="origin_country">Origin Country</option>
            <option value="velocity">Velocity</option>

        </select>
        
    );

};

export default FilterBar;
