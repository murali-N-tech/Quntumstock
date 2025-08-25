import numpy as np
import pandas as pd
from scipy.optimize import minimize

def optimize_with_classical(mu, sigma, budget):
    """
    Solves the portfolio optimization problem using a classical Scipy optimizer.
    This aims for maximum Sharpe ratio.
    """
    num_assets = len(mu)

    def get_portfolio_performance(weights):
        # Using negative Sharpe ratio because the optimizer finds a minimum
        portfolio_return = np.sum(mu * weights) * 252
        portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(sigma * 252, weights)))
        sharpe_ratio = (portfolio_return - 0.02) / portfolio_volatility
        return -sharpe_ratio

    # Constraint: sum of weights is 1
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
    # Bounds: each weight is between 0 and 1
    bounds = tuple((0, 1) for _ in range(num_assets))
    # Initial guess: equal weights
    initial_guess = num_assets * [1. / num_assets,]

    result = minimize(
        fun=get_portfolio_performance,
        x0=initial_guess,
        method='SLSQP',
        bounds=bounds,
        constraints=constraints
    )
    
    weights = {mu.index[i]: result.x[i] for i in range(num_assets)}
    return weights, result