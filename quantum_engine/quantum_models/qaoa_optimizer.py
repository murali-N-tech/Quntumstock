import numpy as np
from qiskit_algorithms import QAOA
from qiskit_algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_finance.applications.optimization import PortfolioOptimization

def optimize_with_qaoa(mu, sigma, q, budget):
    """
    Solves the portfolio optimization problem using QAOA.
    
    Args:
        mu (pd.Series): Expected returns for each asset.
        sigma (pd.DataFrame): Covariance matrix of assets.
        q (float): Risk aversion factor.
        budget (int): The number of assets to be selected.

    Returns:
        A tuple containing a dictionary of optimal weights and the raw result object.
    """
    num_assets = len(mu)
    
    # Define the portfolio optimization problem
    portfolio = PortfolioOptimization(
        expected_returns=mu.values,
        covariances=sigma.values,
        risk_factor=q,
        budget=budget
    )
    
    # Convert to a quadratic program
    qp = portfolio.to_quadratic_program()
    
    # Set up the QAOA eigensolver
    qaoa_mes = QAOA(sampler=Sampler(), optimizer=COBYLA(), reps=3)
    
    # Use MinimumEigenOptimizer to solve the problem
    optimizer = MinimumEigenOptimizer(qaoa_mes)
    
    result = optimizer.solve(qp)
    
    # Process results
    weights = {mu.index[i]: result.x[i] for i in range(num_assets)}
    
    return weights, result