import React from "react";
import "./Second-page.css";

const SecondPage = () => {
  return (
    <div className="second-page">
      <div className="left-section">
        <p className="subtitle">Built for a growing India.</p>
        <div className="highlight-text">
          <h1 className="purple">It’s easy</h1> <br />
          <h1 className="bold">It’s powerful</h1> <br />
          <h1 className="purple">It’s beautiful</h1>
        </div>
      </div>

     
      <div className="right-section">
        <span className="emoji">👍</span>
        <p className="description">
          <span className="">Beautiful UI</span> for the modern trader, <br />
          with access on all platforms, <br />
          to trade <span className="">on the go</span>
        </p>
      </div>
    </div>
  );
};

export default SecondPage;
