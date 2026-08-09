import React from "react";
import "./Blog1.css";

const blogPosts = [
  { title: "Top Reasons for Life Insurance Claim Rejection", date: "04 January 2024", readTime: "4 min read" },
  { title: "Best PSU Stocks in India", date: "29 December 2023", readTime: "5 min read" },
  { title: "Banking & Financial Services Fund", date: "18 December 2023", readTime: "7 min read" },
  { title: "INOX India IPO – Everything You Must Know", date: "11 December 2023", readTime: "4 min read" },
  { title: "Types of Banking Frauds – How to Prevent Them", date: "03 December 2023", readTime: "3 min read" },
  { title: "Popular Finance Podcasts in India", date: "30 November 2023", readTime: "5 min read" },
  { title: "Gandhar Oil Refinery IPO – Everything You Must Know", date: "31 December 2023", readTime: "5 min read" },
  { title: "IREDA IPO – Everything You Must Know", date: "20 December 2023", readTime: "4 min read" },
  { title: "Tata Technologies IPO – Everything You Must Know", date: "20 December 2023", readTime: "4 min read" },
  { title: "Best Pet Insurance Policies in India", date: "03 November 2023", readTime: "5 min read" },
  { title: "Best Fintech Stocks in India", date: "27 October 2023", readTime: "6 min read" },
  { title: "Best Stocks under Rs.5 in India", date: "20 October 2023", readTime: "5 min read" },
];

function Blog1() {
  return (

    <div className="blog-container">
      <div className="breadcrumb">
        <span className="breadcrumb-home">Home</span>
        <span className="breadcrumb-arrow">{'>'}</span>
        <span className="breadcrumb-current">Blogs</span>
      </div>
      <h1>BLUESTOCK BLOG</h1>
      <div className="blog-grid">

        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <a href="/DetailedBlog">
              <div className="blog-image">
              </div>  </a>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.date} • {post.readTime}</p>
            </div>
          </div>
        ))}

      </div>


      <div className="pagination">
        <span>&lt;</span>
        <span className="page-number active">1</span>
        <span className="page-number">2</span>
        <span className="page-number">3</span>
        <span className="page-number">4</span>
        <span className="page-number">5</span>
        <span>&gt;</span>
      </div>
    </div>
  );
}

export default Blog1;
