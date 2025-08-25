import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import InteractiveLineChart from '../components/LineChart';
import QVTCard from '../components/QVTCard';
import { useAuth } from '../context/AuthContext';

const AssetDetailPage = () => {
  const { symbol } = useParams(); // Get the asset symbol from the URL
  const { isAuthenticated } = useAuth();
  const [assetData, setAssetData] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssetData = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        // Fetch quote and history data in parallel for faster loading
        const [quoteRes, historyRes] = await Promise.all([
            api.get(`/screener/stocks/quote/${symbol}`),
            api.get(`/portfolios/history/${symbol}`) // Fetches historical data
        ]);

        setAssetData(quoteRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        setError('Failed to fetch asset details. The asset may not be supported or API limits were reached.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssetData();
  }, [symbol, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Authentication Required</h2>
        <p className="mt-2 text-gray-600">
          Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to view asset details and historical data.
        </p>
      </div>
    );
  }

  if (isLoading) return <p className="text-center">Loading asset details for {symbol}...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!assetData) return <p className="text-center">No data available for this asset.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">{assetData.symbol}</h1>
          {/* In a real app, you'd fetch the full name from another endpoint */}
          <p className="text-gray-500">Live Market Data</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">${assetData.price?.toFixed(2)}</p>
          <p className={`text-lg font-semibold ${assetData.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {assetData.changePercent?.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Price History (1Y)</h2>
          <InteractiveLineChart data={history} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <QVTCard />
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;