import React from "react";
import "./Community.css";

function Community() {
  return (
    <div className="community-container">
      <section className="hero-section">
        <div className="hero-text">
          <h2>The Most Active Community of Traders & Investors</h2>
          <p>
            Join now to interact with thousands of active traders and investors
            to learn and share your knowledge on our buzzing forum.
          </p>
          <button className="join-button">Join Our Community</button>
        </div>
        <div className="chat-preview">
          <img src="https://assets.fyers.in/images/website/community/community.webp" alt="Chat Preview" />
        </div>
      </section>

      <section className="trading-club">

        <div className="benefits">
          <h3>Be a part of trading & investments club</h3>
          <p>✔ Rich environment for knowledge exchange.</p>
          <p>✔ Stay connected about the latest stock market.</p>
          <p>✔ Access exclusive community events, webinars, and meet-ups.</p>
        </div>

        <div className="club-right">
          <div className="club-card">Dynamic<br />Discussions</div>
          <div className="club-card">Expert<br />Insights</div>
          <div className="club-card">Real-Time<br />Interaction</div>
        </div>
      </section>

      <div className="blue">
        <h3>Team Bluestock Cares</h3>
        <p>Interact with our members to engage, clarify and contribute.</p>

      </div>

      <section className="team-section">
        <div>

          <div className="experts-section">
            <h3>Interact With Our Experts</h3>
            <ul>
              <li>🔵 Get valid suggestions</li>
              <li>🔵 Raise issues or concerns</li>
              <li>🔵Ask your questions</li>
            </ul>
          </div>
        </div>

        <div className="chat-box">
          <div className="qna-wrapper">
            <div className="question-card">
              <img src="https://th.bing.com/th/id/OIP.Ntwccxljc9Gmka_Y6InYMAHaHa?w=197&h=197&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="user" className="avatar" />
              <div className="question-content">
                <div className="question-header">
                  <strong>Pravin Deshmukh</strong> <span>Asked 2 mins ago</span>
                </div>
                <p className="question-text">What is options trading ?</p>
                <div className="question-footer">
                  <span>134 likes</span>
                  <span>26 replies</span>
                </div>
              </div>
            </div>

            <div className="answer-stack">
              <div className="answer-card">
                <img src="https://th.bing.com/th/id/OIP.Dn-8K_TiXbuob_1fMEFurQAAAA?w=236&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Ganesh" className="avatar" />
                <div className="answer-content">
                  <div className="answer-header">
                    <strong>Ganesh Karale</strong>
                    <span className="tag">Bluestock Team</span>
                  </div>
                  <p className="answer-text">
                    Options trading is the trading of instruments that give you the
                    right to buy or sell a specific security at a specific price on a
                    specific date. Hope this helps!
                  </p>
                </div>
              </div>
              <div className="shadow-card"></div>
              <div className="shadow-card"></div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}

export default Community;
