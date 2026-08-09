import React from "react";
import "./BrokerCompare1.css";
import { FaChartLine } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const brokerageData = [
  { charge: 23.6, label: "Auto Square Off" },
  { charge: 20, label: "Call & Trade" },
  { charge: 15.34, label: "DP Charges" },
];

const complaintsData = [
  { year: "2018", angel: 10, zerodha: 8 },
  { year: "2019", angel: 15, zerodha: 12 },
  { year: "2020", angel: 20, zerodha: 18 },
  { year: "2021", angel: 25, zerodha: 22 },
  { year: "2022", angel: 30, zerodha: 28 },
  { year: "2023", angel: 35, zerodha: 32 },
];

const BrokerCompare1 = () => {
  return (
    <div className="brokerage-container">
      <h2>Brokerage Charges</h2>

      <div className="brokerage-charges">
        {brokerageData.map((item, index) => (
          <div className="brokerage-row" key={index}>
            <div className="broker-card">
              <img src="/angelone-logo.png" alt="Angel One" className="broker-logo" />
              <h3>{item.charge}</h3>
            </div>
            <p>{item.label}</p>
            <div className="broker-card">
              <img src="/zerodha-logo.png" alt="Zerodha" className="broker-logo" />
              <h3>{(item.charge * 2.5).toFixed(2)}</h3> {/* Example multiplier */}
            </div>
          </div>
        ))}
      </div>

      <h2>Complaints</h2>
      <div className="complaints-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={complaintsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="angel" stroke="#8884d8" name="Angel One" />
            <Line type="monotone" dataKey="zerodha" stroke="#82ca9d" name="Zerodha" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BrokerCompare1;
