import React from "react";
import "./Broker.css";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUser, FaUsers, FaInfoCircle } from "react-icons/fa";

const brokers = [
  {
    name: "Upstox",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://ts1.mm.bing.net/th?id=OIP.z7E4n3TZw0k71dnIJvHdwQAAAA&pid=15.1",
    rating: 4.5,
    color: "#eef4ff",
  },
  {
    name: "AngelOne",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th/id/OIP.dFk-omU-lyzOGZ2z4Me6QAHaHa?w=160&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 4.5,
    color: "#fef3c7",
  },
  {
    name: "Groww",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th/id/OIP.N5o_bMLmAcIfeCZN4sLc7wAAAA?w=176&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 4.5,
    color: "#fef3c7",
  },

  {
    name: "Dhan",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th?q=Dhan+Logo.png&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    rating: 4.5,
    color: "#fef3c7",
  },

  {
    name: "Alice Blue",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th/id/OIP.1Ke509jFvVsnDLMmQ2ymawAAAA?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 4.5,
    color: "#fef3c7",
  },

  {
    name: "Fyers",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th/id/OIP.pIMFH-qczugvnItBAEmnkQHaE8?w=252&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 4.5,
    color: "#fef3c7",
  },

  {
    name: "Axis direct",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th/id/OIP.QmuBIgyoW4SDCoOoYZxIyQHaE2?w=206&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 4.5,
    color: "#fef3c7",
  },

  {
    name: "Geojit",
    reviews: "15K",
    accounts: "50.2K",
    logo: "https://th.bing.com/th/id/OIP.3fCHPOyYG2sNsVVY1cMCMwAAAA?w=212&h=106&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 4.5,
    color: "#fef3c7",
  },

];

const Broker = () => {
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

  return (
    <div className="broker-details-container">
      <h1 className="page-title">
        Made <span>to</span>Trade
      </h1>
      {brokers.map((broker, index) => (
        <div
          key={index}
          className="broker-details-card"
          style={{ backgroundColor: broker.color }}
        >

          <div className="flex-1">
            <div className="broker-info">
              <h2>{broker.name}</h2>
              <div className="rating">{renderStars(broker.rating)}</div>
              <p>
                <FaUser /> {broker.reviews} Reviews
              </p>
              <p>
                <FaUsers /> {broker.accounts} Accounts
              </p>
              <p className="free-account">Open Demat A/c for FREE</p>
              <div className="buttons">
                <button className="open-account">Open A/C 🚀</button>
                <button className="learn-more">
                  <a href="/BrokerCompare">Learn More</a></button>
              </div>
            </div>
            <div className="broker-services">
              <p>✅ Equity</p>
              <p>✅ Commodity</p>
              <p>✅ Currency</p>
              <p>✅ Futures</p>
              <p>✅ Options</p>
            </div>
            <div className="broker-charges">
              <p>
                <strong>A/C Opening Charge</strong> <br /> ₹ Rs. 0
              </p>
              <p>
                <strong>Maintenance Charge</strong> <FaInfoCircle /> <br /> ₹300
              </p>
              <p>
                <strong>Delivery Brokerage</strong> <FaInfoCircle /> <br /> ₹20
              </p>
              <p>
                <strong>Intraday Brokerage</strong> <FaInfoCircle /> <br /> ₹20
              </p>
            </div>
            <div className="broker-logo">
              <img src={broker.logo} alt={broker.name} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Broker;
