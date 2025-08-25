from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_finance.applications.optimization import PortfolioOptimization

def optimize_with_exact_solver(mu, sigma, q, budget):
    """
    Solves the portfolio optimization problem exactly using a classical eigensolver.
    This provides the true optimal solution for the QUBO problem to benchmark QAOA against.
    """
    # Define the portfolio optimization problem
    portfolio = PortfolioOptimization(
        expected_returns=mu.values,
        covariances=sigma.values,
        risk_factor=q,
        budget=budget
    )
    
    # Convert to a quadratic program
    qp = portfolio.to_quadratic_program()
    
    # Use the default NumPyMinimumEigensolver
    exact_optimizer = MinimumEigenOptimizer()
    
    result = exact_optimizer.solve(qp)
    
    num_assets = len(mu)
    weights = {mu.index[i]: result.x[i] for i in range(num_assets)}
    
    return weights, result