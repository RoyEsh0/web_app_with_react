const API_URL = 'https://opensky-network.org/api/states/all';


//kod tagen från tidigare version av projektet
export const fetchFlightData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch flight data: ${response.statusText}`);
    }

    const data = await response.json();
    const processedData = data.states
      .filter((state) => {
        const latitude = state[6];
        const longitude = state[5];
        return (
          latitude !== null && longitude !== null &&
          latitude >= 35 && latitude <= 70 &&
          longitude >= -10 && longitude <= 30
        );
      })
      .map((state) => ({
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
        heading: state[10],
        vertical_rate: state[11],
        sensors: state[12],
        geo_altitude: state[13],
        squawk: state[14],
        spi: state[15],
        position_source: state[16]
      }));

    return processedData;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
