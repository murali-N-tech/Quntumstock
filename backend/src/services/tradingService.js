const axios = require('axios');

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

// Get general market news
const getMarketNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/news`, {
            params: {
                category: 'general',
                token: API_KEY
            }
        });
        // Return the top 10 recent articles
        return response.data.slice(0, 10);
    } catch (error) {
        console.error('Finnhub API Error (News):', error.message);
        throw new Error('Failed to fetch market news.');
    }
}

// Add this export line at the bottom
module.exports = {
    getMarketNews,
};