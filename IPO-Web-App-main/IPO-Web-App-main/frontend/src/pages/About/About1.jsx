import React, { useState } from "react";
import "./About1.css";

const About1= () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="about-container">
      <div className="home-about">Home &gt; About US</div>
      <h2 className="about-heading">
        Bluestock is a mobile app for stock market learning, analytics & club
      </h2>
      <p className="about-description">
        We are passionate about helping you succeed in the stock market by
        providing cutting-edge tools and a supportive community of traders.
        <br />
        Join us on this journey, and let's make your stock trading experience
        better.
      </p>

      <div className="stats-container">
        <div className="stat-card">
          <h3 className="stat-number">5 Thousand</h3>
          <p className="stat-label">Customers</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">20+</h3>
          <p className="stat-label">Team Members</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">4.9⭐</h3>
          <p className="stat-label">Rating</p>
        </div>
      </div>

     <div className="container-big">
      <h3 className="traders-talk">TRADERS TALK</h3>
      <h2 className="about-subheading">Recent News</h2>
      <div className="news-container">
        <div className="news-card">
          <h4 className="news-title">Business Standard</h4>
          <p>Rs 20 Trillion & rising AUM of active equity mutual funds surges</p>
        </div>
        <div className="news-card">
          <h4 className="news-title">Medium</h4>
          <p>Bluestock is a mobile app for stock market learning, analytics, and club, supportive community of traders.</p>
        </div>
        <div className="news-card">
          <h4 className="news-title">Business World</h4>
          <p>Mutual Funds Experience Fourfold Surge In NFO Collections, Reaching Rs 22,000 Cr In Q2</p>
        </div>
      </div>
      <a href="#" className="about-link">Media & Press Release →</a>

      </div>

      <div className="join-us-container">
        <h2 className="heading-2">Want to join us?</h2>
        <p className="para-2">
          We’re taking complicated stuff and making it super simple. Our teams are full of smart and savvy folks working on challenging tasks
        </p>
        <p className="para-2">
          And we’re always looking for customer-obsessed people, Think you’re customer-focused enough? Write to us at{" "}
          <a href="mailto:hello@bluestock.in" className="about-email">
            hello@bluestock.in
          </a>
        </p>
        <button className="button-1">APPLY NOW</button>
      </div>

      <div className="freq-1">
        <h2 className="about-subheading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question} {openIndex === index ? "▲" : "▼"}
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

const faqData = [
  { question: "What is Bluestock?", answer: "Bluestock is a stock market learning and analytics platform." },
  { question: "What platforms does Bluestock support?", answer: "Bluestock is available on Web, iOS, and Android." },
  { question: "Is there educational content on the app?", answer: "Yes, Bluestock provides tutorials, insights, and real-time analysis." },
  { question: "Is Bluestock free to use?", answer: "Bluestock offers both free and premium plans." },
  { question: "How can I get technical support for the app?", answer: "You can reach us at support@bluestock.in for assistance." },
];

export default About1;
