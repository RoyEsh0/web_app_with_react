import React, {useState} from "react";

//SearchBar component takes onSearch as a prop and calls it with the search term
const SearchBar = ({onSearch}) =>{
    const [searchTerm, setSearchTerm] = useState('');
    
    //handles the change in the input field
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    //Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm); 
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by ICA024, Callsign, or Origin Country"
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit">Search</button>    
        </form>
        
    );


};
export default SearchBar;