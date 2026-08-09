import React from "react";
import "./ipo2.css";

const IPO2 = () => {
  return (
    <div className="ipo2-container">
      <div className="ipo2-card">
        <div className="display-flex">
          <img
            src="https://th.bing.com/th/id/OIP.fzMBMaB-5q2MLmGM_MCZUQHaHa?w=150&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="Bluestock Logo"
            className="ipo2-logo"
          />
          <h2 className="ipo2-title">BLUESTOCK</h2>
        </div>
        <h3 className="ipo2-subtitle">Applying for this IPO?</h3>
        <p className="ipo2-text">
          The way you compare & invest in only the best IPO, let us help you get started by
          comparing and selecting the best Demat account. Open your Demat account now to
          apply for your favourite IPO.
        </p>
        <button className="ipo2-btn">Open a Demat Account</button>
      </div>
    </div>
  );
};

export default IPO2;
