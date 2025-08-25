import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const StocksPage = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularStocks = async () => {
      const popularSymbols = 'AAPL,MSFT,GOOGL,AMZN,NVDA,TSLA,META,JPM,V,JNJ,UNH,XOM';
      
      try {
        const response = await api.get(`/screener/stocks/quotes?symbols=${popularSymbols}`);
        // Filter out any stocks that might have incomplete data from the API
        setStocks(response.data.filter(stock => stock && stock.price && stock.symbol));
      } catch (err) {
        setError('Failed to fetch stock data. Please check your API key or try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularStocks();
  }, []);

  if (isLoading) return <p className="text-center p-8">Loading popular stocks...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Popular Stocks 📈</h1>
      <p className="text-gray-600 mb-6">Real-time quotes powered by Twelve Data.</p>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Symbol</th>
              <th className="p-4 hidden sm:table-cell">Company Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Change (%)</th>
              <th className="p-4 hidden md:table-cell">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono font-semibold">
                  <Link to={`/asset/${stock.symbol}`} className="text-blue-600 hover:underline">
                    {stock.symbol}
                  </Link>
                </td>
                <td className="p-4 hidden sm:table-cell">{stock.name || 'N/A'}</td>
                
                {/* CORRECTED: Check for price before calling toFixed */}
                <td className="p-4 font-semibold">
                  {stock.price ? `$${stock.price.toFixed(2)}` : 'N/A'}
                </td>
                
                {/* CORRECTED: Check for changePercent before calling toFixed */}
                <td className={`p-4 font-semibold ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.changePercent ? `${stock.changePercent.toFixed(2)}%` : 'N/A'}
                </td>

                <td className="p-4 hidden md:table-cell">
                  {stock.volume ? stock.volume.toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StocksPage;