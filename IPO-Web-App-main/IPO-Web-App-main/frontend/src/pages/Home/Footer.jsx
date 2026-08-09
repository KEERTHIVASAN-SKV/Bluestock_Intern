import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer"> 
      <div className="footer-container">


        <div className="footer-top">
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li className="text1">Trading View</li>
              <li className="text1">NSE Holidays</li>
              <li className="text1">e-Voting CDSL</li>
              <li className="text1">e-Voting NSDL</li>
              <li className="text1">Market Timings</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
            <li><a className="text1" href="/Carrers">Careers</a></li>

              <li>
                <a className="text1" href= "/Contact">
                   ContactUS
                </a>
              </li>
              <li><a className="text1" href="/about">About Us</a></li>
              <li><a className="text1" href="/community">Community</a></li>
              <li><a className="text1" href="/Blog">Blogs</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Offerings</h4>
            <ul>
              <li><a className="text1" href="BrokerCompare">Compare Broker</a></li>
              <li>Fin Calculators</li>
              <li><a className="text1" href="/ipo">IPO</a></li>
              <li><a className="text1" href="/Broker">All Brokers</a></li>
              <li><a className="text1" href="/Product">Products</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Links</h4>
            <ul>
              <li>
                <a className="text1" href="/Shark">Shark Investor</a></li>
              <li><a className="text1" href="/MuthodFund">Muthod Fund</a></li>
              <li className="text1" >Sitemap</li>
              <li className="text1">Indian Indices</li>
              <li className="text1">
                <a href="/school">Bug Bounty Program</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Policy</h4>
            <ul>
              <li className="text1">Terms & Conditions</li>
              <li className="text1">Privacy Policy</li>
              <li className="text1">Refund Policy</li>
              <li className="text1">Disclaimer</li>
              <li className="text1">Trust & Security</li>
            </ul>
          </div>
        </div>

        <div className="footer-middle">
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaLinkedinIn />
            <FaInstagram />
            <FaTelegramPlane />
          </div>
          <div className="footer-brand">
            <img src="https://th.bing.com/th/id/OIP.fzMBMaB-5q2MLmGM_MCZUQHaHa?w=150&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Bluestock Logo" />
            <p>Bluestock Fintech<br />Pune, Maharashtra</p>
          </div>
          <div className="footer-info">
            <p>MSME Registration No:<br /> UDYAM-MH-01-0138001</p>
            <img src="https://th.bing.com/th/id/OIP.dBfYqMWJtOexZ1H_o3C89AHaB6?w=306&h=90&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Startup India Logo" />
          </div>
        </div>

       
        <div className="footer-disclaimer">
          <p>
            Investment in securities markets are subject to market risks, read all the related documents carefully before investing as prescribed by SEBI. Issued in the interest of the investors.
          </p>
          <p>
            The users can write to <a href="mailto:help@bluestock.in">help@bluestock.in</a> for any app, website related queries. Also, you can send IT / Tech related feedback to <a href="mailto:cto@bluestock.in">cto@bluestock.in</a>
          </p>
          <p>
            <strong>Disclaimer:</strong> We are not a SEBI registered research analyst company. We do not provide any kind of stock recommendations, buy/sell stock tips, or investment and trading advice. All stock scripts shown in the Bluestock app, website, and social media handles are for educational purposes only.
          </p>
        </div>

        <div className="footer-bottom">
          <p>Bluestock Fintech All Rights Reserved.</p>
          <p>Made with ❤️ in Pune, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
