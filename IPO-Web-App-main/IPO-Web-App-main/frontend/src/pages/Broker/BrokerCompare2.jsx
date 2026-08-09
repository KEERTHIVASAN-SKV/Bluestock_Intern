import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data1 = [
  { name: "Angel One", Retail: 42, Institutional: 26, Foreign: 8, Others: 6, Government: 5, Promoters: 2 },
];

const data2 = [
  { name: "Zerodha", Retail: 30, Institutional: 28, Foreign: 26, Others: 10, Government: 2, Promoters: 1 },
];

const colors = ["#FF7F50", "#4682B4", "#32CD32", "#FFD700", "#8A2BE2", "#FF4500"];

const ShareHoldingChart = ({ data }) => (
  <div className="chart-container">
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" tick={{ fill: "#333", fontSize: 14, fontWeight: "bold" }} />
        <YAxis tick={{ fill: "#333", fontSize: 12 }} />
        <Tooltip cursor={{ fill: "#f5f5f5" }} />
        <Legend />
        {Object.keys(data[0]).slice(1).map((key, index) => (
          <Bar key={key} dataKey={key} fill={colors[index]} radius={[5, 5, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const BrokerCompare2 = () => {
  return (
    <div className="container">
      <h2>Share Holding</h2>
      <ShareHoldingChart data={data1} />
      <ShareHoldingChart data={data2} />
    </div>
  );
};

export default BrokerCompare2;
