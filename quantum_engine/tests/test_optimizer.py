import unittest
from unittest.mock import patch, MagicMock
from optimizer import run_optimization

class TestOptimizer(unittest.TestCase):

    @patch('optimizer.fetch_historical_data')
    @patch('optimizer.optimize_with_qaoa')
    def test_run_optimization_pipeline(self, mock_qaoa, mock_fetch_data):
        """
        Test the main optimization pipeline with mocked external calls.
        """
        # Mock the return values of external functions
        mock_fetch_data.return_value = MagicMock() # Return a mock DataFrame
        mock_qaoa.return_value = ({'AAPL': 1.0, 'GOOG': 0.0}, "Mock QAOA Result")

        # Mock the pandas calculations
        with patch('pandas.DataFrame.pct_change') as mock_pct:
            mock_pct.return_value.mean.return_value = MagicMock()
            mock_pct.return_value.cov.return_value = MagicMock()
            
            assets = ['AAPL', 'GOOG']
            result = run_optimization(assets)

            # Assert that our mocked functions were called
            mock_fetch_data.assert_called_once_with(assets)
            mock_qaoa.assert_called_once()
            
            # Assert the structure of the final output
            self.assertIn('provider', result)
            self.assertIn('optimal_weights', result)
            self.assertEqual(result['provider'], 'Quantum QAOA Optimizer')
            self.assertEqual(result['optimal_weights']['AAPL'], 1.0)


if __name__ == '__main__':
    unittest.main()