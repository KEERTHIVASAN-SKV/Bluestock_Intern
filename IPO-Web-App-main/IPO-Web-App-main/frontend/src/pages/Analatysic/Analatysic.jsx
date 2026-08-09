import React from "react";
import { FiSearch } from "react-icons/fi";

const Analytics = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", background: "#f8f9fa" }}>


      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Market Screener</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px" }}>Home</h2>
        <FiSearch style={{ fontSize: "20px", cursor: "pointer" }} />
      </div>

      <div style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)", padding: "20px", borderRadius: "10px", textAlign: "center", color: "white" }}>
        <h3>NIFTY 50 INDEX</h3>
        <h1>21,731.40</h1>
        <p>-236.30 (-1.07%)</p>
      </div>

      <h3 style={{ marginTop: "20px" }}>Top Gainers</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", background: "#ffffff", padding: "10px", borderRadius: "10px" }}>
        <div>
          <h4>XYZ Corp</h4>
          <p style={{ color: "green" }}>+ 5.00%</p>
        </div>
        <div>
          <h4>ABC Ltd</h4>
          <p style={{ color: "green" }}>+ 3.50%</p>
        </div>
      </div>

      <h2>Nifty Bank <span style={{ color: "red", cursor: "pointer" }}>See All</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          { logo: "https://s3-alpha-sig.figma.com/img/09b2/00d0/4feda7d2c159735877e8f00ec069719f?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OdY4~dbM-KJopgCdEevigylO7LY3uJ2TF8WSqlOgfm9B2aAVBnh-lits1cVjrujAmGirEEFF-auKKaRGCItDs0ZwwQBj7tkNKWI-ZwIWzJT6X5n9i1zvrfiIb1y8l-blNtHq9olMLG~YqUisNGA9UU1opkK917TpNS3Mp-MeYF~jApsAdIGASr6VxGh7BlGrDXq7VJnRjWIjCLlIeJDQLuFWVAvu7pYYhAMrGtEkd~AJ2svyNzJRfySZKGKR9vCvJ~u51YL8-pT88thWrtO0-SkOZeNFjT31iAHE-vAwJaUg-Cih89ypVLxZpdmH03qSUsvU1~BLA296P4nmE7y8gw__", name: "SBIN", change: "0.87%" },
          { logo: "https://s3-alpha-sig.figma.com/img/10dd/3ab8/16371813025b84affaa14fce447aaf92?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=L8-oSk11eszcHWvOLAIvJfuf0iypuxMLeTSm~QVAoF79hResvJlO5bhSTYHfReiORMxxLWgw~nuM6mwOk4VsvL5Ic18WSrWvp071PTAsgJsfqS7S0SpbZR8gWNUO9uA91QGtNxdB6sHyMJiOuXcJWI58igyNrwz6OUYOCszLW6J1aOWTDLcd~GC3W~3lYUZpcGmUWhB4pzWubkU25Vh~RLWGGREyHNP3c2UJdezI4DSUQYZL~i0hT6BAXXEHoO611gg2O7t9PBG07mnbGgDHtLHN8WmQJtNBA-UIqNoUwF~7dHYUEosst1aZuPo8cxQ2Qy4aDUDERTPSuW0S5N1~eg__", name: "KOTAK BANK", change: "0.92%" },
          { logo: "https://s3-alpha-sig.figma.com/img/c816/6b6f/403af9f7e5a7b0ab4b5eab4926f27e16?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EhvTC9CIy7tn-PkXVvwPvpVrAC7M9IagskhYg5ZMfzuJ0~rTsEvyXEpt3fMmVJ6hDkDaq8S7u2-o~BBOF5kK4FPP2TTVAbZhX5PaxnQPbhfeHpAjXDkLvXH8Uzn1Ry0m3x9PLVGu8MRJQuc0v2NbDZlGznOoE64Nq55~-BMag7MWcxr1VPHdcayaUQwxn29r19VHMWLj~-8RsPNFZGZEXY8ikGkEvpCMuBi5vY8dmx4ZyAbeMeoDKIR8X4pQ-VtakjhUyxFyLcPtWh3nFKtM-y-o6w0P27HkSkIcgH89TNuq~g7IQzRSbB4BV53N-NbVoPNsdKghNirTKhGJzvsA7Q__", name: "HDFC BANK", change: "29.3%" },
          { logo: "https://s3-alpha-sig.figma.com/img/bcc0/5d51/546604825773413bcb4aabe408d4c768?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RFdr~rLrImRyUibKsXqkbSRNbmgCGJ2YweW56mKq9fG7ovZVJ0GoLDoF6IxwnwW43FQgthz3Xku~JLC1X-pisqqmVgA3PxDi1L-j6cF1X-ILq-EZj5IwF45RX8dizduHxgOBoApuex7u4ijiAtf-iBvLgaN6TCsy2U2tiAeM4Fvk4EG0HKoX4a9s77eiFuOr-TcEpZvDvaLUKw07LJALqF2oG6xHO9AvSa5I69mmzPZtu9gifzyhC7lA8icR-p7mTyxGIdhe6IciGMfq8ijlnwYvCW5welS7zoyIoy2uQIQJQXwEwzzJI3xCWixSCwQRJgB4SV2cQMvu-UVDkw6x3A__", name: "ICICI BANK", change: "22.17%" },
          { logo: "https://s3-alpha-sig.figma.com/img/7c40/3c17/1ab23b0f489c4e826800b5b5f184dc62?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pHwwcE0fp8-CLcmwdQt2vFl9VjcCbMskxKeQECkXTWvYWs~tmK3Hwfg3ff9ACaviWzjp0WPIqxRJcGL34BKgYi-4gesPXVnVM6gxQOMBMmavG0oXd6dhovpG9GgomCEd2DJvH2ZJAeq84LlPWBJKz3p-nRjD9zyv15p3JG~ulR~~mdb8bj7TnOmRbkSDtTB2DgY2w1EKnHn1Fobipt6lndWfp9m3mP4OzlZdOeex~wuFA~kitkxzzKDvsRCJ6eYt5xuesoFn0jqv3a-86Tz0B9VBKAStNqLNmFB3K7T7lIJCakF7mgRJnyRa8BiEWE1m-PCjKtEJ5XJQq1b6POkbaQ__", name: "INDUSIND", change: "6.43%" },
          { logo: "https://s3-alpha-sig.figma.com/img/8982/2289/f3bc991967d567eaf6efcb086210a660?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JdPAuUCqJdDQJU90mQ-O4nSveKSei0tcuBpR3IosMxhln2YHWrJozWsj2DJF583OUJe9LcysLs5bNOXvY1C5x7sXdG3dLmyZr3cPDlEfhY-cEb53kxoSXwN4uVZ2yo6Tyd2pdN9c4lfyP0pMEPXYtCL0ycQdD1nN3yXUxjO5uSmH1sD8VSflIt3YxN-6Bu9LlRLRM9Iuhvc0p4M28oWx8T0b8QQL0qNnq-vr60G2rAGqqpoqBoP20glFIbqRkIZVxLi0ES1~ZDAAiEQGZ~LdlbOEJaLOS1m0OTKbB0iWsgbPCdkdzOqKXU8DEDSZ3vdV9BQ4mEAu87e6sWUTmbsFgw__", name: "AXIS BANK", change: "0.38%" },
          { logo: "https://s3-alpha-sig.figma.com/img/3b1b/bdc6/4aa88c4db3e9d61870b7c52a98a7af15?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dIUUUXIk576x8TvrMw2l6J5nrakHSoaQO-ur-ss2gaBZhIsROGJodc69t0J0pD3Z904D2GXwHAonN3~rZ7qz823mDrSYUYa4SAEcZWriWEpb5agv6cAoV~Dmtk3BSfyMYkEk9q91KqtGtuu7IBXtFR3lf6Lda9c9CaJZvAygrAs3ZvgpTQGbMndxbWrjuJH8hdRXRyglaA3c3slSovLzoYpoKzX73I3NrUSunBKiBTLsc7dovo5Rh6rkW~OWDQpNa4g9P1rKH~gJxgzWB97tHRLHgfEFNHw~sATOIKBZNd2c5m6gUD1RIPhb4PX6TOmlpCLd1W4yWPOKNiPfOnZpWA__", name: "IDFC", change: "2.04%" },
          { logo: "https://s3-alpha-sig.figma.com/img/2684/169f/587f8cb4bba23c6d85cfae1ac14a8cd8?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k2jCsHvurdnK48ARB1g54PsaM-CiFtSADUTZE83s-nZBP5F-zyPm17LfeMdI1qJZIg31s1Z6C9nsYGUGRkvlvtsIJ3CRIjB~xJPWcXd3sAso7Zd4fNlE2iw3dPQRms3rYyKqYttpNNwigual8W2a~jo9gPIbtlmmH~kX8k9I9wl2eKC3oGFQIOSZ8AGF8wPX~-OdA0MFSETrsxkjnLg93nMVlKlh0U32KvluIokOaiafycWbWqRzYJ6leBX4erIgZi2sNZS~6NfEjfoNiXftFivy3A~7B7p5taad8egLqVvjb8oEMg~CcbUHE-lU1ZsDH5OjVbPDk8XeBqzgtOJm8A__", name: "BARODA", change: "2.62%" }
        ].map((stock, index) => (
          <div key={index} style={{ background: "#ffffff", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
            <img src={stock.logo} alt={stock.name} style={{ width: "50px", marginBottom: "10px" }} />
            <h4 style={{ fontSize: "16px", marginBottom: "5px" }}>{stock.name}</h4>
            <p style={{ fontSize: "14px", color: "#333" }}>{stock.change}</p>
          </div>
        ))}
      </div>

      <h2>Nifty IT <span style={{ color: "red", cursor: "pointer" }}>See All</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {[
          { name: "SBIN", change: "9.87%", bgColor: "#1E1E1E" },
          { name: "KOTAK BANK", change: "9.92%", bgColor: "#FF3B30" },
          { name: "HDFC BANK", change: "29.39%", bgColor: "#6200EE" },
          { name: "ICICI BANK", change: "22.57%", bgColor: "#D500F9" },
          { name: "INDUSIND", change: "6.43%", bgColor: "#FF6D00" },
          { name: "IDFC", change: "2.06%", bgColor: "#FF5722" },
          { name: "BARODA", change: "2.62%", bgColor: "#2979FF" }
        ].map((stock, index) => (
          <div key={index} style={{ background: stock.bgColor, padding: "15px", borderRadius: "10px", textAlign: "center", color: "white" }}>
            <h4 style={{ fontSize: "16px", marginBottom: "5px" }}>{stock.name}</h4>
            <p style={{ fontSize: "14px" }}>{stock.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;