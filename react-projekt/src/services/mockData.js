
 
export const mockFlightData = async () => {
    const mockData = {
      data: [
        {
          icao_24: "abcd1234",
          callsign: "TEST123",
          departure: { airport: { country: "Testland" } },
          time_position: 1609459200,
          last_contact: 1609459800,
          longitude: 10.0,
          latitude: 20.0,
          altitude: 30000,
          on_ground: false,
          speed: { horizontal: 500 }
        },
        // Add more mock data as needed
      ]
    };
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 1000);
    });
  };