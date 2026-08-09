import React from "react";
import "./Product1.css"; 

function Product1() {
  return (
    <div className="product-container">

      <section className="hero">
        <div className="hero-text">
          <h1>Best-in-class Technology & Platforms</h1>

          <p className="hero-text-p">
            Our products & services aim to help active traders & investors in
            India gain a winning edge in the stock markets.
          </p>
        </div>

        {/* <div className="hero-image"></div> */}
      </section>


      <section className="portfolio">
        <div className="portfolio-banner">
          <h2>Diversify Your Portfolio Today!</h2>
          <p>
            Start your investment journey with our user-friendly and secure
            investment platforms.
          </p>
        </div>


        <div className="product-cards">
          <div className="product-card">
            <div className="card-icon red"></div>
            <h3>Bluestock IPO</h3>
            <p>Be the first to apply for IPOs and FPOs listed on the NSE and BSE.</p>
          </div>

          <div className="product-card">
            <div className="card-icon blue"></div>
            <h3>Bluestock IPO</h3>
            <p>Be the first to apply for IPOs and FPOs listed on the NSE and BSE.</p>
          </div>

          <div className="product-card">
            <div className="card-icon green"></div>
            <h3>Bluestock IPO</h3>
            <p>Be the first to apply for IPOs and FPOs listed on the NSE and BSE.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product1;
