import React, { useState, useEffect } from 'react';
import api from '../services/api';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/screener/trading/news");
        setNews(response.data);
      } catch (err) {
        setError(
          "Failed to fetch market news. The API limit may have been reached."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (isLoading)
    return (
      <p className="text-center p-8 text-white">
        Loading latest market news...
      </p>
    );
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="bg-quantum-bg text-white min-h-screen p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
        Market News 📰
      </h1>
      <p className="text-gray-400 mb-8 text-center">
        Top general news from the financial world.
      </p>

      <div className="space-y-6 max-w-4xl mx-auto">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg shadow-xl border-2 border-black 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
          >
            <div className="text-black">
              <p className="text-sm font-semibold text-gray-500">
                {article.source}
              </p>
              <h2 className="text-lg font-bold my-1">{article.headline}</h2>
              <p className="text-sm text-gray-700">{article.summary}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(article.datetime * 1000).toLocaleString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;