import React, { useState } from "react";

const sectors = [
  { title: "Abrasives", description: "The one that scraps away all inconsistencies.", companies: 3, micro: 1, small: 1, mid: 0, large: 1 },
  { title: "Advertising & Media", description: "The one that creates and distributes media content.", companies: 10, micro: 8, small: 2, mid: 0, large: 0 },
  { title: "Agriculture", description: "The one that gives us vegetables and fruits to eat.", companies: 41, micro: 0, small: 3, mid: 2, large: 1 },
  { title: "Air Conditioners", description: "The one that keeps it cool with no noise.", companies: 5, micro: 0, small: 1, mid: 2, large: 2 },
  { title: "Airlines", description: "The one that takes us around the world in the shortest time.", companies: 6, micro: 2, small: 3, mid: 0, large: 1 },
  { title: "Aluminium & Aluminium Products", description: "The one that can wrap up almost everything.", companies: 18, micro: 14, small: 3, mid: 1, large: 0 },
  { title: "Amusement Parks/ Recreation/Club", description: "The one that’s all about the fun stuff and food.", companies: 4, micro: 1, small: 2, mid: 1, large: 0 },
  { title: "Aquaculture", description: "The one that takes care of aquatic animals.", companies: 6, micro: 7, small: 1, mid: 0, large: 0 },
  { title: "Auto Ancillary", description: "The one that provides parts to keep our vehicles running.", companies: 6, micro: 42, small: 27, mid: 21, large: 5 },
  { title: "Automobile Two & Three Wheelers", description: "The one that suits couples and smaller groups.", companies: 7, micro: 2, small: 1, mid: 0, large: 4 },
  { title: "Automobiles - Dealers & Distributors", description: "The one that lets cars and buses available to the public.", companies: 4, micro: 2, small: 2, mid: 0, large: 0 },
  { title: "Automobiles - Passenger Cars", description: "The one that lets families travel together comfortably.", companies: 4, micro: 1, small: 0, mid: 2, large: 2 },
];

const Sector = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSectors = sectors.filter((sector) =>
    sector.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sector</h2>
      <p style={styles.subheading}>Go to your favorite sector and analyze it in detail.</p>
      
      <input
        type="text"
        placeholder="Search for a sector"
        style={styles.searchBox}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={styles.grid}>
        {filteredSectors.map((sector, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{sector.title}</h3>
            <p style={styles.cardDescription}>{sector.description}</p>
            <p style={styles.listedCompanies}>{sector.companies} Listed Companies</p>
            <div style={styles.stats}>
              <p><strong>MICRO</strong> {sector.micro}</p>
              <p><strong>SMALL</strong> {sector.small}</p>
              <p><strong>MID</strong> {sector.mid}</p>
              <p><strong>LARGE</strong> {sector.large}</p>
            </div>
            <button style={styles.button}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  subheading: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  searchBox: {
    width: "80%",
    maxWidth: "400px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    justifyContent: "center",
  },
  card: {
    background: "linear-gradient(to bottom, #6fa8ff, #dceeff)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "10px",
  },
  listedCompanies: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#333",
    background: "#f5f5f5",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Sector;
