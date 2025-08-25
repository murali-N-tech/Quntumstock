import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19B2FF'];

const PortfolioPieChart = ({ data }) => {
  if (!data) return null;

  const chartData = Object.keys(data)
    .map(key => ({ name: key, value: data[key] }))
    .filter(item => item.value > 0); // Only show assets with weight > 0

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PortfolioPieChart;