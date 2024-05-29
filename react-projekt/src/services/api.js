// services/api.js

import axios from 'axios';
import { getCachedFlightData, setCachedFlightData } from './cache';

const API_URL = 'https://opensky-network.org/api/states/all';

export const fetchFlightData = async (useCache = true) => {
  if (useCache) {
    const cachedData = getCachedFlightData();
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    const response = await axios.get(API_URL);
    console.log('API response:', response);
    const data = response.data.states.map(state => ({
      icao24: state[0],
      callsign: state[1],
      origin_country: state[2],
      time_position: state[3],
      last_contact: state[4],
      longitude: state[5],
      latitude: state[6],
      baro_altitude: state[7],
      on_ground: state[8],
      velocity: state[9],
      true_track: state[10],
      vertical_rate: state[11],
      sensors: state[12],
      geo_altitude: state[13],
      squawk: state[14],
      spi: state[15],
      position_source: state[16]
    }));

    setCachedFlightData(data);
    return data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
