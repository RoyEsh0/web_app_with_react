import axios from 'axios';
import {mockFlightData} from './mockData';

const API_URL = 'https://opensky-network.org/api/states/all'

let cache = {
    data : null,
    timestamp: 0
};


const CACHE_DURATION = 60 * 1000; // this will cache the data for 1 minute

export const fetchFlightData = async() => {

    const now = Date.now();
    if(cache.data && (now - cache.timestamp) < CACHE_DURATION) {
        console.log("Returning cached data");
        return cache.data;
    }
    try {
        const response = await axios.get(API_URL);
        cache.data = response.data;
        cache.timestamp = now;
        return response.data;

    } catch (error) {
        console.error("Error fetching flight data: ", error);
        throw error
    }
};