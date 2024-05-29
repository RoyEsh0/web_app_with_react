import React, {useState} from "react";
import FilterBar from "../FilterBar/FilterBar";

//SearchBar component takes onSearch as a prop and calls it with the search term
const SearchBar = ({onSearch}) =>{
    
    const [searchTerms, setSearchTerms] = useState({
        departure: '',
        destination: '',
        filter: 'flight_date',
        value: ''
    });
    
    //const [filter, setFilter] = useState('flight_date');
    //const [value, setValue] = useState('');
   
    
    //handles the change in the input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms((prevTerms) => ({
          ...prevTerms,
          [name]: value,
        }));
      };
    

    //Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({searchTerms}); 
    };

    return (
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <select
                    name="filter"
                    value={searchTerms.filter}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="flight_date">Flight Date</option>
                    <option value="flight_status">Flight Status</option>
                    <option value="airline.name">Airline</option>
                    <option value="flight.number">Flight Number</option>
                </select>
                </div>
                <div>
                <input
                    type="text"
                    name="value"
                    placeholder="Search by filter"
                    value={searchTerms.value}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Search</button>
      </form>

        
    );


};
export default SearchBar;