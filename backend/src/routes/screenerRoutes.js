const express = require('express');
const router = express.Router();
const {
  fetchMultipleStockQuotes,
  fetchTopCryptos,
  fetchForexPairs,
  fetchMarketNews,
} = require('../controllers/screenerController.js');

// Stock Route (now using a single endpoint for multiple quotes)
router.get('/stocks/quotes', fetchMultipleStockQuotes);

// Crypto Route
router.get('/crypto/top', fetchTopCryptos);

// Forex Route
router.get('/forex/pairs', fetchForexPairs);

// Trading Route
router.get('/trading/news', fetchMarketNews);

module.exports = router;