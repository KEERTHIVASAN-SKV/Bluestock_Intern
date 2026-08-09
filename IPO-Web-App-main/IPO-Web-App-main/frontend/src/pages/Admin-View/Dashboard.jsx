import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {useNavigate} from "react-router-dom";
import { FiSearch, FiSettings, FiHelpCircle } from "react-icons/fi";
import { AiOutlineUser, AiOutlineAppstore } from "react-icons/ai";
import { BsGraphUp, BsBuilding } from "react-icons/bs";
import "./Dashboard.css";

const Dashboard = () => {
  const [ipos, setIpos] = useState([]);
  const [totalIpos, setTotalIpos] = useState(0);
  const [iposInGain, setIposInGain] = useState(0);
  const [iposInLoss, setIposInLoss] = useState(0);
  const [upcomingIpos, setUpcomingIpos] = useState(0);
  const [newListedIpos, setNewListedIpos] = useState(0);
  const [ongoingIpos, setOngoingIpos] = useState(0);
  const [quickLinks, setQuickLinks] = useState([]);
  const [user, setUser] = useState({ name: "Guest" }); // Default user data
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Sidebar>
        <Logo>Bluestock Fintech</Logo>
        <h3 className="menu-1">MENU</h3>
        <Menu>
          <MenuItem className="active">
            <AiOutlineAppstore /> Dashboard
          </MenuItem>
          <MenuItem>
            <BsGraphUp />
            <a href="/manageipo">Manage IPO</a>
          </MenuItem>
          <MenuItem>
            <BsBuilding /> IPO Subscription
          </MenuItem>
          <MenuItem>
            <AiOutlineUser /> IPO Allotment
          </MenuItem>
        </Menu>
        <Others>
          <h2 className="others">OTHERS</h2>
          <MenuItem>
            <FiSettings /> Settings
          </MenuItem>
          <MenuItem>
            <AiOutlineUser /> API Manager
          </MenuItem>
          <MenuItem>
            <BsBuilding /> Accounts
          </MenuItem>
          <MenuItem>
            <FiHelpCircle /> Help
          </MenuItem>
        </Others>
      </Sidebar>

      <MainContent>
        <Header>
          <SearchBar type="text" placeholder="Search" />
          <UserProfile>
            <AiOutlineUser /> Hi, User
          </UserProfile>
        </Header>

        <DashboardSection>
          <h1 className="iop">Dashboard</h1>
          <h1 className="iop-1">IOP Dashboard India</h1>
          <h4 className="ipo-2">20 IPO in Gain</h4>
          <DashboardContent>

            <BubbleChart>


              <Bubble className="total">
                {totalIpos}
                <br />
                Total IPO
              </Bubble>
              <Bubble className="gain">
                {iposInGain}
                <br />
                IPO in Gain
              </Bubble>
              <Bubble className="loss">
                {iposInLoss}
                <br />
                IPO in Loss
              </Bubble>
            </BubbleChart>

            <QuickLinks>
              <h3>Quick Links</h3>
              <p className="para">Adipiscing elit, sed do eiusmod tempor</p>
              <div className="list-1">
                <li >NSE India</li>
                <li>BSE India</li>
                <li>SEBI</li>
                <li>Money Control</li>
              </div>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <img src={link.logoUrl} alt={link.companyName} /> {link.companyName} - Visit Now
                  </li>
                ))}
              </ul>
            </QuickLinks>

            <MainBoardIPO>
              <h3>Main Board IPO</h3>
              <p>From 01 Jan 2024</p>
              <DonutChart>
                <Tooltip>Afternoon IPO NSE & BSE - {upcomingIpos}</Tooltip>
              </DonutChart>
              <IPOList>
                <IPOListItem>
                  <span>Upcoming:15</span> {upcomingIpos}
                </IPOListItem>
                <IPOListItem>
                  <span>New Listed:25</span> {newListedIpos}
                </IPOListItem>
                <IPOListItem>
                  <span>Ongoing:2</span> {ongoingIpos}
                </IPOListItem>
              </IPOList>
            </MainBoardIPO>
          </DashboardContent>
        </DashboardSection>
      </MainContent>
    </Container>
  );
};

export default Dashboard;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f9f9f9;
  padding-top: 30px;
  

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  background:rgba(241, 242, 247, 1);
  padding: 30px;
  color: rgba(39, 50, 64, 1);
  padding-left: 40px;
  padding-top: 90px;
  font-size:12px;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 10px;
  }
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 20px;
  color:rgba(90, 103, 186, 1);
  

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

const Others = styled(Menu)`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const MenuItem = styled.li`
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #34495e;
  }
  &.active {
    background: #34495e;
    border-left: 4px solid #3498db;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-top: 60px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
  }
`;

const SearchBar = styled.input`
  padding: 15px;
 
  width: 625px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  &:focus {
    border-color:rgba(98, 123, 135, 1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DashboardSection = styled.section`
  background: #fff;
  width: 1300px;
  // height:321px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const DashboardContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BubbleChart = styled.div`
  display: flex;
  gap: 30px;
  padding-top:100px;
  padding-left:30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Bubble = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  animation: ${bounce} 2s infinite;
  &:hover {
    transform: scale(1.1);
  }
  &.total {
    background: #3498db;
    color: white;
  }
  &.gain {
    background: #2ecc71;
    color: white;
  }
  &.loss {
    background: #e74c3c;
    color: white;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 14px;
  }
`;

const QuickLinks = styled.div`
  background:rgba(219, 229, 235, 1);
  width:312px;
  height:310px:
  
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  ul {
    list-style: none;
    padding: 0;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainBoardIPO = styled.div`
  background:rgba(219, 229, 235, 1);
  width:362px;
  height:322px:
  padding: 20px;
  display: "flex"; justifyContent: "center"; alignItems: "center";
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const DonutChart = styled.div`
  width: 120px;
  height: 120px;
  
  background: radial-gradient(circle, rgba(133, 147, 237, 1) 60%, #f0f0f0 40%);
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 5s linear infinite;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
`;

const IPOList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const IPOListItem = styled.li`
  padding: 15px;
  background: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateX(10px);
  }
  span {
    font-weight: bold;
    color: #3498db;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;