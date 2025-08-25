import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CryptoPage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopCryptos = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/screener/crypto/top');
        setCryptos(response.data);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopCryptos();
  }, []);

  if (isLoading) return <p>Loading top cryptocurrencies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Top 100 Cryptocurrencies</h1>
      <p className="text-gray-600 mb-6">Ranked by market capitalization.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cryptos.map(crypto => (
          <div key={crypto.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <img src={crypto.image} alt={crypto.name} className="w-8 h-8 mr-3"/>
              <div>
                <h2 className="font-bold">{crypto.name}</h2>
                <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
              </div>
            </div>
            <p className="text-xl font-semibold">${crypto.price.toLocaleString()}</p>
            <p className={`text-sm ${crypto.changePercent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {crypto.changePercent24h.toFixed(2)}% (24h)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;