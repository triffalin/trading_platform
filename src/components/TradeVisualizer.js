import React from 'react';
import { LineChart, Line } from 'recharts';

const TradeVisualizer = ({ trades }) => {
  return (
    <div>
      <h2>Trade Visualizer</h2>
      <LineChart width={400} height={400} data={trades}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default TradeVisualizer;
