import React from "react";
import "./DetailedBlog.css";

function DetailBlog() {
  return (
    <div className="detail-blog-container">
      <div className="blog-content">
        <h1>Key Things to Know About Inox India IPO</h1>
        <p className="date">20 December 2023 • 6 min read</p>
        
        <div className="blog-image"></div>

        <p>
          One of the leading manufacturers of cryogenic storage tanks, Inox India, is about to launch its IPO in December 2023. 
          The much-awaited IPO is expected to boost the overall market scenario.
        </p>

        <h2>About Inox India Limited (INOXCVA)</h2>
        <p>
          The company is a leading manufacturer and supplier of cryogenic equipment, providing storage solutions across industries like 
          industrial gases, healthcare, and chemicals.
        </p>

        <h3>Important Details:</h3>
        <table>
          <tbody>
            <tr>
              <td>IPO Date</td>
              <td>14 December, 2023 to 18 December, 2023</td>
            </tr>
            <tr>
              <td>Price Band</td>
              <td>₹627 to ₹660 per share</td>
            </tr>
            <tr>
              <td>Face Value</td>
              <td>₹2 per share</td>
            </tr>
            <tr>
              <td>Lot Size</td>
              <td>22 Shares</td>
            </tr>
            <tr>
              <td>Total Issue Size</td>
              <td>2,10,19,065 shares (₹1,459.32 Cr)</td>
            </tr>
            <tr>
              <td>Offer for Sale</td>
              <td>2,10,19,065 shares (₹1,459.32 Cr)</td>
            </tr>
          </tbody>
        </table>

        <h3>Listing Details</h3>
        <p>Inox India shares are expected to trade from 21 December 2023.</p>

        <h3>Company Financials</h3>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>March 2023</th>
              <th>March 2022</th>
              <th>March 2021</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Revenue (₹ Cr)</td>
              <td>1,324.85</td>
              <td>1,091.02</td>
              <td>717.15</td>
            </tr>
            <tr>
              <td>Profit After Tax (₹ Cr)</td>
              <td>190.34</td>
              <td>151.22</td>
              <td>97.73</td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside className="sidebar">
        <div className="related-posts">
          <h3>Related Posts</h3>
          <div className="placeholder-box"></div>
          <div className="placeholder-box"></div>
        </div>

        <div className="stock-movements">
          <h3>Top Gainers</h3>
          <ul>
            <li>Stock A +7.53%</li>
            <li>Stock B +5.24%</li>
          </ul>
          <h3>Top Losers</h3>
          <ul>
            <li>Stock X -4.72%</li>
            <li>Stock Y -3.89%</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default DetailBlog;
