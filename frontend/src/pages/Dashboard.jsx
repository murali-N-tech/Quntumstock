import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const sections = [
    { name: 'Stocks', path: '/stocks', icon: '📈' },
    { name: 'Crypto', path: '/crypto', icon: '🪙' },
    { name: 'Forex', path: '/forex', icon: '🌍' },
    { name: 'Trading', path: '/trading', icon: '💹' },
    { name: 'Portfolio Optimizer', path: '/portfolio', icon: '✨' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link to={section.path} key={section.name} className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">{section.icon}</div>
            <h2 className="text-xl font-semibold">{section.name}</h2>
            <p className="text-gray-500">Explore {section.name.toLowerCase()} data and tools.</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;