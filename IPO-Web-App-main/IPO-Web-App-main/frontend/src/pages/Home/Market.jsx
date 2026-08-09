import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Market.css";

const Market = () => {
  const [activeTab, setActiveTab] = useState("NSE");  // (You can add BSE logic later if needed)
  const [highStocks, setHighStocks] = useState([]);
  const [lowStocks, setLowStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/stock/");  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log("API Data:", data);

        if ((!data.highs || data.highs.length === 0) && (!data.lows || data.lows.length === 0)) {
          throw new Error("Empty data");
        }

        setHighStocks(data.highs || []);
        setLowStocks(data.lows || []);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="market-movers"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Market Movers</h1>
      <p>Live updates of 52 Week Highs and Lows from the Indian stock market.</p>

      {loading ? (
        <p>Loading market data...</p>
      ) : (!highStocks.length && !lowStocks.length) ? (
        <p>No stock data available at the moment. Please try again later.</p>
      ) : (
        <div className="market-tables">
          {/* High Movers Table */}
          {highStocks.length > 0 && (
            <motion.div
              className="market-table"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="table-header">
                <h3>📈 52 Week High</h3>
                <div className="tabs">
                  <span
                    className={activeTab === "NSE" ? "active" : ""}
                    onClick={() => setActiveTab("NSE")}
                  >
                    NSE
                  </span>
                  <span
                    className={activeTab === "BSE" ? "active" : ""}
                    onClick={() => setActiveTab("BSE")}
                  >
                    BSE
                  </span>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>STOCK NAME</th>
                    <th>LAST TRADED PRICE Rs.</th>
                    <th>DAY HIGH Rs.</th>
                  </tr>
                </thead>
                <tbody>
                  {highStocks.map((stock, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td>{stock.stock_name || stock.stock_code}</td>
                      <td>{stock.last_price}</td>
                      <td>{stock.day_high}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Low Movers Table */}
          {lowStocks.length > 0 && (
            <motion.div
              className="market-table"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="table-header">
                <h3>📉 52 Week Low</h3>
                <div className="tabs">
                  <span
                    className={activeTab === "NSE" ? "active" : ""}
                    onClick={() => setActiveTab("NSE")}
                  >
                    NSE
                  </span>
                  <span
                    className={activeTab === "BSE" ? "active" : ""}
                    onClick={() => setActiveTab("BSE")}
                  >
                    BSE
                  </span>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>STOCK NAME</th>
                    <th>LAST TRADED PRICE Rs.</th>
                    <th>DAY HIGH Rs.</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStocks.map((stock, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td>{stock.stock_name}</td>
                      <td>{stock.last_price}</td>
                      <td>{stock.day_high}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Market;
