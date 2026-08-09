import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className="card-container">
      <p className="para-1">Power pocked with everything you need.</p>
      <h2 className="card-title">Bluestock Highlights</h2>
      <p className="card-subtitle">
        Simplified enough for beginners, Detailed enough for experts. Track
        upcoming IPOs, Leverage advanced tools to make the best decisions.
      </p>

      <div className="card-sections">
        <div className="card card1">
          <h3 className="card-header">Learn Chart ✒️</h3>
          <ul>
            <li>1️⃣ Technical, Fundamental</li>
            <li>2️⃣ Finology, Facts, Equity</li>
            <li>3️⃣ Trading Psychology</li>
            <li>4️⃣ Risk Assessment</li>
            <li>5️⃣ Option Trading</li>
          </ul>
        </div>

        <div className="card card2">
          <h3 className="card-header">Analytics ✈️</h3>
          <ul>
            <li>1️⃣ Live Sector Trend</li>
            <li>2️⃣ IPO DRHP</li>
            <li>3️⃣ Sectoral Distribution</li>
            <li>4️⃣ Stock Overview</li>
            <li>5️⃣ TradingView Chart</li>
            <li>6️⃣ Technical, Fundamental</li>
          </ul>
        </div>

        <div className="card card3">
          <h3 className="card-header">Club ⚡</h3>
          <ul>
            <li>1️⃣ Educational Resources</li>
            <li>2️⃣ Real-time Chat</li>
            <li>3️⃣ Forums</li>
          </ul>
        </div>
      </div>
      <div className="bluestock-2">
        <div className="card-info">
          <h3>Why do traders love bluestock?</h3>
          <p>
            Bluestock caters to traders looking to enhance their technical analysis
            skills, providing a user-friendly environment to interpret and leverage
            charts effectively for strategic decision-making in the financial
            markets.
          </p>
        </div>

        

        <div className="card-icons">
          <div className="icon">
            <img
              className="image1"
              src="https://th.bing.com/th/id/OIP.6fc8t1QdKH_xEVVsje_ACgHaHa?w=182&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Analytics"
            />
            Analytics
          </div>
          <div className="icon">
            <img
              className="image1"
              src="https://th.bing.com/th/id/OIP.7NooM6IK6pbE6f9waEId8gAAAA?w=176&h=141&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Blogs"
            />
            Blogs
          </div>
          <div className="icon">
            <img
              className="image1"
              src="https://th.bing.com/th/id/OIP.DF9Fmog32oITMuAZ0DFvLQHaHa?w=192&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Videos"
            />
            Videos
          </div>
          <div className="card-footer">
            <h3>All things finance, right here</h3>
            <p>
              Master the art of investing and secure your financial future with
              Bluestock learning resources.
            </p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Card;