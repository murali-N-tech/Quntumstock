from flask import Flask, request, jsonify
from flask_cors import CORS
from optimizer import run_optimization
from utils.data_preprocessor import fetch_historical_data

app = Flask(__name__)
CORS(app)

@app.route('/health-check', methods=['GET'])
def health_check():
    """Endpoint to verify that the service is running."""
    return jsonify({"status": "Quantum Engine is alive and running!"}), 200

@app.route('/optimize', methods=['POST'])
def optimize_portfolio():
    """
    Endpoint to run the portfolio optimization.
    Expects a JSON payload with a list of asset tickers.
    e.g., {"assets": ["AAPL", "GOOG", "MSFT", "AMZN"]}
    """
    data = request.get_json()
    if not data or 'assets' not in data:
        return jsonify({"error": "Missing 'assets' in request body"}), 400

    assets = data['assets']
    if len(assets) < 2:
        return jsonify({"error": "At least 2 assets are required for optimization"}), 400

    try:
        # Run the full optimization pipeline
        result = run_optimization(assets)
        return jsonify(result), 200
    except Exception as e:
        print(f"An error occurred during optimization: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/screener/trending', methods=['GET'])
def get_trending_stocks():
    """A simple screener to get trending US stocks."""
    try:
        # Using a hardcoded list of popular tickers as a basic screener
        tickers = ["AAPL", "MSFT", "GOOG", "AMZN", "NVDA", "TSLA", "META", "JPM", "V", "JNJ"]
        data = yf.download(tickers, period="1d", auto_adjust=True)
        
        # Get the latest price and other info
        info = {ticker: yf.Ticker(ticker).info for ticker in tickers}
        
        results = []
        for ticker in tickers:
            results.append({
                "ticker": ticker,
                "companyName": info[ticker].get('shortName', 'N/A'),
                "price": info[ticker].get('currentPrice', 0),
                "change": info[ticker].get('regularMarketChange', 0),
                "percentChange": info[ticker].get('regularMarketChangePercent', 0) * 100,
                "marketCap": info[ticker].get('marketCap', 0),
            })
            
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/history', methods=['POST'])
def get_history():
    data = request.get_json()
    if not data or 'asset' not in data:
        return jsonify({"error": "Missing 'asset' in request body"}), 400
    
    try:
        # Fetch 1 year of historical data
        hist_data = fetch_historical_data([data['asset']], period="1y")
        # Format for frontend charting libraries
        hist_data.reset_index(inplace=True)
        hist_data.rename(columns={'Date': 'date', data['asset']: 'price'}, inplace=True)
        hist_data['date'] = hist_data['date'].dt.strftime('%Y-%m-%d')
        
        return jsonify(hist_data.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)