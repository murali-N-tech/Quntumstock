import yfinance as yf
import pandas as pd

def fetch_historical_data(tickers, period="1y"):
    """
    Fetches historical adjusted closing prices for a list of tickers from Yahoo Finance.
    """
    print(f"Fetching historical data for: {tickers}")
    data = yf.download(tickers, period=period, auto_adjust=True)['Close']
    
    # Drop columns with all NaN values (e.g., if a ticker fails to download)
    data.dropna(axis=1, how='all', inplace=True)
    # Forward-fill and then back-fill any remaining NaNs
    data.ffill(inplace=True)
    data.bfill(inplace=True)
    
    if data.empty:
        raise ValueError("Could not download any valid data for the given tickers.")
        
    return data