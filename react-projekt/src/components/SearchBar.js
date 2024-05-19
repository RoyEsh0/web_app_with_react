import React, {useState} from "react";
import FilterBar from "./FilterBar";

//SearchBar component takes onSearch as a prop and calls it with the search term
const SearchBar = ({onSearch}) =>{
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('icao24');
    
    //handles the change in the input field
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    //Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, selectedFilter); 
    };
    return (
        <form onSubmit={handleSubmit}>
            <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
            <input
                type="text"
                placeholder={`Search by ${selectedFilter.replace('_', ' ')}`}
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>    
        </form>
        
    );


};
export default SearchBar;