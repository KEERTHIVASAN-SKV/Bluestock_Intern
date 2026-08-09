import React from "react";

const fundCategories = ["Equity", "Debt", "Hybrid", "Commodity", "Other"];

const mutualFunds = [
  {
    name: "Canara Rob Bluechip Equity Fund",
    aum: "₹ 10,816.61 Cr.",
    expenseRatio: "0.5%",
    cagr: "18.48%",
    logo: "https://s3-alpha-sig.figma.com/img/a07e/bbec/0aa130a09c63d7cba126801ceb49abfb?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PsJJZfJnRPGt1X3k9ZjJKG314wZJW9JyDc6C1S-j0YtM6EzeK3VIRUMYBAqHYX0zH1M2iJG7faYkuwmdq3r92DwCFHywJ812te8ua9wr3ItdcHP1gxgHUGGtFX85DGo6LiHAkLas5VIa6PoAKsxn01EFN4O3wQvzduZcf7HeA~-a5EZM7Q8cx9u1qXTSplhKuU-UxV1DCB5Cc1jfLFBoISDjAbNa~4YJtj76pokynBp32pX8hNHdrmCQfze3QFSUWjZexXn382tBmatTpEOCG-wO0r4CS-Kg29OFkcxvHqfqXpe7oeTOOhbunINbg4ekGsMVguiu3d1bd8zaczXQvA__",
    performance: "The fund’s annualised performance has been 15.3% since inception.",
    risk: "The fund has been categorised as Very High by SEBI and has a standard deviation of 9.09% vs its category average of 9.61%.",
    composition: "Large Cap makes up for the majority of the fund at 89.57% along with the largest allocation towards Private Banks at 22.27%.",
  },
  {
    name: "Baroda BNP Paribas Large Cap Fund",
    aum: "₹ 1,693.42 Cr.",
    expenseRatio: "0.92%",
    cagr: "18.19%",
    logo: "https://s3-alpha-sig.figma.com/img/3f19/a099/bac31a3e4a95fee49bf5ba6b2f8ddc8f?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=firomzP79qzbeJ64S-7G~kNVK6vIkmMvZW-sVh2gpItLpM0NLdODGDUOx8uLWb4~dn5n0DoVOC6lvZd8s8TXEQETVgZot~0WIwPe2-yDURR2mHM10uMeDpeelqCGDgV3mtMS1Wmhypfk~7b07mCdXQkoyoyWoJ1-nRiFo3aw54UVWY3s0WvaccHyyMam4tW3aGQeUndG5nKS3-5XxQx8y9vVvCLXtJybeyPOxRvCv8iJ3tXnbeoX5RqnE50~FmIL252HtYEqVhUb0~dzlj5nA8iDzfRc9w0SMqAU9vO0dsuA9IxlKtRGdOMjLCHKrDqhK9ubagqJhKHDddTSGClE8w__",
    performance: "The fund’s annualised performance has been 15.3% since inception.",
    risk: "The fund has been categorised as Very High by SEBI and has a standard deviation of 9.05% vs its category average of 9.61%.",
    composition: "Large Cap makes up for the majority of the fund at 78.74% along with the largest allocation towards Private Banks at 18.98%.",
  },
];

const MutualFund = () => {
  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="title">Large Cap Mutual Funds</h1>
          <p className="description">
            Large Cap funds invest in stocks of the top 100 companies in terms of full market capitalization.
            They invest at least 80% of their assets in large cap companies. These funds are relatively less
            risky than other market cap funds.
          </p>
        </div>
      </div>

      <h2 className="sectionTitle">Overview of Large Cap Mutual Funds</h2>

      <div className="content">
        <div className="sidebar">
          <h3>Fund categories</h3>
          {fundCategories.map((category, index) => (
            <div key={index} className="category">
              {category} <span>▼</span>
            </div>
          ))}
        </div>

        <div className="fundsContainer">
          {mutualFunds.map((fund, index) => (
            <div key={index} className="fundCard">
              <div className="fundHeader">
                <img src={fund.logo} alt={fund.name} className="logo" />
                <div>
                  <h3 className="fundName">{fund.name}</h3>
                  <p><strong>AUM:</strong> {fund.aum} &nbsp;&nbsp; <strong>Expense Ratio:</strong> {fund.expenseRatio}</p>
                  <p className="cagr"><strong>5Y CAGR:</strong> <span className="greenText">▲ {fund.cagr}</span></p>
                </div>
              </div>
              <hr className="divider" />
              <p><strong>Performance:</strong> {fund.performance}</p>
              <p className="risk"><strong>Risk:</strong> {fund.risk}</p>
              <p><strong>Composition:</strong> {fund.composition}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .container {
          font-family: Arial, sans-serif;
          padding: 20px;
          margin-top: 6%;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          flex-wrap: wrap;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
        }
        .description {
          font-size: 14px;
          color: #555;
          max-width: 600px;
        }
        .sectionTitle {
          font-size: 22px;
          font-weight: bold;
          margin-top: 30px;
        }
        .content {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .sidebar {
          background: #eaeaea;
          padding: 15px;
          border-radius: 10px;
          width: 100%;
          max-width: 200px;
        }
        .category {
          font-size: 16px;
          padding: 10px;
          border-bottom: 1px solid #ccc;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        }
        .fundsContainer {
          flex: 1;
          display: grid;
          gap: 15px;
          width: 100%;
        }
        .fundCard {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .fundHeader {
          display: flex;
          align-items: center;
        }
        .logo {
          width: 50px;
          height: 50px;
          margin-right: 15px;
        }
        .fundName {
          font-size: 18px;
          font-weight: bold;
        }
        .cagr {
          font-size: 14px;
          margin-top: 5px;
        }
        .greenText {
          color: green;
          font-weight: bold;
        }
        .risk {
          color: red;
        }
        .divider {
          margin: 10px 0;
          border: 0.5px solid #ddd;
        }
        @media (max-width: 768px) {
          .header {
          width :90%;
          margin-top:100px;
            
          }
          .content {
            width:100%;
          }
          .sidebar {
            width: 100%;
          }
          .fundHeader {
            
          }
          .logo {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default MutualFund;
