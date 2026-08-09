import React, { useState } from "react";
import axios from "axios";
import "./App2.0.css";

const App2 = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendSMS = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/send-sms", { phoneNumber });
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send SMS. Try again later.");
    }
  };

  return (
    <div className="app-container">
      <div className="content">
        <div className="badge-container">
          <span className="badge-new">NEW</span>
          <span className="badge-version ">App 2.0 →</span>
        </div>
        <h1 className="title">
          Free & Open <br />
          <span className="highlight">Stock Market Analytics</span> <br />
          For GenZ
        </h1>
        <p className="description">
          Thousands of traders and investors in India use our <br />
          stable and reliable mobile app regularly.
        </p>
        <h2 className="get">Get early access</h2>
        <div className="early-access">
          
          <input
            type="text"
            placeholder="+91  Enter mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="send-btn" onClick={sendSMS}>📩</button>
        </div>
      </div>
      <div className="image-placeholder"></div>
    </div>
  );
};

export default App2;
