{/*
  Denna fil innehåller funktioner för att hantera caching av data.
  Cachen lagrar data under en viss tid (TTL) för att minska antalet API-anrop.
*/}
const cache = {};
const TTL = 5000; // Cache time-to-live in milliseconds (5 seconds)

{/* setCache-funktionen lagrar data i cachen med en bestämd utgångstid. */}
export const setCache = (key, data) => {
  cache[key] = {
    data,
    expiry: Date.now() + TTL,
  };
};
{/* getCache-funktionen hämtar data från cachen om den inte har gått ut. */}
export const getCache = (key) => {
  const cachedData = cache[key];
  if (cachedData && cachedData.expiry > Date.now()) {
    return cachedData.data;
  }
  return null;
};

{/* clearCache-funktionen tar bort data från cachen. */}
export const clearCache = (key) => {
  delete cache[key];
};
