const axios = require('axios');

const API_KEY = process.env.TWELVE_DATA_API_KEY;
const BASE_URL = 'https://api.twelvedata.com';

// Get a list of popular forex pairs
const getForexPairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/forex_pairs`, {
      params: {
        apikey: API_KEY,
      },
    });
    // Return a formatted list of major pairs for simplicity
    const majorPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD"];
    return response.data.data.filter(pair => majorPairs.includes(pair.symbol));
  } catch (error) {
    console.error('Twelve Data API Error (Pairs):', error.message);
    throw new Error('Failed to fetch forex pairs.');
  }
};

// Add this export line at the bottom
module.exports = {
  getForexPairs,
};