
// cache.js
const cache = {};
const TTL = 5000; // Cache time-to-live in milliseconds (5 seconds)

export const setCache = (key, data) => {
  cache[key] = {
    data,
    expiry: Date.now() + TTL,
  };
};

export const getCache = (key) => {
  const cachedData = cache[key];
  if (cachedData && cachedData.expiry > Date.now()) {
    return cachedData.data;
  }
  return null;
};

export const clearCache = (key) => {
  delete cache[key];
};
