import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TradingPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/screener/trading/news');
        setNews(response.data);
      } catch (err) {
        setError('Failed to fetch market news. The API limit may have been reached.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (isLoading) return <p className="text-center">Loading latest market news...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Market News 💹</h1>
      <p className="text-gray-600 mb-6">Top general news from the financial world.</p>
      
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
            <h2 className="text-lg font-bold my-1">{article.headline}</h2>
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