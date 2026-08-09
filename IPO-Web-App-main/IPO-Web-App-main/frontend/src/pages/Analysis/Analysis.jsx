import React from "react";
import "./Analysis.css"; // Import the CSS file

const stockData = new Array(30).fill({
  company: "Apple",
  open: "21,456.00",
  high: "21,465.00",
  low: "21,455.00",
  prevClose: "21,455.00",
  ltp: "21,459.00",
  chng: "73.98",
  pctChng: "4.36",
  volume: "23,89,91,890",
  value: "209.59",
  high52: "21,834.35",
  low52: "16,833.75",
  xchng30: "9.10",
  today: "graph"
});

const AnalyticsTable = () => {
  return (



    <div className="container">
      {/* <header className="header">
        <h1 className="logo">BLUESTOCK</h1>
        <div className="auth-buttons">
          <button className="signin">Sign In</button>
          <button className="signup">Sign Up Now</button>
        </div>
      </header> */}

      <div className="breadcrumb">
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-separator">{">"}</span>
        <span className="breadcrumb-item active">Analytics</span>
      </div>

      <div className="nifty"><h2>NIFTY 50</h2></div>

      <section className="market-info">
        
        <p className="market-status">Today Market has Closed as on 09 Jan 2024 16:00:00 IST</p>
        <p className="green">Advances = 30</p>
        <p className="red">Declines = 20</p>
        <p className="gray">Unchanged = 0</p>
      </section>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {[
                "Company", "OPEN", "HIGH", "LOW", "PREV. CLOSE", "LTE",
                "CHNG", "%CHNG", "VOLUME", "VALUE", "52W H", "52W L", "30 D %CHNG", "TODAY"
              ].map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stockData.map((row, index) => (
              <tr key={index}>
                <td className="company-link">{row.company}</td>
                <td>{row.open}</td>
                <td>{row.high}</td>
                <td>{row.low}</td>
                <td>{row.prevClose}</td>
                <td>{row.ltp}</td>
                <td>{row.chng}</td>
                <td>{row.pctChng}</td>
                <td>{row.volume}</td>
                <td>{row.value}</td>
                <td>{row.high52}</td>
                <td>{row.low52}</td>
                <td>{row.xchng30}</td>
                <td className="graph-link">{row.today}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsTable;
