import React, { useState } from "react";
import "./Ipo4.css";

const faqs = [
  {
    question: "What is an IPO?",
    answer:
      "IPO or the Initial Public Offering is the first time a company issues its shares to the public. As an investor, you will now be able to subscribe for such shares, which was earlier open to only a specified lot of internal and institutional investors via opening a Demat account.",
  },
  {
    question: "How to invest in an IPO?",
    answer:
      "You can invest in an IPO through a Demat account and a trading account by applying online through your broker or bank.",
  },
  {
    question: "What is the benefit of an IPO?",
    answer:
      "An IPO allows investors to buy shares at an early stage, potentially gaining high returns if the company performs well.",
  },
  {
    question: "What are the disadvantages of an IPO?",
    answer:
      "An IPO investment carries risks such as price volatility, potential losses, and uncertainty regarding future company performance.",
  },
  {
    question: "What is the difference between book building issue and fixed price issue?",
    answer:
      "A book-building issue allows investors to bid for shares within a price range, whereas a fixed price issue has a predetermined price.",
  },
  {
    question: "Is it mandatory to have a PAN number to apply in an IPO?",
    answer:
      "Yes, having a PAN (Permanent Account Number) is mandatory for IPO applications in India.",
  },
  {
    question: "Where do I get an IPO application form?",
    answer:
      "IPO application forms are available through banks, brokers, and online trading platforms.",
  },
  {
    question: "How one can apply in IPOs online?",
    answer:
      "You can apply for an IPO online via net banking (ASBA process) or through broker trading apps.",
  },
  {
    question: "How one can apply in IPOs offline?",
    answer:
      "You can apply offline by submitting a physical IPO application form to your broker or bank.",
  },
  {
    question: "Can a minor apply in an IPO?",
    answer:
      "Yes, a minor can apply for an IPO, but it must be done through a guardian’s Demat account.",
  },
  {
    question: "What is the procedure to withdraw from an IPO?",
    answer:
      "Investors can withdraw from an IPO application before the allotment date via the ASBA process or by contacting their broker.",
  },
  {
    question: "How is IPO return calculated?",
    answer:
      "IPO return is calculated based on the listing price compared to the issue price and subsequent market movements.",
  },
  {
    question: "Can one apply for an IPO from a sweep in/out saving bank account?",
    answer:
      "Yes, IPO applications can be funded from a sweep-in/out savings bank account if the bank allows it.",
  },
  {
    question:
      "What is the minimum and maximum investment one could do in the HNI category?",
    answer:
      "The minimum investment in the HNI category is above ₹2 lakhs, with no fixed maximum limit.",
  },
  {
    question: "How to apply more than one application in an IPO?",
    answer:
      "Multiple IPO applications can be made using different Demat accounts, but SEBI does not allow duplicate PAN-based applications.",
  },
];

const Ipo4 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions?</h2>
      <p>Find answers to common questions that come in your mind related to IPO.</p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="icon">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ipo4;
