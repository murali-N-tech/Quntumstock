const axios = require('axios');

// CoinMarketCap Pro API endpoint
const BASE_URL = 'https://pro-api.coinmarketcap.com';
const API_KEY = process.env.COINMARKETCAP_API_KEY;

// Get the top cryptocurrencies by market cap
const getTopCryptos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/cryptocurrency/listings/latest`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY, // API key is sent in a header
            },
            params: {
                start: '1',
                limit: '100', // Fetch top 100 coins
                convert: 'USD',
            },
        });

        // Map the CoinMarketCap response to our application's data structure
        return response.data.data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            // Construct the image URL using the coin's ID
            image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`, 
            price: coin.quote.USD.price,
            marketCap: coin.quote.USD.market_cap,
            changePercent24h: coin.quote.USD.percent_change_24h,
        }));
    } catch (error) {
        console.error('CoinMarketCap API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch top cryptocurrencies from CoinMarketCap.');
    }
};

module.exports = {
  getTopCryptos,
};