import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaSearch } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const sampleData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 60 },
  { name: "May", value: 55 },
  { name: "Jun", value: 70 },
];

const MarketGraph = ({ color }) => (
  <ResponsiveContainer width="100%" height={80}>
    <LineChart data={sampleData}>
      <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
      <XAxis dataKey="name" hide />
      <YAxis hide />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
);

const MainHome = () => {
  return (
    <div className="main-container bg-gray-100 p-4 min-h-screen">


      <div className="flex items-center bg-gray-200 p-2 rounded-lg w-full max-w-md mx-auto">
        <FaSearch className="text-gray-500 mr-2" />
        <input type="text" placeholder="Search" className="bg-transparent outline-none w-full" />
      </div>
      
      <h2 className="text-lg font-semibold mt-2 text-center">
        Namaste, <span className="text-indigo-600 font-bold">Sakshi Dahiphale</span>
      </h2>
      <p className="text-gray-500 text-center">Great to have you back.</p>

      <div className="bg-white p-4 mt-4 shadow-md rounded-lg w-full max-w-3xl mx-auto">
        <h3 className="text-xl font-bold flex items-center">
          <FiTrendingUp className="mr-2" /> Market Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {["SENSEX", "NIFTY50", "BANK NIFTY", "NIFTY IT"].map((market, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded-lg text-center">
              <h4 className="text-sm font-semibold">{market}</h4>
              <p className="text-lg font-bold text-red-600">71315</p>
              <p className="text-xs text-red-500">-0.24%</p>
              <MarketGraph color={idx % 2 === 0 ? "red" : "green"} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-purple-600 text-white p-4 rounded-lg mt-4 flex justify-between items-center max-w-3xl mx-auto">
        <div>
          <p className="text-sm">Updated on: 2024-01-01</p>
          <h3 className="text-lg font-bold">Greed</h3>
        </div>
        <button className="bg-white text-purple-600 px-3 py-1 rounded-full">→</button>
      </div>

      <div className="mt-4 max-w-3xl mx-auto">
        <h3 className="text-lg font-bold"># BLUE CHIP STOCKS</h3>
        <p className="text-gray-500">Top NSE Bluechip Stocks</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          {["HDFC BANK", "RELIANCE IND", "ICICI BANK"].map((stock, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg shadow-md text-center">
              <h4 className="text-sm font-semibold">{stock}</h4>
              <p className="text-lg font-bold">₹ {Math.floor(Math.random() * 3000) + 1000}</p>
              <p className="text-xs text-green-500">+0.{idx + 65}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 mt-4 shadow-md rounded-lg text-center max-w-3xl mx-auto">
        <h3 className="text-lg font-bold">Learn With Stock School!</h3>
        <p className="text-gray-500">Unlocking the secrets of <span className="text-blue-600 font-semibold">Technical Analysis</span></p>
        <img src="/stock_school_chart.png" alt="Stock School" className="mt-2 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default MainHome;
