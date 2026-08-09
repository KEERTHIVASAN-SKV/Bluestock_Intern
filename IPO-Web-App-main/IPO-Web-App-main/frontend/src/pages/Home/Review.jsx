import React from "react";
import { motion } from "framer-motion";

const reviews = [
  { name: "Venkatesh", text: "Excellent app with a fantastic UI! 😍 The UI is amazing!" },
  { name: "Sarthak", text: "Bluestock app provides a user-friendly interface ✨ and great navigation." },
  { name: "Sakshi", text: "BlueStock exceeded my expectations. The UI is well-designed and intuitive." },
  { name: "Amit", text: "This app is truly amazing! It has everything I need for stock trading." },
  { name: "Riya", text: "Absolutely love this app! It's intuitive and great for analysis." },
];

const Review = () => {
  return (
    <section className="reviewSection">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="heading"
      >
        What Our Users Say
      </motion.h2>
      <div className="reviewsContainer">
        <div className="scrollWrapper">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="reviewCard"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="reviewInner">
                <div className="reviewFront">
                  <h3>{review.name}</h3>
                </div>
                <div className="reviewBack">
                  <p>{review.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Duplicate reviews for seamless scrolling */}
          {reviews.map((review, index) => (
            <motion.div
              key={`duplicate-${index}`}
              className="reviewCard"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="reviewInner">
                <div className="reviewFront">
                  <h3>{review.name}</h3>
                </div>
                <div className="reviewBack">
                  <p>{review.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
};

const css = `
  .reviewSection {
    text-align: center;
    padding: 40px 20px;
    position: relative;
    top: 3800px;
    overflow: hidden;
  }

  .heading {
    font-size: 36px;
    font-weight: 600;
    color: black;
    margin-bottom: 20px;
    padding-left:80px;
    
    text-shadow: 0px 0px 10px rgba(94, 172, 255, 0.7);
  }

  .reviewsContainer {
    display: flex;
    overflow: hidden;
    width: 100%;
    
  }

  .scrollWrapper {
    display: flex;
    animation: scroll 20s linear infinite;
  }

  .reviewCard {
    perspective: 1000px;
    width: 250px;
    height: 200px;
    cursor: pointer;
    position: relative;
    margin: 0 15px;
    flex-shrink: 0;
  }
  
  .reviewInner {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .reviewCard:hover .reviewInner {
    transform: rotateY(180deg);
  }

  .reviewFront, .reviewBack {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 255, 255, 0.3);
  }

  .reviewFront {
    background: linear-gradient(45deg, #2937f0, #9f1ae2) !important;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .reviewBack {
    background: #222;
    color: white;
    transform: rotateY(180deg);
    font-size: 0.9rem;
    padding: 10px;
  }

  .reviewBack p {
    color: white;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    .reviewSection {
      top: 4600px;
    }

    .reviewCard {
      height: 180px;
      width: 200px;
    }

    .reviewFront {
      font-size: 1rem;
    }

    .reviewBack {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .reviewSection {
      padding: 20px 10px;
    }

    .heading {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }

    .reviewCard {
      height: 150px;
      width: 160px;
    }

    .reviewFront {
      font-size: 0.9rem;
    }

    .reviewBack {
      font-size: 0.7rem;
    }
  }
`;

export default Review;
