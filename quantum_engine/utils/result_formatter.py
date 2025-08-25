def format_optimization_result(provider, assets, weights_dict, performance_tuple, raw_result):
    """
    Creates a standardized dictionary from the results of any optimizer.
    """
    expected_return, volatility, sharpe = performance_tuple
    
    formatted_result = {
        "provider": provider,
        "assets": assets,
        "optimal_weights": {asset: round(weight, 4) for asset, weight in weights_dict.items()},
        "performance": {
            "expected_annual_return": round(expected_return, 4),
            "annual_volatility": round(volatility, 4),
            "sharpe_ratio": round(sharpe, 4)
        },
        "raw_optimizer_result": str(raw_result)
    }
    return formatted_result