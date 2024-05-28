export const mockFlightData = async () => {
  const mockData = {
    data: [
      {
        icao_24: "abcd1234",
        callsign: "TEST123",
        flight_date: "2024-05-28",
        flight_status: "scheduled",
        airline: { name: "Test Airline" },
        flight: { number: "T123" },
        departure: { airport: "Testland Airport", scheduled: "2024-05-28T10:00:00Z" },
        arrival: { airport: "Testville Airport", scheduled: "2024-05-28T12:00:00Z" },
        time_position: 1609459200,
        last_contact: 1609459800,
        longitude: 10.0,
        latitude: 20.0,
        altitude: 30000,
        on_ground: false,
        speed: { horizontal: 500 }
      }
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 1000);
  });
};