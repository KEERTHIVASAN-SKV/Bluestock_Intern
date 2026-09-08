import React from "react";
import "./BrokerCompare.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaChartBar, FaMoneyBill, FaBullhorn, FaShareAlt, FaCheckCircle, FaPercentage, FaFileInvoice } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const brokers = [
  {
    name: "Angel One",
    rating: 4.7,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Angelone_logo.svg/512px-Angelone_logo.svg.png",
    buttonText: "Open Demat Account",
    color: "#FF8C00",
  },
  {
    name: "Zerodha",
    rating: 4.6,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Zerodha_Logo.svg/512px-Zerodha_Logo.svg.png",
    buttonText: "Open Demat Account",
    color: "#387ED1",
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
  ["Account Opening Charges", "₹ 0", "₹ 200"],
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
        {/* Comparison Header — two broker cards with VS in the center */}
        <div className="comparison-header">
          <div className="broker-card">
            <img src={brokers[0].logo} alt={brokers[0].name} className="broker-logo" />
            <h2>{brokers[0].name}</h2>
            <div className="rating">{renderStars(brokers[0].rating)}</div>
            <h3>{brokers[0].rating}</h3>
            <button className="open-account" style={{ backgroundColor: brokers[0].color }}>
              {brokers[0].buttonText}
            </button>
          </div>

          <div className="vs-circle">VS</div>

          <div className="broker-card">
            <img src={brokers[1].logo} alt={brokers[1].name} className="broker-logo" />
            <h2>{brokers[1].name}</h2>
            <div className="rating">{renderStars(brokers[1].rating)}</div>
            <h3>{brokers[1].rating}</h3>
            <button className="open-account" style={{ backgroundColor: brokers[1].color }}>
              {brokers[1].buttonText}
            </button>
          </div>
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
