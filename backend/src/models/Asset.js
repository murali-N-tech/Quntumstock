const mongoose = require('mongoose');

// This schema can be a sub-document within the Portfolio
const AssetSchema = new mongoose.Schema({
  ticker: { type: String, required: true }, // e.g., 'AAPL', 'BTC-USD', 'EURUSD=X'
  assetType: { type: String, required: true, enum: ['Stock', 'Crypto', 'Forex', 'Derivative'] },
  quantity: { type: Number, default: 0 },
  initialPrice: { type: Number, default: 0 }
});

module.exports = AssetSchema; // Export schema, not model