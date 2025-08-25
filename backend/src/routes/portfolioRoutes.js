const express = require('express');
const router = express.Router();
const { 
  createPortfolio, 
  getPortfolios, 
  optimizePortfolio, 
  fetchAssetHistory // Import the new function here
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createPortfolio).get(protect, getPortfolios);
router.route('/optimize').post(protect, optimizePortfolio);

// This route will now work correctly
router.get('/history/:symbol', protect, fetchAssetHistory);

module.exports = router;