import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// A set of distinct colors for the chart lines
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
  '#FF1919', '#19B2FF', '#FF5733', '#C70039', '#900C3F'
];

const MultiLineChart = ({ data, assets }) => {
  if (!data || data.length === 0 || !assets || assets.length === 0) {
    return <div className="text-center p-4">No historical data to display.</div>;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(tick) => `${tick}%`}
            label={{ value: 'Performance (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          {assets.map((asset, index) => (
            <Line
              key={asset}
              type="monotone"
              dataKey={asset}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiLineChart;