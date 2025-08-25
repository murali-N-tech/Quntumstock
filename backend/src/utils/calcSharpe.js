/**
 * Calculates the Sharpe ratio.
 * Note: This is a simplified JS version. The authoritative calculation is in the Python service.
 * @param {number} expectedReturn - The expected return of the portfolio.
 * @param {number} portfolioVolatility - The standard deviation (volatility) of the portfolio.
 * @param {number} riskFreeRate - The risk-free rate.
 * @returns {number} The Sharpe ratio.
 */
function calculateSharpeRatio(expectedReturn, portfolioVolatility, riskFreeRate = 0.02) {
  if (portfolioVolatility === 0) {
    return 0;
  }
  return (expectedReturn - riskFreeRate) / portfolioVolatility;
}

module.exports = { calculateSharpeRatio };