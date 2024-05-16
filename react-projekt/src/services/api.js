import axios from 'axios';

const API_URL = 'https://opensky-network.org/api/states/all'
export const fetchFlightData = async() => {
    try {
        const response = await axios.get(API_URL);
        console.log('API response: ', response);
        return response.data;

    } catch (error) {
        console.error("Error fetching flight data: ", error);
        throw error;
    }
};