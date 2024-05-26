import React, {useState} from "react";
import FilterBar from "./FilterBar";

//SearchBar component takes onSearch as a prop and calls it with the search term
const SearchBar = ({onSearch}) =>{
    
    const [filter, setFilter] = useState('flight_date');
    const [value, setValue] = useState('');
   
    
    //handles the change in the input field
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    //Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({filter, value}); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <FilterBar selectedFilter={filter} setSelectedFilter={setFilter}/>
            <input
                type="text"
                name="value"
                placeholder={`Search by ${filter.replace('_', ' ')}`}
                value={value}
                onChange={handleChange}
            />
            <button type="submit">Search</button>    
        </form>
        
    );


};
export default SearchBar;