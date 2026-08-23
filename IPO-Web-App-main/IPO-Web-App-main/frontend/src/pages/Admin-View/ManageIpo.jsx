import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiSettings, FiHelpCircle } from "react-icons/fi";
import { AiOutlineUser, AiOutlineAppstore } from "react-icons/ai";
import { BsGraphUp, BsBuilding, BsTrash, BsEye } from "react-icons/bs";
import styled, { keyframes } from "styled-components";

const ManageIpo = () => {
  const [user, setUser] = useState({ name: "Guest" }); // Default user data
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is admin

  const [ipoList, setIpoList] = useState([]);

  useEffect(() => {
    const fetchIpos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/ipos/");
        setIpoList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching IPO data:", error);
      }
    };

    fetchIpos();
    
    // Check if user is admin from localStorage or token
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Try to decode JWT to check if user is staff
      // For now, assume admin if logged in - can improve with JWT decoding
      setIsAdmin(true);
    }
  }, []);


  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/1"); // Replace "1" with the actual user ID
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const deleteIPO = async (id) => {
    if (!window.confirm("Are you sure you want to delete this IPO?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/ipos/${id}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setIpoList((prev) => prev.filter((ipo) => ipo.id !== id));
      alert("IPO deleted successfully");
    } catch (error) {
      console.error("Error deleting IPO:", error);
      alert("Error deleting IPO. Permission denied.");
    }
  };


  return (
    <Container>
      <Sidebar>
        <Logo>BF Bluestock Fintech</Logo>
        <Menu>
          <MenuItem>
            <AiOutlineAppstore />
            <a href="/dashboard">Dashboard</a>
          </MenuItem>
          <MenuItem className="active">
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
          <SearchWrapper>
            <FiSearch className="search-icon" />
            <SearchBar type="text" placeholder="Search" />
          </SearchWrapper>
          <UserProfile>
            <AiOutlineUser /> Hi, {user.name} {/* Display user's name */}
          </UserProfile>
        </Header>
        <Title>Upcoming IPO | Dashboard</Title>
        <Table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Price Band</th>
              <th>Open</th>
              <th>Close</th>
              <th>Issue Size</th>
              <th>Issue Type</th>
              <th>Listing Date</th>
              <th>Status</th>
              <th>Delete/Add</th>
            </tr>
          </thead>
          <tbody>
            {ipoList.map((ipo) => (
              <TableRow key={ipo.id}>
                <td>{ipo.company?.company_name || "-"}</td>
                <td>{ipo.price_band || "-"}</td>
                <td>{ipo.open_date || "-"}</td>
                <td>{ipo.close_date || "-"}</td>
                <td>{ipo.issue_size || "-"}</td>
                <td>{ipo.issue_type || "-"}</td>
                <td>{ipo.listing_date || "-"}</td>
                <td>
                  <Status className={ipo.status?.toLowerCase()}>{ipo.status}</Status>
                </td>
                <td>
                  {isAdmin && (
                    <BsTrash
                      className="delete"
                      onClick={() => deleteIPO(ipo.id)}
                      style={{ cursor: "pointer", color: "#dc3545"}}
                      title="Delete IPO"
                    />
                  )}
                  <AddButton style={{marginLeft:'40px'}}>
                    <a href="/registeripo" style={{color:'black'}}>Add</a>
                  </AddButton>
                </td>
              </TableRow>
            ))}
          </tbody>

        </Table>
      </MainContent>
    </Container>
  );
};

export default ManageIpo;

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

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f8f9fa;
  padding-top:60px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #2b2d42;
  color: white;
  padding: 20px;
  margin-top: 60px;
  animation: ${slideIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 60px;
    padding: 10px;
    animation: none;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover,
  &.active {
    background: #8d99ae;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-top: 60px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-top:50px;
  width:625px;
  height:32px;

  color:rgba(98, 123, 135, 1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 8px;
  width:500px;
  height:32px;

  
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBar = styled.input`
  border: none;
  outline: none;
  margin-left: 10px;
  color:rgba(246, 246, 251, 1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h2`
  color:rgba(31, 56, 76, 1);
  margin-top: -20px;
  font-size:18px;
  font-weight:500;
  line-height:23px;

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color:black;
  }

  th {
    background: #8d99ae;
    color: white;
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    width: 100%;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background: #edf2f4;
  }
`;

const Status = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  &.ongoing {
    background: #38b000;
    color: white;
  }
  &.comming {
    background: #ffcc00;
    color: black;
  }
  &.new {
    background: #ff4d4d;
    color: white;
  }
`;

const AddButton = styled.button`
  background: #28a745;
  color: red;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: #218838;
  }

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;

const Others = styled(Menu)`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;