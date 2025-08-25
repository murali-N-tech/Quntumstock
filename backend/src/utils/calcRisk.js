/**
 * Calculates the portfolio variance.
 * Note: This is a simplified JS version. The authoritative calculation is in the Python service.
 * @param {Array<number>} weights - The weights of the assets in the portfolio.
 * @param {Array<Array<number>>} covMatrix - The covariance matrix of the asset returns.
 * @returns {number} The portfolio variance.
 */
function calculatePortfolioVariance(weights, covMatrix) {
  let variance = 0.0;
  const numAssets = weights.length;

  for (let i = 0; i < numAssets; i++) {
    for (let j = 0; j < numAssets; j++) {
      variance += weights[i] * weights[j] * covMatrix[i][j];
    }
  }
  return variance;
}

module.exports = { calculatePortfolioVariance };