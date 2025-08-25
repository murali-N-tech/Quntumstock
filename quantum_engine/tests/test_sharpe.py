import unittest
import numpy as np
import pandas as pd
from sharpe_ratio import calculate_portfolio_performance

class TestSharpeRatio(unittest.TestCase):

    def setUp(self):
        """Set up some mock data for testing."""
        self.mu = pd.Series([0.001, 0.002], index=['A', 'B'])
        self.sigma = pd.DataFrame([[0.0001, 0.00005], [0.00005, 0.0002]], index=['A', 'B'], columns=['A', 'B'])
        self.weights = {'A': 0.5, 'B': 0.5}

    def test_calculation(self):
        """Test a simple sharpe ratio calculation."""
        expected_return, volatility, sharpe = calculate_portfolio_performance(
            self.weights, self.mu, self.sigma
        )
        
        # Test if the results are of the correct type and are positive
        self.assertIsInstance(expected_return, float)
        self.assertIsInstance(volatility, float)
        self.assertIsInstance(sharpe, float)
        self.assertGreater(volatility, 0)
        
        # You could add a more precise check if you calculate the expected value by hand
        # For this setup, expected return is approx 0.378 and sharpe is approx 2.0
        self.assertAlmostEqual(expected_return, 0.378, places=3)
        self.assertAlmostEqual(sharpe, 2.01, places=2)

if __name__ == '__main__':
    unittest.main()