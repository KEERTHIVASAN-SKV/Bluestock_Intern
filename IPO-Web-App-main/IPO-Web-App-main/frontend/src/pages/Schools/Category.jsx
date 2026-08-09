import React from "react";
import styled from "styled-components";

const categories = [
  {
    title: "Basic Finance",
    description:
      "Learn to manage money, choose investments wisely, and achieve financial goals.",
    modules: 4,
    views: "504653",
    icon: "💰",
  },
  {
    title: "Beginners Stock Markets",
    description:
      "Learn stock market terminologies, macroeconomic indicators, IPOs, and more.",
    modules: 6,
    views: "392296",
    icon: "👨‍💼",
  },
  {
    title: "Stock Investing",
    description: "Explore stock investment basics, analysis, modelling, and strategies.",
    modules: 10,
    views: "300086",
    icon: "💵",
  },
  {
    title: "Technical Analysis",
    description: "Explore basic to advanced topics for effective trading.",
    modules: 13,
    views: "113362",
    icon: "📈",
  },
  {
    title: "Derivatives",
    description:
      "Become familiar with the principles and strategies of derivatives trading.",
    modules: 4,
    views: "325175",
    icon: "👀",
  },
  {
    title: "Mutual Funds",
    description: "Learn important mutual fund concepts for effective financial planning.",
    modules: 2,
    views: "71591",
    icon: "💸",
  },
  {
    title: "Banking & Insurance",
    description:
      "Learn the basics of banking and insurance for sound financial management.",
    modules: 8,
    views: "207262",
    icon: "🏦",
  },
  {
    title: "Financial Planning",
    description: "Learn about thorough financial planning strategies and services.",
    modules: 8,
    views: "135885",
    icon: "💳",
  },
  {
    title: "Cryptocurrency",
    description: "Gain insights into the world of cryptocurrencies and blockchain.",
    modules: 2,
    views: "21728",
    icon: "🪙",
  },
  {
    title: "Alternative Investments",
    description:
      "Explore various alternative investments like debt, commodity, gold, and more.",
    modules: 6,
    views: "71183",
    icon: "💼",
  },
  {
    title: "Book Summary",
    description: "Get summaries of popular finance books.",
    modules: 37,
    views: "740586",
    icon: "📖",
  },
];

const CategoryContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: auto;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CategoryCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CategoryIcon = styled.span`
  font-size: 40px;
  margin-right: 15px;
`;

const CategoryContent = styled.div`
  flex: 1;
`;

const CategoryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CategoryLink = styled.a`
  display: block;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Category = () => {
  return (
    <CategoryContainer>
      <h2>Categories</h2>
      <p>Begin your financial market education by exploring a variety of categories.</p>
      <CategoryGrid>
        {categories.map((category, index) => (
          <CategoryCard key={index}>
            <CategoryIcon aria-label={category.title}>{category.icon}</CategoryIcon>
            <CategoryContent>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <CategoryMeta>
                <span role="img" aria-label="Modules">📚 {category.modules} Modules</span>
                <span role="img" aria-label="Views">👁 {category.views} views</span>
              </CategoryMeta>
              <CategoryLink href="#">View Details &gt;&gt;</CategoryLink>
            </CategoryContent>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </CategoryContainer>
  );
};

export default Category;
