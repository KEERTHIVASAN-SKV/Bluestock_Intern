import React, { useState, useEffect } from "react";
const Job = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>

      <p style={styles.breadcrumb}>
        <span style={styles.link}>Home</span> &gt; Careers
      </p>

      <div style={styles.headingSection}>
        <h1 style={styles.heading}>Together, Let’s Build The Future Of Fintech!</h1>
        <p style={styles.description}>
          Join Bluestock Fintech to create disruptive fin-tech products, while working from anywhere!
        </p>
        <button style={styles.jobButton}>See Job Openings</button>
      </div>

      <img src="https://s3-alpha-sig.figma.com/img/217e/37cf/25de1fff263a15eba651383b2e0774f9?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H0mfr0I7Q05vJHObiRYQXvfjqXM-k5bnT4mP~aTQVcNbkWvTPY9CLm4tNaUpVy1S5giDW1QdE7ehn1LvbV-l6WvoASxHZgphqVHK-Wx97vjxkSK63V9LFBptz6QqXV8Z37zL2zmD62yKASZ32tWJH5oyZhi0Y8vpeI-39s9jPEU5bTs7ITJt3a8jaMouDzSbAOjUu8eD4pBPiiK5EMKQKsJaanpoTI1yoS8xmS8uDTtQhVZs85JBzN4sXrqODP3oUeF9Uy21aEgcKqbEUm7HyyY8Q6anAMgtPbj9hhAO4rs36AWv2Kya8vUO8LAxgS689EOVQ7vhSAEuWCEC9lEF7g__" alt="Job Banner" style={styles.bannerImage} />

      <div style={isMobile ? styles.downloadSectionMobile : styles.downloadSection}>
        <img
          src="https://s3-alpha-sig.figma.com/img/374a/e5cc/5f60c538f075c9660a93f5672197a20c?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F8~fUz6KlsK6qoUbDcl9aYtPJJ-nFFigWgw~De5lCI0Muw51f6lr40S248Qmy5zWqTWeBtSTASxiT3SWjNuNZU9YJv3qssOFhZn3TW0MzoBy9ZFQ~JSSs0v88qrAgIrEq7elIWUbGs0~FVxEME~ZvE4SaN2i4C1Aa~t~vakC5Y2zlwrDD7RTsYy~11GrMu9Jhvc1f3Hv8irKJOSTPnWW-O1hMkorEOS-Nnyhzbu6aT2zqejWurYxXIhlMG0shjJz44Wg-aza0m9tfjbhJtz00jrG6lEMtLqYWEH1GzJbDkRh-cgL5qIkbmfy2JrfbQ6bHR3RMmY3GgLdkUbwQF68uA__"
          alt="Bluestock App"
          style={isMobile ? styles.appImageMobile : styles.appImage}
        />
        <div style={styles.downloadContent}>
          <p style={styles.downloadText}>
            <span style={styles.highlight}>4.4 K+ </span> DOWNLOADS
          </p>
          <h2 style={styles.subHeading}>Enjoy Free Learning, Analytics Club</h2>
          <p style={styles.smallText}>Get the link to download the App</p>
          <div style={styles.inputContainer}>
            <input type="text" placeholder="Enter your phone number" style={styles.input} />
            <button style={styles.sendButton}>Send App Link</button>
          </div>
          <div style={styles.storeIcons}>
            <img src="https://s3-alpha-sig.figma.com/img/6056/c2a1/406f03ae4df9fcb5c5f325bb8dbc1ec1?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hDVgl7BicXtXzuqv8Vnzy~hsEEpvmBKZonFiApFLdzkI3X9OxrfIOt~AdpTTmsOZJzs9Q1510pfUswGcHdbspLF-XA3tggqOgTyEdCPfr1x33ubkBBHzfo1dzHEgjfe7bLGJPzbMTqcVLKAuAIdxe79Mmp08avYt2GdNZVf7UhtZbDP0ctwpha-JAahmhGuff0De0zkS3E4dqtU30fSfZYg6FYEBNwYgVnEPUU7QZMsL~GPf8CRpDi2PkcGqTvDE2m-2qukuNNtHnDIIZROhyuZukAAQejlHnFuzZPK17yncmX33~-NU9XOMjQz6TU~MpbLCEHAVVKrLnVD4BJ9RtA__"alt="QR Code" style={styles.qrCode} />
            <img src="https://s3-alpha-sig.figma.com/img/dbc6/832c/445c09e660e50406768ff3c045b9ae67?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aYyDacxrP3OcAh9Z8pvAvi2JEOcz0uX69glbrdhaGoykD-56~TsgFPal46k85FoM8WMMDmjNLg9M6uldUbTT8qFUE~X7Bp~YCKMG8J4W8Bn5UR0ydG~czU9D0Ilz9NSiZfB0yjKSCfEBNe7enSh5IUAP3DwWw89DIU-iPNY1JLVZaX7bpESacHjeo2Rd6QIlrpmSiCYdS-AqrTCy3Pwy~T5cqMyeXwQPIKlfPy6JYMoKhpE2huWvZYRJ0SNWQhdkmAqBNEkfoO7znnoN8tYRxjCpki6SfblUeyC9aq4aaQcTxjkTrMXtSFj2b45~IqGhsHOyoZtqHtWK9EjEP4Q6Pg__" alt="Google Play" style={styles.storeIcon} />
            <img src="https://s3-alpha-sig.figma.com/img/46f6/01d5/cacd460039d60ad50fca2b5fbc3f6f96?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PX6GjSPj2z953XEmv6jO-ACB9T-sojNuZXzgEYOEs2OxwKiQRBi8NVS3CNOsLSOwABrJfjBsKZQxuPJTkubg4PNnEmi~HHaIgjm2RXa4Zwm2z6JxN9jx7N2-ItSN7pjaIfy7DoHpvoWe7Zj9ZpFGgGbNd83DdCOXyMckWfF2DmRovdiR3YZ2EuDzNMkrT2EBnHMIcliwLX1xa4-vA16oKWaPwRheMOefoqHC9BeO4xI-pDQQXxwEZVVxUB4n7OjIJZCgEKGON1LUwEBNFhZaMWqWuktDibewutZC~xViXn-E844e-7cL3Cl6eQlDuVODdlL1T~baW5V2OuUo91Hi1g__" alt="App Store" style={styles.storeIcon} />
          </div>
        </div>
      </div>

      <p style={styles.footer}>
        All official communication with the HR team at Bluestock Fintech will be through{" "}
        <span style={styles.email}>hr@bluestock.in</span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    width:"95%",
    marginTop:"8%",
    textAlign: "center",
    marginLeft:"2.5%",
  },
  breadcrumb: {
    fontSize: "14px",
    color: "#666",
    textAlign: "left",
  },
  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "bold",
  },
  headingSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#222",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  jobButton: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  bannerImage: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop: "20px",
  },
  downloadSection: {
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
    padding: "20px",
  },
  downloadSectionMobile: {
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
    padding: "15px",
    
  },
  appImage: {
    width: "150px",
    height: "auto",
    marginRight: "20px",
  },
  appImageMobile: {
    width: "120px",
    height: "auto",
    marginBottom: "10px",
  },
  downloadContent: {
    textAlign: "left",
    maxWidth: "400px",
  },
  downloadText: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  highlight: {
    color: "yellow",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: "14px",
    marginBottom: "15px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "180px",
  },
  sendButton: {
    backgroundColor: "white",
    color: "#4f46e5",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  storeIcons: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qrCode: {
    width: "50px",
    height: "50px",
  },
  storeIcon: {
    width: "100px",
    height: "30px",
  },
  footer: {
    fontSize: "14px",
    color: "#666",
    marginTop: "40px",
  },
  email: {
    color: "#4f46e5",
    fontWeight: "bold",
  },
};

export default Job;
