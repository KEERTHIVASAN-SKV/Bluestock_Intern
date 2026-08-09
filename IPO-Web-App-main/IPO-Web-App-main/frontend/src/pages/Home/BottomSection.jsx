import React, { useState } from "react";
import { motion } from "framer-motion";
import "./BottomSection.css";

const brokers = [
  { name: "Angel One" },
  { name: "Zerodha" },
  { name: "Upstox", logo: "path_to_upstox_logo" },
  { name: "Groww", logo: "path_to_groww_logo" },
];

const BottomSection = () => {
  const [broker1, setBroker1] = useState(brokers[0]);
  const [broker2, setBroker2] = useState(brokers[1]);

  return (
    <motion.div
      className="bottom-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="content">
        <motion.div
          className="text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p>Compare and choose</p>
          <h2>Best Stock Broker for you</h2>
          <div className="dropdowns">
            <motion.div
              className="dropdown"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="https://th.bing.com/th/id/OIP.dFk-omU-lyzOGZ2z4Me6QAHaHa?w=173&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt={broker1.name} />
              <select className="name"
                value={broker1.name}
                onChange={(e) =>
                  setBroker1(brokers.find((b) => b.name === e.target.value))
                }
              >
                {brokers.map((broker, index) => (
                  <option key={index} value={broker.name}>
                    {broker.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              className="dropdown"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="https://th.bing.com/th/id/OIP.E00gZyWuZc1u94PyqTjOOQAAAA?w=146&h=150&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt={broker2.name} />
              <select className="name"
                value={broker2.name}
                onChange={(e) =>
                  setBroker2(brokers.find((b) => b.name === e.target.value))
                }
              >
                {brokers.map((broker, index) => (
                  <option key={index} value={broker.name}>
                    {broker.name}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
          <motion.button
            className="compare-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a className="Compare-button" href="/BrokerCompare">Compare</a>
          </motion.button>
        </motion.div>
        <motion.div
          className="image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <img src="https://img.freepik.com/free-vector/business-analysis-management-concept-business-strategy-big-data-solution-briefcase-research-data-mining-accountancy-website-landing-page-isometric-businesspeople-plan-goal-success_1150-59279.jpg" alt="Stock Analysis" className="chart" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BottomSection;