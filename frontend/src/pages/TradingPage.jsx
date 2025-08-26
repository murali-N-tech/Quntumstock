import React, { useState, useEffect } from 'react';
import api from '../services/api';

// A new component to neatly display the market status
const MarketStatusIndicator = ({ status }) => {
  if (!status) return null;

  const { isOpen, t: timestamp } = status;
  const color = isOpen ? 'bg-green-500' : 'bg-red-500';
  const text = isOpen ? 'OPEN' : 'CLOSED';
  const localTime = new Date(timestamp * 1000).toLocaleTimeString();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold">US Market Status</h2>
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full ${color}`}></div>
        <span className="font-bold text-lg">{text}</span>
        <span className="text-sm text-gray-500">(As of {localTime})</span>
      </div>
    </div>
  );
};

const TradingPage = () => {
  const [news, setNews] = useState([]);
  const [marketStatus, setMarketStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch market status and news in parallel for faster loading
        const [statusRes, newsRes] = await Promise.all([
          api.get('/screener/trading/market-status'),
          api.get('/screener/trading/news')
        ]);
        setMarketStatus(statusRes.data);
        setNews(newsRes.data);
      } catch (err) {
        setError('Failed to fetch trading data. The API limit may have been reached.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p className="text-center">Loading latest market data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Trading Dashboard 💹</h1>
      
      {/* New Market Status Component */}
      <MarketStatusIndicator status={marketStatus} />

      <h2 className="text-2xl font-semibold mb-4">Latest Market News</h2>
      <div className="space-y-4">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <p className="text-sm font-semibold text-gray-500">{article.source}</p>
            <h2 className="text-lg font-bold my-1 hover:text-blue-600">{article.headline}</h2>
            <p className="text-sm text-gray-700">{article.summary}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(article.datetime * 1000).toLocaleString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TradingPage;