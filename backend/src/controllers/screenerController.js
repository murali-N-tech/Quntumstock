const { getMultipleStockQuotes } = require('../services/stockService.js');
const { getTopCryptos } = require('../services/cryptoService.js');
const { getForexPairs } = require('../services/forexService.js');
const { getMarketNews } = require('../services/tradingService.js');

// === Stock Controller ===
const fetchMultipleStockQuotes = async (req, res, next) => {
    try {
        const symbols = req.query.symbols;
        if (!symbols) {
            return res.status(400).json({ message: 'Symbols query parameter is required.' });
        }
        const quotes = await getMultipleStockQuotes(symbols);
        res.json(quotes);
    } catch (error) {
        next(error);
    }
};

// === Crypto Controller ===
const fetchTopCryptos = async (req, res, next) => {
  try {
    const data = await getTopCryptos();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// === Forex Controller ===
const fetchForexPairs = async (req, res, next) => {
  try {
    const data = await getForexPairs();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// === Trading Controller ===
const fetchMarketNews = async (req, res, next) => {
  try {
    const data = await getMarketNews();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMultipleStockQuotes,
  fetchTopCryptos,
  fetchForexPairs,
  fetchMarketNews,
};