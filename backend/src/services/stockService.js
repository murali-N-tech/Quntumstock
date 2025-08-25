const axios = require('axios');

const API_KEY = process.env.TWELVE_DATA_API_KEY;
const BASE_URL = 'https://api.twelvedata.com';

/**
 * Fetches real-time quotes for multiple stock symbols in a single API call.
 * @param {string} symbols - A comma-separated string of stock tickers.
 * @returns {Array} A list of formatted stock quote objects.
 */
const getMultipleStockQuotes = async (symbols) => {
  if (!API_KEY) {
    throw new Error('Twelve Data API key is missing.');
  }

  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: {
        symbol: symbols,
        apikey: API_KEY,
      },
    });

    // Handle cases where the API returns a "code" field indicating an error
    if (response.data.code === 401 || response.data.code === 400) {
      console.error('Twelve Data API Error:', response.data.message);
      throw new Error(response.data.message || 'Failed to fetch stock quotes from Twelve Data.');
    }
    
    const quotes = response.data;
    return Object.keys(quotes).map(symbol => {
      const data = quotes[symbol];
      return {
        symbol: data.symbol,
        name: data.name,
        price: parseFloat(data.close),
        changePercent: parseFloat(data.percent_change),
        volume: parseInt(data.volume),
      };
    });
  } catch (error) {
    console.error('Twelve Data Service Error:', error.message);
    throw new Error('Failed to fetch stock quotes from Twelve Data.');
  }
};

module.exports = {
  getMultipleStockQuotes,
};