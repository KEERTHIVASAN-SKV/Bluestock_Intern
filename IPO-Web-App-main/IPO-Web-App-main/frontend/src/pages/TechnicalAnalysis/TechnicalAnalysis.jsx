import React from "react";
import styled from "styled-components";

const TechnicalAnalysis = () => {
  const topics = [
    { title: "Basics of Technical Analysis", description: "Learn about the fundamentals of charts, trends, and market movements.", views: "97,653", icon: "📊" },
    { title: "Candlestick Charts & Patterns", description: "Learn about different candlestick patterns and their meanings.", views: "56,231", icon: "🕯️" },
    { title: "Chart Patterns", description: "Explore various price patterns like head and shoulders, flags, and triangles.", views: "78,501", icon: "📈" },
    { title: "Technical Indicators", description: "Discover RSI, MACD, Bollinger Bands, and other technical indicators.", views: "66,429", icon: "📉" },
    { title: "Magic of Moving Averages", description: "Explore how moving averages help predict trends.", views: "48,715", icon: "📊" },
    { title: "The World of Fibonacci", description: "Understand Fibonacci retracements and extensions in trading.", views: "59,002", icon: "🔢" },
    { title: "Basics of Elliott Wave", description: "Learn the wave theory and its application in markets.", views: "29,116", icon: "🌊" },
    { title: "Point and Figure Charts", description: "Understand non-time-based charts for trend analysis.", views: "40,029", icon: "📍" },
    { title: "Swing Trading", description: "Discover strategies for short-term trading opportunities.", views: "70,386", icon: "🔄" },
    { title: "Intraday Trading", description: "Gain an in-depth understanding of day trading strategies.", views: "65,327", icon: "📅" },
    { title: "Trading Psychology", description: "Learn about emotions, discipline, and risk management in trading.", views: "58,042", icon: "🧠" },
    { title: "Investment Analysis", description: "Analyze markets with fundamental and technical aspects.", views: "71,025", icon: "📉" },
    { title: "Algo Trading", description: "Discover AI-driven, algorithmic trading strategies.", views: "47,682", icon: "🤖" },
  ];

  return (
    <Container>
      <Header>
        <h1>Technical Analysis</h1>
      </Header>
      <Grid>
        {topics.map((topic, index) => (
          <Card key={index}>
            <Icon>{topic.icon}</Icon>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <Meta>
              <span>👁 {topic.views} views</span>
              <a href="#">View Details &gt;&gt;</a>
            </Meta>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default TechnicalAnalysis;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  text-align: left;
  padding: 20px 0;
  font-size: 24px;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Meta = styled.div`
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

