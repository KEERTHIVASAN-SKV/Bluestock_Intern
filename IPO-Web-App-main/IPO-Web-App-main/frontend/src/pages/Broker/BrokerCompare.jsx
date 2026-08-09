import React from "react";
import "./BrokerCompare.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaChartBar, FaMoneyBill, FaBullhorn, FaShareAlt, FaCheckCircle, FaPercentage, FaFileInvoice } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const brokers = [
  {
    name: "Angel One",
    rating: 4.7,
    logo: "/angelone-logo.png",
    buttonText: "Open Demat Account",
    color: "#16a34a",
  },
  {
    name: "Zerodha",
    rating: 4.6,
    logo: "/zerodha-logo.png",
    buttonText: "Open Demat Account",
    color: "#16a34a",
  },
];

const menuItems = [
  { icon: <FaChartBar />, text: "Active Clients" },
  { icon: <FaMoneyBill />, text: "Charges" },
  { icon: <FaBullhorn />, text: "Complaints" },
  { icon: <FaShareAlt />, text: "Share Holding" },
  { icon: <FaCheckCircle />, text: "Pros & Cons" },
  { icon: <FaPercentage />, text: "Ratings" },
  { icon: <FaFileInvoice />, text: "Financials" },
];

const data = [
  { year: "2016-17", angel: 1, zerodha: 1 },
  { year: "2017-18", angel: 2, zerodha: 3 },
  { year: "2018-19", angel: 5, zerodha: 7 },
  { year: "2019-20", angel: 10, zerodha: 20 },
  { year: "2020-21", angel: 20, zerodha: 50 },
  { year: "2021-22", angel: 35, zerodha: 70 },
  { year: "2022-23", angel: 50, zerodha: 75 },
  { year: "2023-24", angel: 60, zerodha: 80 },
];

const accountCharges = [
  ["Account Opening Charges", "0", "200"],
  ["Account Maintenance Charges", "₹ 240 for first year, then ₹ 23.6/Month", "₹ 300 per year"],
];

const brokerageCharges = [
  ["Intraday", "₹ 20 or 0.25% (Whichever is lower)", "₹ 20 or 0.03% / executed order (Whichever is lower)"],
  ["Futures", "₹ 20 or 0.25% (Whichever is lower)", "₹ 20 or 0.03% / executed order (Whichever is lower)"],
  ["Options", "₹ 20 or 0.25% (Whichever is lower)", "₹ 20 per executed order (on Turnover)"],
  ["Delivery", "Zero", "Zero"],
];

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="star-icon" />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} className="star-icon" />);
    } else {
      stars.push(<FaRegStar key={i} className="star-icon" />);
    }
  }
  return stars;
};

const Table = ({ headers, data }) => (
  <table className="custom-table">
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} className={index === 0 ? "highlight" : ""}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const BrokerCompare = () => {
  return (

    
    <div className="broker-compare-container">
      <div className="side-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.icon} <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">


        <div className="comparison-header">
          {brokers.map((broker, index) => (
            <div key={index} className="broker-card">
              <img src={broker.logo} alt={broker.name} className="broker-logo" />
              <h2>{broker.name}</h2>
              <div className="rating">{renderStars(broker.rating)}</div>
              <h3>{broker.rating}</h3>
              <button className="open-account">{broker.buttonText}</button>
            </div>
          ))}
          <div className="vs-circle">VS</div>
        </div>

        <h2>Active Clients</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="angel" stroke="#FF8C00" name="Angel One" />
              <Line type="monotone" dataKey="zerodha" stroke="#2563EB" name="Zerodha" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h2>Account Opening and Maintenance Charges</h2>
        <Table data={accountCharges} headers={["Charges", "Angel One", "Zerodha"]} />

        <h2>Brokerage Charges</h2>
        <Table data={brokerageCharges} headers={["Brokerage Charges", "Angel One", "Zerodha"]} />
      </div>
    </div>
  );
};

export default BrokerCompare;
