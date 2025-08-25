import numpy as np

def calculate_portfolio_performance(weights_dict, mu, sigma, risk_free_rate=0.02):
    """
    Calculate performance metrics for a given portfolio.
    """
    weights = np.array(list(weights_dict.values()))
    
    # Annualize returns (assuming 252 trading days)
    expected_return = np.sum(mu * weights) * 252
    
    # Annualize volatility
    portfolio_variance = np.dot(weights.T, np.dot(sigma * 252, weights))
    portfolio_volatility = np.sqrt(portfolio_variance)
    
    # Calculate Sharpe Ratio
    sharpe_ratio = (expected_return - risk_free_rate) / portfolio_volatility
    
    return expected_return, portfolio_volatility, sharpe_ratio