const Portfolio = require('../models/Portfolio');
const { getQuantumOptimization } = require('../services/quantumService');
const { getHistoricalData } = require('../services/quantumService');

exports.createPortfolio = async (req, res, next) => {
  try {
    const { name, assets } = req.body;
    const portfolio = new Portfolio({ name, assets, user: req.user._id });
    const createdPortfolio = await portfolio.save();
    res.status(201).json(createdPortfolio);
  } catch (error) {
    next(error);
  }
};

exports.getPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id });
    res.json(portfolios);
  } catch (error) {
    next(error);
  }
};

exports.optimizePortfolio = async (req, res, next) => {
  try {
    const { assets } = req.body; // Expects an array of tickers, e.g., ['AAPL', 'GOOG']
    if (!assets || assets.length < 2) {
      res.status(400);
      throw new Error('Please provide at least 2 assets to optimize.');
    }
    
    // Call the Python Quantum Service
    const optimizationData = await getQuantumOptimization(assets);
    
    // You can also save this result to a portfolio in the DB here
    
    res.json(optimizationData);
  } catch (error) {
    next(error);
  }
};
exports.fetchAssetHistory = async (req, res, next) => {
    try {
        const { symbol } = req.params;
        const history = await getHistoricalData(symbol);
        res.json(history);
    } catch (error) {
        next(error);
    }
};