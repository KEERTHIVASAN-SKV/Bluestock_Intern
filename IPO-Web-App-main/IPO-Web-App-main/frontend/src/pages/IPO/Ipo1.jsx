import React, { useState, useEffect, useRef } from "react";
import "./Ipo1.css";

const IPO1 = () => {
  const [ipoList, setIpoList] = useState([]);
  const [ipoDocuments, setIpoDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Fetch IPO Data
  useEffect(() => {
    const fetchIpoData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/ipos/");
        const data = await response.json();
        setIpoList(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch IPO data. Please try again later.");
        console.error("Error fetching IPO data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIpoData();
  }, []);

  // Fetch docs for every IPO in parallel
  useEffect(() => {
    if (!ipoList.length) return;

    const fetchAllDocs = async () => {
      const docsByIpo = {};

      await Promise.all(
        ipoList.map(async (ipo) => {
          try {
            const resp = await fetch(`http://127.0.0.1:8000/api/v1/documents/?ipo_id=${ipo.id}`);
            const docs = await resp.json();
            docsByIpo[ipo.id] = docs;
          } catch (err) {
            console.error(`Error fetching docs for IPO ${ipo.id}:`, err);
            docsByIpo[ipo.id] = [];
          }
        })
      );

      setIpoDocuments(docsByIpo);
    };

    fetchAllDocs();
  }, [ipoList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ipo-container">
      <h2>IPO</h2>
      <p className="text-2xl">Following is the list of companies for IPO as of today.</p>

      <div className="ipo-header">
        <h3>Upcoming</h3>
        <button className="view-all-btn">View All</button>
      </div>

      <p className="ipo-info">
        Companies that have filed for an IPO with SEBI. Few details might be disclosed by the companies later on.
      </p>

      <div className="scroll-container">
        <button
          className="scroll-btn left"
          onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}
        >
          &#9665;
        </button>

        <div className="ipo-list" ref={scrollRef}>
          {ipoList.filter(ipo => ipo.status === 'Upcoming').length ? (
            ipoList
              .filter((ipo) => ipo.status === "Upcoming")
              .map((ipo, index) => {
                const docs = ipoDocuments[ipo.id] || [];
                const doc = docs[index] || {}; // use first doc or empty
                return (
                  <div className="ipo-card" key={ipo.id}>
                    <div className="ipo-image-container">
                      <img
                        src={ipo.company?.company_logo}
                        alt={ipo.company?.company_name}
                      />
                    </div>
                    <h2 className="ipo-name">{ipo.company?.company_name}</h2>
                    <p><strong>Price Band:</strong> {ipo.price_band}</p>
                    <p><strong>Open:</strong> {ipo.open_date}</p>
                    <p><strong>Close:</strong> {ipo.close_date}</p>
                    <p><strong>Issue Size:</strong> {ipo.issue_size}</p>
                    <p><strong>Issue Type:</strong> <span className="highlight">{ipo.issue_type}</span></p>
                    <p><strong>Listing Date:</strong> {ipo.listing_date}</p>

                    <div className="ipo-buttons">
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
                      {!doc.rhp_pdf && !doc.drhp_pdf && <span>No docs</span>}
                    </div>
                  </div>
                );

              })
          ) : (
            <p>No Upcoming IPO Found</p>
          )}
        </div>

        <button
          className="scroll-btn right"
          onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}
        >
          &#9655;
        </button>
      </div>
    </div>
  );
};

export default IPO1;
