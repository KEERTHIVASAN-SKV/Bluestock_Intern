import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ipo3.css";

const Ipo3 = () => {
  const [ipos, setIpos] = useState([]);
  const [docsByIpo, setDocsByIpo] = useState({});
  const scrollRef = useRef(null);

  // Step 1: Fetch IPOs only
  useEffect(() => {
    const fetchIpos = async () => {
      try {
        const ipoRes = await axios.get("http://127.0.0.1:8000/api/v1/ipos/");
        const ipoData = ipoRes.data;
        setIpos(ipoData);
      } catch (error) {
        console.error("Error fetching IPO data:", error);
      }
    };

    fetchIpos();
  }, []);

  // Step 2: Fetch documents per IPO after IPOs are loaded
  useEffect(() => {
    if (!ipos.length) return;

    const fetchAllDocs = async () => {
      const docsByIpo = {};

      await Promise.all(
        ipos.map(async (ipo) => {
          try {
            const resp = await fetch(`http://127.0.0.1:8000/api/v1/documents/?ipo_id=${ipo.id}`);
            const docs = await resp.json();
            docsByIpo[ipo.id] = docs;
          } catch (err) {
            console.error(`Error fetching documents for IPO ${ipo.id}:`, err);
            docsByIpo[ipo.id] = [];
          }
        })
      );

      setDocsByIpo(docsByIpo);
    };

    fetchAllDocs();
  }, [ipos]);

  const renderIpoCard = (ipo) => {
    const documents = docsByIpo[ipo.id] || [];
    const doc = documents[0] || {};

    return (
      <div className="ipo-card" key={ipo.id}>
        <div className="ipo-image-container">
          <img src={ipo.company?.company_logo} alt={ipo.company?.company_name} />
        </div>
        <h2 className="ipo-name">{ipo.company?.company_name}</h2>
        <p><strong>Price Band:</strong> {ipo.price_band}</p>
        <p><strong>Open:</strong> {ipo.open_date}</p>
        <p><strong>Close:</strong> {ipo.close_date}</p>
        <p><strong>Issue Size:</strong> {ipo.issue_size}</p>
        <p><strong>Issue Type:</strong> <span className="highlight">{ipo.issue_type}</span></p>
        <p><strong>Listing Date:</strong> {ipo.listing_date}</p>

        <div className="ipo-buttons">
          {documents.length > 0 ? (
            <>
              {documents.map((doc, index) => (
                (doc.ipo === ipo.id) && ( // <-- Match only if document is for current IPO
                  <div key={index}>
                    {doc.rhp_pdf && (
                      <a href={doc.rhp_pdf} target="_blank" rel="noreferrer">
                        <button className="rhp-btn">RHP</button>
                      </a>
                    )}
                    {doc.drhp_pdf && (
                      <a href={doc.drhp_pdf} target="_blank" rel="noreferrer">
                        <button className="drhp-btn">DRHP</button>
                      </a>
                    )}
                  </div>
                )
              ))}
            </>
          ) : (
            <span className="no-docs">No documents available</span>
          )}
        </div>


      </div>
    );
  };

  return (
    <div className="ipo-container">

      {/* Ongoing IPOs */}
      <section className="ongoing-ipo">
        <h2>Ongoing</h2>
        <p className="new-paragraph2">
          Companies where the IPO investment process is started and will be listed soon in the stock market for regular trading.
        </p>
        <div className="ipo-list" ref={scrollRef}>
          {ipos.length > 0 ? (
            ipos.filter((ipo) => ipo.status === "Open").map(renderIpoCard)
          ) : (
            <p>No Ongoing IPO Found</p>
          )}
        </div>
      </section>

      {/* New Listed IPOs */}
      <section className="new-listed">
        <h2 className="text-1">New Listed</h2>
        <p className="new-paragraph">
          Companies that have been listed recently through an IPO. Find their listing gains and returns here.
        </p>
        <button className="view-all">View All</button>
        <div className="ipo-list" ref={scrollRef}>
          {ipos.length > 0 ? (
            ipos.filter((ipo) => ipo.status === "Listed").map(renderIpoCard)
          ) : (
            <p>No Listed IPO Found</p>
          )}
        </div>
      </section>

      {/* IPO News & Analysis */}
      <section className="ipo-news-analysis">
        <div className="ipo-news">
          <h3>IPO News</h3>
          <p>Brainbees Solutions files DRHP with SEBI</p>
          <p>22 Dec, 2:58PM</p>
          <p>Gretex Share Broking files DRHP with SEBI</p>
          <p>22 Dec, 2:57PM</p>
        </div>
        <div className="ipo-analysis">
          <h3>IPO Analysis</h3>
          <p>Euphorian Infotech India coming with IPO to raise up to Rs 9.60 crore</p>
          <p>18 Jan, 2:29PM</p>
          <p>EPACK Durable coming with IPO to raise up to Rs 662 crore</p>
          <p>17 Jan, 4:52PM</p>
          <p>Qualitek Labs coming with IPO to raise Rs 19.64 crore</p>
          <p>17 Jan, 3:59PM</p>
        </div>
      </section>
    </div>
  );
};

export default Ipo3;
