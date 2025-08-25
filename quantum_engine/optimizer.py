from utils.data_preprocessor import fetch_historical_data
from quantum_models.qaoa_optimizer import optimize_with_qaoa
from sharpe_ratio import calculate_portfolio_performance

def run_optimization(assets):
    """
    Main function to run the entire optimization pipeline.
    """
    # 1. Fetch and preprocess data
    try:
        data = fetch_historical_data(assets)
        # mu = expected returns, sigma = covariance matrix
        mu = data.pct_change().mean()
        sigma = data.pct_change().cov()
    except Exception as e:
        raise ConnectionError(f"Failed to fetch market data: {e}")

    # 2. Run Quantum Optimization (QAOA)
    # This is the core quantum part
    try:
        qaoa_weights, qaoa_result = optimize_with_qaoa(mu, sigma, q=0.5, budget=len(assets) // 2)
    except Exception as e:
        raise RuntimeError(f"QAOA optimization failed: {e}")
        
    # 3. Calculate performance metrics for the result
    expected_return, volatility, sharpe = calculate_portfolio_performance(qaoa_weights, mu, sigma)

    # 4. Format and return the final result
    formatted_result = {
        "provider": "Quantum QAOA Optimizer",
        "assets": assets,
        "optimal_weights": {asset: round(weight, 4) for asset, weight in qaoa_weights.items()},
        "performance": {
            "expected_annual_return": round(expected_return, 4),
            "annual_volatility": round(volatility, 4),
            "sharpe_ratio": round(sharpe, 4)
        },
        "raw_qaoa_result": str(qaoa_result)
    }

    return formatted_result