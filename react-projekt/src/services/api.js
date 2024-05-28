import axios from 'axios';
//import { mockFlightData } from './mockData';

//För att test med mockdata
/*export const fetchFlightData = async () => {
  try {
    const data = await mockFlightData();
    console.log("Using mock flight data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching mock data: ", error);
    throw error;
  }
};*/

//const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = 'http://localhost:3001/api/v1/flights';
const API_KEY = 'e9dbe7ea23490b5e6ffafa8f53990c36';


export const fetchFlightData = async() => {

    const cachedData = localStorage.getItem('flightData');
    if (cachedData) {
        return JSON.parse(cachedData);
        }

    try {
        const params = {
            access_key : API_KEY
        };
        const response = await axios.get( API_URL, { params });
        console.log("Full API response: " , response);
        const apiResponse = response.data;
        console.log("API response data: " , apiResponse);
        localStorage.setItem('flightData', JSON.stringify(apiResponse));
        return apiResponse;
        

    } catch (error) {
        if (error.response){
            console.error("Error Response: ", error.response);
            console.error("Response Data:", error.response.data);
            console.error("Response Status:", error.response.status);
            console.error("Response Headers:", error.response.headers);
        }else if(error.request){
            console.error("Error Request: ", error.request);
        }else {
            console.error("Error Message: ", error.message);
        }
        
        throw error;
    }
};