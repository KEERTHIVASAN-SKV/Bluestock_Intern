import React from "react";
const investors = [
  {
    name: "Rakesh Jhunjhunwala",
    image: "https://s3-alpha-sig.figma.com/img/6a83/e003/67e86e884ac55f16c312ddb7d8d4dcfe?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SGqhJKEoDULjWWYAYHyUNqWBv5~bjpKDWHJedyI0X7GVzA9Zn0B2X5OsA0Vj0yUaxb2IMIBrgJsoKlp1dGYFfnbXeUvMfxrJTzFMEbdzOJtejEmkJcexo-EBo4gNnAjP7oWytYTkuAMWzJN~EOzn~HhBzkuS6gCShHcygeQcmnMpbm1LgJHiBdD55Lx8YYWN0iZLcu5eXrV1OjXYg~5Hq3h5pGBJoqhHwEaE3HDrBWB14aQGlA2ZXJEXArXIlByTrc0yeRQmT6jMbK0lXXVZdzUDGAwayBLjuwLaPrFKg3R-0ZRtIqyloAqzf6bWNdVePwJaZMR-cfWiLxdVJBf~Gg__", // Replace with actual image path
    description: "He started investing in the 90s",
  },
  {
    name: "Anil Goel",
    image: "https://s3-alpha-sig.figma.com/img/7156/30e2/5e57145b6c10b06f40e7ab5f934ff096?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fdflIELCAPQe9a2Ga6rpxalGwKYzdLgP6hVr8IiHJ5CPQ-ipHio4JKvnvpPg5e9n6E0ALKXEto9RqTUD3piN1~OlCjR9Dzr9dUxWf5qSKkhBtHg~0NedXXKR0L~77ksB8c-1CiOFOTzQIbzxKJQPtxmJn3lKD9KvjunoghMhj434r6gNmHn5rD~Qgj7JP7eKMw8hePPJ5wM9FpXWjWk-bbHhgdJPzUeVvQUvsSY7QobwbdBs6hzJ~vgfJT1V1CN2Rd7K56oX44lvgk7gLi61lVRnXK24DsefpBiAi84rsoJysU-YrxkbUPvydgH8eHj0e5OpmQE3vNPXPDjCMrHacw__",
    description: "He started investing in the 80s",
  },
  {
    name: "Ashish Dhawan",
    image: "https://s3-alpha-sig.figma.com/img/1565/72b3/355a39fd62e1a760559c35610e61d163?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=av8otqXYXvphhgs15pKvXkd8wUjH1G~druxAZzf-FdKSdx9oMOgjFkccT-2D15UGyC0coGHLJI7MyK3s5SUEirWj960wYx6xX8knyIl2XLVXNo-e8vqdogUev-Yk~yVY3NqmMRoAT-4esP~cdnXukLOHDWb2TrusksOF~gyJNE2vXU7G65xF9ti5UmP4QhUhh2dyqm2-0b9AXSYH2xve0oL6Z8K0OfEItaYa9CidUCFKCzR-DOhcaf4K0gzgAIvYVJRMt3Y4lxTj3q-DTX~ZKL-W2efrK-soAODXxuSBf8XP8yzm~PpBP17eNlFrcmH7Ge0iGZzbjJrmHqGUWzP69g__",
    description: "He started investing in the 90s",
  },
  {
    name: "Ashish Kacholia",
    image: "https://s3-alpha-sig.figma.com/img/02fc/695a/a6f201371e7e770034b8cf25b9715040?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=q9YVooxvnIOq8ef8CCaMfa88HV0VIqTK0pw3kqljyyKm0KOn1rn3gflS-yDClggcahLyXcN--NQV~gWVU-4AwZuBdCkUrAw8nFKIvjXFU6hZS5jRs9NGfUW8iryQePdCuRp-6DiyjIiqj-dGNstghm5~nyHUFzwtj8ike2XJEKQqbquPVhDzhLfOLkw45-0jQlZ66WHS34USc9YpDmgVW-pQ-TY7T3cAAz-B2huIUqO0E01R4Aar3lMJ1D48zbuMMOjG3PKmWnXF4GT7aS4e-itJNtTN6Pqagvrf1Io2oPMsW8a9w-QygFa0NVSuR7LhKDzPRBu3U5xd8x0KzKMufg__",
    description: "He started investing in the 90s",
  },
  {
    name: "Dolly Rajeev Khanna",
    image: "https://s3-alpha-sig.figma.com/img/f962/4775/af69bcd9bbe16fb74f4c7d79ebae57d5?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ju~Hj-VvG87SukCL-TNLhboL~pCSSZaqH2HJ7iI3nNTV2kQScA3cYqrsnYlc9KIVYZRLMBoGzj2CufvJRMErMWr0xVV18nBHpXC56NOjaSh1lSGcs3AwDQCmz1~8ThkFcd5~T6L3Z-yC8ROMKDQMMzCXKvR4W5BmzoLhrNiy-SIK4pmFF6nhLdF86uRjIQFsjzNzYJtDyekY1e0S3gbCkQIxBDfnT1G9itB0snMNhWZ6tKGSnKj2S13HbktLkPZfws~KRLNvpoWeG4EjVtGK7xcYLVMnI6pk5MxNuHE6pvh4io7F36tfuuOPEsi-6h~z1vupLlLC6MoOBmoP4BbelQ__",
    description: "He started investing in the 90s",
  },
  {
    name: "Hemendra Kothari",
    image: "https://s3-alpha-sig.figma.com/img/7018/dc65/e9a307d51586a68d01d648bc05390da5?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=g1R5WPdA1a3~QYkmtCtP~3rdkALOoMv3jHOiFiOsq4wEVapPl3BnDd4ao1-7mg0xl7e81C-OAkgQI9ipphFGLN~6UQfidOlU9IHE4M8eodtR-tuw5km-NNvdqEOxd8-SSjj4L~uIM~u04d8kpfKzXzEQUrbsKpqSL~7U6Rl9eVpfD4ZCqXbOGFaNwz-5NmAr0zmC~Gx2bgmOpaCQ0OupE~Qf4BnwdsAV0g1q3x5h2b5cwnkj9IYtT~IVFKPz0laT9kAPKEXqWmUBZ-mKFqEF2y5SHLzGdF27wuiH~2P0COak81jdXzJggSX0MweR9O6FYumfZhcDXV1PxukmRgjsOw__",
    description: "He started investing in the 80s",
  },
  {
    name: "Nemish Shah",
    image: "https://s3-alpha-sig.figma.com/img/ea66/9ba1/0140ec189f7d4cb6c93f4028f43e4c53?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNWNnPKnCqOOZdbmSS7YW2vlgDmkX0OwN0VR5p2hwiLxlKLJPmrW~s9Gw8RVAOdsj2lfSZYr0vffpJ4Hl1VyXKWnW~PKxtGR8D25V51OWJOJXR9o9FMbmJsyj1wiEDOriE6Vl9EOFho2diUBp6ZE09OwbQRAivzzhp7MD~EGn~BEMJNeTiWJHo09UsB9dndxn06A54MSKZ4M3YaPzZzcBFbndO8WN5Fm6UHeZ25mnTv0Plih2kMap6O58zIP8UXqstl6cNp8bNXk2RYGLKimmKzFVSPl2tNADOz3jYExqZBNP7AIrOjloM6mJBesXIwBxR85gwL~EH1xOyXz69F9NA__",
    description: "He started investing in the 90s",
  },
  {
    name: "Porinju Veliyath",
    image: "https://s3-alpha-sig.figma.com/img/eb0e/9f9e/3ccf6210336a7be1f529befcc42ba878?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p8SNVLbFJh2m63g8p8ySDoIkdvH5R7rVGBD3Dq~-QUqt4h6nVP7kImWFr839JMBcHgdTdRwVeZAgFyem49pBioaTiLB-FSjoEw54eFSNgsw7b-519bvNRiQzm~VnSiCmzYGhPlpTwY7f9SSN4o84h8YtZwztKf~4UfTwkIEaaIXU6~lWcIF~I1ZxvtsOeK0BrfKyz8~WD3Vj-O2EeAlbFoapb7aHR-Qv~fA-gS1iz9xeo~TFqWn9hpU56dEgpb8Pa8j1X4WOa5NEs3Cda4rjLs9fFIRLfvO0g2pBojOQdD-Y-hVYjA-Rg7f081anp4dG6G1t5hqa3Bjm1vWeyekHIA__",
    description: "He started investing in the 90s",
  },
  {
    name: "Radhakishan Damani",
    image: "https://s3-alpha-sig.figma.com/img/0669/0925/f00d8878f0411886bfc43afea23cbdb2?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hO2NHOQA-qyPhgOLzv9kDQaPeY0neaiLq6~J~B~uY8zMrvRuEE9vKNi-wZOgNoYVsqtL7VaC2OxAgk6RJxyX2dJKnqbzBnLtLawxzXxDR0lDm3FpqEXXPQMi7PggQay75Jc45tGzMrxHLbM9WnH5lUiVEOrnJbDMZYDlRd3vG2c6rXrr0O3h5pzSL~dY5XphX8V9C5atyYj75dYT8kzpsmzdHfmxL-Ae0xnp4kVzXF6-w1TSOn6aZPTJymcJPinaorbx3dAVy8xWjxNdABry-txk3Y8RjcYim1K99w-wGzrttY6t1g~2H5DTjou84B5xpFp09QeA5ctOgd7iHRgcMQ__",
    description: "He started investing in the 90s",
  },
  {
    name: "Sunil Singhania",
    image: "https://s3-alpha-sig.figma.com/img/862d/163e/d33ed77632a62358593e3741e710ed36?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VcreMBcN0BKOkaqimEflKEYrovbOdz0QiTLE7Vww-njlhI~5dQjCZNQDVBJTWsxoQVK1Gx0SQaUiXo~L23iZjLGUmCLl22nwwZkbnv369ieun5EUqH9JWfS72m9rcUCUcgaUqoHve5qCqet5yQ6Qb7IP5q20el4N1txGil8UZ0bBrqCzcnMj5XZapVH13mL305uZRvlCDhTLhTaB6QnlmNvomevBoC19Wp7oqgIBdNC6vyDx7ZbZXdOrmECfBUskpeQ8jUCBVkIhDLYyhR8luSRJVTEyAIkCoKWxGJBW-d6rszei7e8z6W5mynniMsjm37VDksQAWyLxbBDF0ULS~g__",
    description: "He started investing in the 90s",
  },
  {
    name: "Vijay Kedia",
    image: "https://s3-alpha-sig.figma.com/img/1b8d/c723/bb0a02b290c8cf9d2e312a86d33ee1ec?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=amiAI6NKvK~IGuNZAFeuAURyojSO1C8z356Qhps1b3ZOUMAVK~ercNJj94n~C8lf7iUPCcvLSptCS2Nd5JlrVX60OR9gyM9NuSfI8Yq-8DlTFEUOtM8uvyzShykEAqGz0QotUWd2go5L26TnJh5lzUXl5FPkf~Q5DLMl2gIKJr9hoLOxo2gLvtpRWBrxYVpFNZlZBXmtRDi88Ay-nIScaU0IetbjLJonEfzkZXs-qqF4O4S1R87wiQ3iGdiFrLL9yUZk47~XAbtGH6Z~K1-mKiu4Cqz6c-EbwdvFqlBzXEHg9YUK55eA7weEHNQZJsoOZbM5IRvSbkVIXQFsE9KuLw__",
    description: "He started investing in the 90s",
  },
];

const Shark = () => {
  return (
    <div style={styles.container}>
      <h1 className="heading1" style={styles.heading} >Shark Investors</h1>
      <p style={styles.subheading}>
        Look into the portfolio of these Super Investors to find out their favourite stocks.
      </p>
      <input type="text" placeholder="eg: Damani" style={styles.searchBox} />
      <div style={styles.grid}>
        {investors.map((investor, index) => (
          <div key={index} style={styles.card}>
            <img src={investor.image} alt={investor.name} style={styles.image} />
            <h3 style={styles.name}>{investor.name}</h3>
            <p style={styles.description}>{investor.description}</p>
            <button style={styles.button}>View Holdings</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {

   
  container: {
   
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    width:"95%",
    marginTop:"8%",
    marginLeft:"2.5%",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
 

  },
  subheading: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  searchBox: {
    padding: "10px",
    width: "250px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },

  


};

styles["@media (max-width: 600px)"] = {
    container: {
      width: "100%",
      margin: "0 auto",
      padding: "0 10px",
    },
    grid: {
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    },
    card: {
      padding: "10px",
    },
    image: {
      width: "70px",
      height: "70px",
    },
    name: {
      fontSize: "14px",
    },
    description: {
      fontSize: "10px",
    },
    button: {
      fontSize: "10px",
      padding: "6px 10px",
    },
  };

export default Shark;
