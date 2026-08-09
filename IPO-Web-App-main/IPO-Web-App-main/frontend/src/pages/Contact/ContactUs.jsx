import React from "react";

const ContactUS = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        marginTop: "8%",
        width: "95%",
        marginLeft: "2.5%",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        How Can We Help You ?
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            width: "90%",
            maxWidth: "300px",
            textAlign: "left",
          }}
        >
          <h3>Email us</h3>
          <p>One of our agents will respond at the earliest</p>
          <a
            href="mailto:hello@bluestock.in"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "blue",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            hello@bluestock.in <span>&#8594;</span>
          </a>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            width: "90%",
            maxWidth: "300px",
            textAlign: "left",
          }}
        >
          <h3>Chat us</h3>
          <p>Available from 8:00AM to 5:00PM</p>
          <a
            href="#chat"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "blue",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Open Chat <span>&#8594;</span>
          </a>
        </div>
      </div>

      <div
        style={{
          background: "#5b6efc",
          color: "white",
          padding: "40px",
          marginTop: "140px",
          borderRadius: "10px",
        }}
      >
        <h2>Interact With Us in Our Active Community</h2>
        <p>
          Ask questions or discuss anything related to investing or trading
          <br /> in the most active trading & investing community
        </p>
        <button
          style={{
            background: "black",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          JOIN NOW
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div
          style={{
            background: "#f4f4f4",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "90%",
            maxWidth: "350px",
          }}
        >
          <h3>Download Bluestock Mobile App</h3>
          <img
            src="https://s3-alpha-sig.figma.com/img/6056/c2a1/406f03ae4df9fcb5c5f325bb8dbc1ec1?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDVgl7BicXtXzuqv8Vnzy~hsEEpvmBKZonFiApFLdzkI3X9OxrfIOt~AdpTTmsOZJzs9Q1510pfUswGcHdbspLF-XA3tggqOgTyEdCPfr1x33ubkBBHzfo1dzHEgjfe7bLGJPzbMTqcVLKAuAIdxe79Mmp08avYt2GdNZVf7UhtZbDP0ctwpha-JAahmhGuff0De0zkS3E4dqtU30fSfZYg6FYEBNwYgVnEPUU7QZMsL~GPf8CRpDi2PkcGqTvDE2m-2qukuNNtHnDIIZROhyuZukAAQejlHnFuzZPK17yncmX33~-NU9XOMjQz6TU~MpbLCEHAVVKrLnVD4BJ9RtA__"
            alt="QR Code"
            style={{ width: "100%", maxWidth: "150px", margin: "10px 0" }}
          />
          <div>
            <img
              src="https://s3-alpha-sig.figma.com/img/dbc6/832c/445c09e660e50406768ff3c045b9ae67?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aYyDacxrP3OcAh9Z8pvAvi2JEOcz0uX69glbrdhaGoykD-56~TsgFPal46k85FoM8WMMDmjNLg9M6uldUbTT8qFUE~X7Bp~YCKMG8J4W8Bn5UR0ydG~czU9D0Ilz9NSiZfB0yjKSCfEBNe7enSh5IUAP3DwWw89DIU-iPNY1JLVZaX7bpESacHjeo2Rd6QIlrpmSiCYdS-AqrTCy3Pwy~T5cqMyeXwQPIKlfPy6JYMoKhpE2huWvZYRJ0SNWQhdkmAqBNEkfoO7znnoN8tYRxjCpki6SfblUeyC9aq4aaQcTxjkTrMXtSFj2b45~IqGhsHOyoZtqHtWK9EjEP4Q6Pg__"
              alt="Google Play"
              style={{ width: "48%", maxWidth: "120px", margin: "5px" }}
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/46f6/01d5/cacd460039d60ad50fca2b5fbc3f6f96?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PX6GjSPj2z953XEmv6jO-ACB9T-sojNuZXzgEYOEs2OxwKiQRBi8NVS3CNOsLSOwABrJfjBsKZQxuPJTkubg4PNnEmi~HHaIgjm2RXa4Zwm2z6JxN9jx7N2-ItSN7pjaIfy7DoHpvoWe7Zj9ZpFGgGbNd83DdCOXyMckWfF2DmRovdiR3YZ2EuDzNMkrT2EBnHMIcliwLX1xa4-vA16oKWaPwRheMOefoqHC9BeO4xI-pDQQXxwEZVVxUB4n7OjIJZCgEKGON1LUwEBNFhZaMWqWuktDibewutZC~xViXn-E844e-7cL3Cl6eQlDuVODdlL1T~baW5V2OuUo91Hi1g__"
              alt="App Store"
              style={{ width: "48%", maxWidth: "120px", margin: "5px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
