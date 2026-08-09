import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    category: "Angel One",
    pros: [
      "Angel One charges zero account opening charges as well as zero annual maintenance charges for only the first year.",
      "Zero brokerage charges for equity delivery and remaining segments like intraday and F&O which is flat Rs. 20 per trade."
    ],
    cons: [
      "Call and trade fee is charged at an extra Rs 20 per executed order.",
      "User Interface is a bit complex as it is not for beginners."
    ]
  },
  {
    category: "Zerodha",
    pros: [
      "You don’t pay any brokerage when you buy shares using cash-and-carry (CNC).",
      "They offer services under a simple pricing model. They charge 0.03% or Rs 20 per executed order, whichever is lower.",
      "Zerodha is a self-clearing broker. They don’t charge clearing charges from customers.",
      "Set long-standing stop loss and target orders for your stock investments.",
      "An all-new mobile app built for both, passive investors and active day traders."
    ],
    cons: [
      "Doesn’t provide stock tips, research reports or recommendations.",
      "Lifetime free AMC demat account plans are not available.",
      "An additional charge of Rs 50 per executed order for MIS/BO/CO positions which are not square off by the customer.",
      "Call & Trade is available at an additional fee of Rs 50 per executed order.",
      "3-in-1 trading account is not available as Zerodha doesn’t provide banking services."
    ]
  }
];

const BrokerCompare3 = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pros & Cons</h2>
      {data.map((section, index) => (
        <div key={index} style={styles.prosConsSection}>
          <div style={styles.table}>
            <div style={styles.header}>
              <div style={styles.prosHeader}>Pros</div>
              <div style={styles.consHeader}>Cons</div>
            </div>
            <div style={styles.content}>
              <div style={styles.prosColumn}>
                {section.pros.map((pro, idx) => (
                  <div key={idx} style={styles.prosItem}>
                    <FontAwesomeIcon icon={faCheckCircle} style={styles.successIcon} />
                    {pro}
                  </div>
                ))}
              </div>
              <div style={styles.consColumn}>
                {section.cons.map((con, idx) => (
                  <div key={idx} style={styles.consItem}>
                    <FontAwesomeIcon icon={faTimesCircle} style={styles.dangerIcon} />
                    {con}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    padding: "20px"
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  prosConsSection: {
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  },
  table: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold"
  },
  prosHeader: {
    width: "50%",
    background: "#d4edda",
    textAlign: "center",
    padding: "15px"
  },
  consHeader: {
    width: "50%",
    background: "#f8d7da",
    textAlign: "center",
    padding: "15px"
  },
  content: {
    display: "flex"
  },
  prosColumn: {
    width: "50%",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  consColumn: {
    width: "50%",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  prosItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  consItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    background: "#fff5f5",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  successIcon: {
    color: "green",
    marginRight: "10px",
    fontSize: "16px"
  },
  dangerIcon: {
    color: "red",
    marginRight: "10px",
    fontSize: "16px"
  }
};

export default BrokerCompare3;
