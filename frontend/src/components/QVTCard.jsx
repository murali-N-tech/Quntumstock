import React from 'react';

// The scores (0-100) would be calculated on your backend
const QVTCard = ({ scores = { quality: 85, valuation: 60, trend: 75 } }) => {
  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">QVT Analysis</h3>
      <div className="space-y-4">
        {Object.entries(scores).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-gray-700 capitalize">{key}</span>
              <span className={`text-sm font-medium ${getScoreColor(value).replace('bg','text')}-700`}>{value} / 100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${getScoreColor(value)} h-2.5 rounded-full`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add this line to fix the error
export default QVTCard;