import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ratings = [
  {
    logo: "📈", 
    name: "Angel One",
    rating: 4.7,
    trust: 5,
    ease: 4,
    tech: 4,
  },
  {
    logo: "📊",
    name: "Zerodha",
    rating: 4.6,
    trust: 5,
    ease: 5,
    tech: 5,
  },
];

const financialData = {
  labels: ["Revenue", "Profit/Loss"],
  datasets: [
    {
      label: "Angel One - 2020-21",
      data: [500, 100],
      backgroundColor: "rgba(255, 165, 0, 0.6)",
    },
    {
      label: "Zerodha - 2020-21",
      data: [800, 200],
      backgroundColor: "rgba(30, 144, 255, 0.6)",
    },
    {
      label: "Angel One - 2021-22",
      data: [2000, 400],
      backgroundColor: "rgba(255, 165, 0, 0.8)",
    },
    {
      label: "Zerodha - 2021-22",
      data: [4500, 1200],
      backgroundColor: "rgba(30, 144, 255, 0.8)",
    },
  ],
};

const BrokerCompare4 = () => {
  return (
    <div style={styles.container}>


      <h2 style={styles.heading}>Ratings</h2>
      <div style={styles.ratingsContainer}>
        {ratings.map((broker, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.logo}>{broker.logo}</div>
            <h3 style={styles.brokerName}>{broker.name}</h3>
            <p style={styles.rating}>{broker.rating}</p>
            <div style={styles.stars}>
              {Array(Math.floor(broker.rating))
                .fill()
                .map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} style={styles.star} />
                ))}
              {broker.rating % 1 !== 0 && (
                <FontAwesomeIcon icon={faStarHalfAlt} style={styles.star} />
              )}
            </div>
            <p>Trust Factor: {"⭐".repeat(broker.trust)}</p>
            <p>Ease of Use: {"⭐".repeat(broker.ease)}</p>
            <p>Technology: {"⭐".repeat(broker.tech)}</p>
            <button style={styles.button}>Open Demat Account</button>
          </div>
        ))}
      </div>

      <h2 style={styles.heading}>Financials</h2>
      <div style={styles.chartContainer}>
        <Bar data={financialData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

// CSS 
const styles = {
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  ratingsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    width: "100%",
    maxWidth: "280px",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  brokerName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  rating: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  stars: {
    marginBottom: "10px",
  },
  star: {
    color: "#FFD700",
    marginRight: "5px",
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
  },
  chartContainer: {
    width: "100%",
    height: "400px",
    padding: "20px",
  },
};

export default BrokerCompare4;
