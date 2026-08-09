import React from "react";
import "./Product2.css"; 

function Product2() {
  return (
    <div className="product2-container">

      <section className="network-section">
        <div className="network-banner">
          <h2>Grow Your Network and Learn the Stock Market</h2>
          <p>
            Our community-based approach encourages you to learn from experts
            and peers while expanding your connections.
          </p>
        </div>

        <div className="product-cards">
          <div className="product-card">
            <div className="card-icon purple"></div>
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

      <section className="platform-section">
        <div className="platform-banner">
          <h2>Make your platform more powerful</h2>
          <p>
            Integrate with our in-house trading platform and build your own
            customized trading applications.
          </p>
        </div>

        <div className="product-cards">
          <div className="product-card">
            <div className="card-icon purple"></div>
            <h3>Bluestock API</h3>
            <p>Be the first to apply for IPOs and FPOs listed on the NSE and BSE.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product2;
