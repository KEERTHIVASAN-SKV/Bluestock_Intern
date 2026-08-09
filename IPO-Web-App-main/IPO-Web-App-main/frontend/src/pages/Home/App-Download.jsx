import React from "react";
import "./App-Download.css"; 

const AppDownload = () => {
  return (
    <div className="app-download">
      <div className="app-banner">
        <h2>
          <span className="highlight">Bluestock App 2.0  </span> is Live Now!
        </h2>
        <p className="download-text">Download Our App</p>
        <div className="store-buttons">
          <img 
           src="https://th.bing.com/th/id/OIP.tLSpRm_2b35iGLTK7ySR8wHaCO?w=349&h=105&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Google Play" className="store-icon" />
          <img 
           src="https://th.bing.com/th/id/OIP.MpoV6lYAhqwhtoLkUbgLMAHaCk?w=314&h=121&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="App Store" className="store-icon" />
        </div>
      </div>

      <div className="user-reviews">
        <div className="user-images">
          <img src="https://th.bing.com/th?q=What+Are+Images+of+Single+People&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="User 1" className="user-avatar" />
          <img src="https://th.bing.com/th?q=Single+People+Image+Free+Pictures&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="User 2" className="user-avatar" />
          <img src="https://th.bing.com/th/id/OIP.L52oRZ34zpt_BuqmasOYoQHaE8?w=282&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="User 3" className="user-avatar" />

          <div className="rating">
          ⭐⭐⭐⭐⭐ <span className="rating-text">(5/5 by 100+ users)</span>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default AppDownload;
