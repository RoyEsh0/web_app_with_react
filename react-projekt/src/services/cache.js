
let cachedFlightData = null;

export const getCachedFlightData = () => {
  return cachedFlightData;
};

export const setCachedFlightData = (data) => {
  cachedFlightData = data;
};
