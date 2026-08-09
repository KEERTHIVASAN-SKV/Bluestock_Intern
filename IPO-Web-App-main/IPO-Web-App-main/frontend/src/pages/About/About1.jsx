import React, { useState } from "react";
import "./About1.css";

const About1= () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <div className="home-about">Home &gt; About US</div>
      <h2 style={styles.heading}>
        Bluestock is a mobile app for stock market learning, analytics & club
      </h2>
      <p style={styles.description}>
        We are passionate about helping you succeed in the stock market by
        providing cutting-edge tools and a supportive community of traders.
        <br />
        Join us on this journey, and let's make your stock trading experience
        better.
      </p>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>5 Thousand</h3>
          <p style={styles.statLabel}>Customers</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>20+</h3>
          <p style={styles.statLabel}>Team Members</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>4.9⭐</h3>
          <p style={styles.statLabel}>Rating</p>
        </div>
      </div>

     <div className="container-big">
      <h3 className="traders-talk">TRADERS TALK</h3>
      <h2 style={styles.subHeading}>Recent News</h2>
      <div style={styles.newsContainer}>
        <div style={styles.newsCard}>
          <h4 style={styles.newsTitle}>Business Standard</h4>
          <p>Rs 20 Trillion & rising AUM of active equity mutual funds surges</p>
        </div>
        <div style={styles.newsCard}>
          <h4 style={styles.newsTitle}>Medium
            
          </h4>
          <p>Bluestock is a mobile app for stock market learning, analytics, and club, supportive community of traders.</p>
        </div>
        <div style={styles.newsCard}>
          <h4 style={styles.newsTitle}>Business World</h4>
          <p>Mutual Funds Experience Fourfold Surge In NFO Collections, Reaching Rs 22,000 Cr In Q2</p>
        </div>
      </div>
      <a href="#" style={styles.link}>Media & Press Release →</a>

      </div>

      <div style={styles.joinUsContainer}>
        <h2 className="heading-2">Want to join us?</h2>
        <p className="para-2">
          We’re taking complicated stuff and making it super simple. Our teams are full of smart and savvy folks working on challenging tasks
        </p>
        <p className="para-2">
          And we’re always looking for customer-obsessed people, Think you’re customer-focused enough? Write to us at{" "}
          <a href="mailto:hello@bluestock.in" style={styles.email}>
            hello@bluestock.in
          </a>
        </p>
        <button className="button-1" style={styles.button}>APPLY NOW</button>
      </div>
      
      <div className="freq-1">
        <h2 style={styles.subHeading}>Frequently Asked Questions</h2>
      <div style={styles.faqContainer}>
        {faqData.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div
              style={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question} {openIndex === index ? "▲" : "▼"}
            </div>
            {openIndex === index && (
              <div style={styles.faqAnswer}>{faq.answer}</div>
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

// Styles


const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    with:"95%",
    marginTop:"8%",
    marginLeft:"2.5%",

  },
  heading: {
    fontSize: "35px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "rgba(61, 61, 61, 1)",
    height : "117px",
    width : "727px",
    textAlign : "start" ,
    paddingLeft: "90px",
    fontSize: "35px",
    color: "rgba(61, 61, 61, 1)",
    paddingTop:"90px",

  },
  description: {
    fontSize: "20px",
    marginBottom: "20px",
    paddingLeft: "90px",
    lineHeight: "1.5",
    height : "148px",
    width : "654px",
    color: "rgba(102, 115, 132, 1)",
    textAlign : "start" ,
    fontWeight: "600",
    // fontFamily:"poppins",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "start",
    gap: "70px",
    marginTop: "30px",
    flexWrap: "wrap",
    width:"1535px",
    height:"380px",
    top:"714px",
    left:"202px",
    paddingLeft:"90px",
    paddingTop:"60px",
  },
  statCard: {
    background: "rgba(99, 133, 255, 1)",
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
   
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    // height:"380px",
    //  width: "480px",
  },
  statNumber: {
    fontSize: "40px",
    // fontWeight: "bold",
    fontWeight:"600",
    color:"rgba(255, 255, 255, 1)",
    width:"240px",
    height:"5.62px",
    // top:"904px",
    // left:"328px",
    // paddingLeft:"150px",
    // paddingTop:"130px",
    padding:"90px",
    paddingTop:"60px",
    
  },
  statLabel: {
    fontSize: "28px",
    paddingTop:"50px",
    height:"48px",
    width:"178px",
    paddingLeft:"70px",
    color:"rgba(61, 61, 61, 1)",
    lineHeight:"90%",
    
  },
  subHeading: {
    fontSize: "90px",
    fontWeight: "400",
    margin: "40px 0 20px",
    color: "rgba(0, 0, 0, 1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding:"10px",
    paddingBottom:"70px",
    lineHeight:"100%",
    
  },
  newsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    
  },
  newsCard: {
    background: "rgba(243, 245, 255, 0.9)",
    padding: "15px",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    
    width:"420px",
    height:"227px",
  },
  newsTitle: {
    fontWeight: "bold",
    marginBottom: "5px",
    color:"rgba(200, 62, 75, 1)",
  },
  link: {
    display: "block",
    marginTop: "10px",
    color: "#5b6efc",
    textDecoration: "none",
    fontWeight: "bold",
  },
  joinUsContainer: {
    background: "rgba(99, 133, 255, 1)",
    color: "white",
    padding: "30px",
    borderRadius: "70px",
    // margin: "40px auto",
    // maxWidth: "600px",
    textAlign: "center",
    height:"671px",
    width:"1596px",
    // top:"1883px",
    // left:"184px",
      
  },
  email: {
    color: "#fff",
    textDecoration: "underline",
  },
  button: {
    background: "rgba(82, 51, 172, 1)",
    color: "rgba(255, 255, 255, 1)",
    width:"137px",
    height:"36px",
    border: "none",
    borderRadius: "15px",
    paddingBottom:"5px",
    cursor: "pointer",
    // display: "flex", 
    // justifyContent: "flex-start"
    
  },
  faqContainer: {
    // maxWidth: "600px",
    margin: "20px auto",
    textAlign: "left",
    gap:"30px",
    width:"770px",
    height:"560px",
  },
  faqItem: {
    // background: "rgba(211, 211, 211, 1)",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    height:"80px",
    borderRadius:"15px",
    border: "2px solid", borderColor: "rgba(211, 211, 211, 1)",
  },
  faqQuestion: {
    fontWeight: "700",
    fontSize: "24px",
    lineHeight:"100%",
    color:"rgba(0, 0, 0, 1)",
  },
  faqAnswer: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#555",
  },
};

export default About1;
