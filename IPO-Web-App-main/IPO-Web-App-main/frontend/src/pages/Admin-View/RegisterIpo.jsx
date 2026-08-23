import React, { useState, useEffect, useContext } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

const RegisterIpo = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if user is logged in and is admin
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("You must be logged in as admin to register IPOs");
      navigate('/login');
      return;
    }
    // For now, assume anyone with a token is admin
    // In production, decode JWT to verify is_staff
    setIsAdmin(true);
  }, [navigate]);

  // State for form inputs
  const [companyName, setCompanyName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [issueSize, setIssueSize] = useState("");
  const [issueType, setIssueType] = useState("Select");
  const [listingDate, setListingDate] = useState("");
  const [status, setStatus] = useState("Select");
  const [ipoPrice, setIpoPrice] = useState("");
  const [listingPrice, setListingPrice] = useState("");
  const [listingGain, setListingGain] = useState("");
  const [cmp, setCmp] = useState("");
  const [currentReturn, setCurrentReturn] = useState("");
  const [logo, setLogo] = useState(null); // State for logo file
  const [logoUrl, setLogoUrl] = useState(""); // State for logo URL

  const [ipos, setIpos] = useState([]); // State to store IPO data
  const [selectedIpoId, setSelectedIpoId] = useState(null); // State to track selected IPO for update/delete

  // Fetch IPO data from the backend
  useEffect(() => {
    fetchIpos();
  }, []);

  const fetchIpos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/ipos/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setIpos(response.data);
    } catch (error) {
      console.error("Error fetching IPOs:", error);
      alert("Error fetching IPOs. Please log in again.");
    }
  };

  // Handle form submission (Create or Update IPO)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build request object matching Django serializer format
    const ipoData = {
      company: {
        company_name: companyName,
        company_logo: logoUrl || ""
      },
      price_band: issueSize, // price_band in Django
      open_date: openDate,
      close_date: closeDate,
      issue_size: issueSize,
      issue_type: issueType,
      listing_date: listingDate,
      status: status,
      ipo_price: parseFloat(ipoPrice) || 0,
      listing_price: parseFloat(listingPrice) || 0,
      listing_gain: parseFloat(listingGain) || 0,
      current_market_price: parseFloat(cmp) || 0,
      current_return: parseFloat(currentReturn) || 0
    };

    try {
      if (selectedIpoId) {
        // Update existing IPO
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/ipos/${selectedIpoId}/`,
          ipoData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );
        console.log("IPO updated:", response.data);
        alert("IPO updated successfully!");
      } else {
        // Create new IPO
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/ipos/",
          ipoData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );
        console.log("IPO created:", response.data);
        alert("IPO created successfully!");
      }
      fetchIpos(); // Refresh IPO list
      resetForm(); // Clear form fields
    } catch (error) {
      console.error("Error saving IPO:", error);
      alert("Error saving IPO. Make sure you're logged in as admin.");
    }
  };

  // Handle IPO deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this IPO?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/ipos/${id}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      fetchIpos(); // Refresh IPO list
      alert("IPO deleted successfully");
    } catch (error) {
      console.error("Error deleting IPO:", error);
      alert("Error deleting IPO. You must be admin.");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setCompanyName("");
    setOpenDate("");
    setCloseDate("");
    setIssueSize("");
    setIssueType("Select");
    setListingDate("");
    setStatus("Select");
    setIpoPrice("");
    setListingPrice("");
    setListingGain("");
    setCmp("");
    setCurrentReturn("");
    setLogo(null); // Reset logo
    setLogoUrl(""); // Reset logo URL
    setSelectedIpoId(null);
  };

  // Populate form fields for editing
  const handleEdit = (ipo) => {
    setCompanyName(ipo.company.company_name || "");
    setOpenDate(ipo.open_date || "");
    setCloseDate(ipo.close_date || "");
    setIssueSize(ipo.issue_size || "");
    setIssueType(ipo.issue_type || "Select");
    setListingDate(ipo.listing_date || "");
    setStatus(ipo.status || "Select");
    setIpoPrice(ipo.ipo_price || "");
    setListingPrice(ipo.listing_price || "");
    setListingGain(ipo.listing_gain || "");
    setCmp(ipo.current_market_price || "");
    setCurrentReturn(ipo.current_return || "");
    setSelectedIpoId(ipo.id);
    setLogoUrl(ipo.company.company_logo || "");
  };

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoUrl(URL.createObjectURL(file)); // Preview the uploaded logo
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar className={sidebarOpen ? "open" : ""}>
        <Logo>Bluestock Fintech</Logo>
        <Menu>
          <MenuItem>
          <a href="/dashboard">Dashboard</a></MenuItem>
          <MenuItem >
          <a href="/manageipo">Manage IPO</a>
        </MenuItem>
          <MenuItem>IPO Subscription</MenuItem>
          <MenuItem>IPO Allotment</MenuItem>
        </Menu>
        <OtherMenu>
          <MenuItem>Settings</MenuItem>
          <MenuItem>API Manager</MenuItem>
          <MenuItem>Accounts</MenuItem>
          <MenuItem>Help</MenuItem>
        </OtherMenu>
      </Sidebar>

      {/* Overlay for smaller screens */}
      {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <MainContent>
        <Header>
          <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </MenuButton>
          <SearchBar>
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search" />
          </SearchBar>
          <UserProfile>
            <AiOutlineUser /> Hi, Vishal
          </UserProfile>
        </Header>

        <FormSection>
          <h2>Enter IPO Details</h2>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Company Logo</label>
              <CompanyLogo>
                <img
                  src={logoUrl || "logo-placeholder.png"}
                  alt="Company Logo"
                />
                <div>
                  <input
                    type="file"
                    id="logo-upload"
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                  />
                  <label htmlFor="logo-upload" className="upload">
                    Upload Logo
                  </label>
                  <Button className="delete" onClick={() => setLogo(null)}>
                    Delete
                  </Button>
                </div>
              </CompanyLogo>
            </FormGroup>

            <FormGroup>
              <label>Company Name</label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroupGrid>
              <div>
                <label>Open</label>
                <Input
                  type="text"
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Close</label>
                <Input
                  type="text"
                  value={closeDate}
                  onChange={(e) => setCloseDate(e.target.value)}
                  required
                />
              </div>
            </FormGroupGrid>

            <FormGroupGrid>
              <div>
                <label>Issue Size</label>
                <Input
                  type="text"
                  value={issueSize}
                  onChange={(e) => setIssueSize(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Issue Type</label>
                <Select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  required
                >
                  <option>Select</option>
                  <option>Book Built</option>
                  <option>Fixed Price</option>
                </Select>
              </div>
            </FormGroupGrid>

            <FormGroupGrid>
              <div>
                <label>Listing Date</label>
                <Input
                  type="text"
                  value={listingDate}
                  onChange={(e) => setListingDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Status</label>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option>Select</option>
                  <option>Ongoing</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                </Select>
              </div>
            </FormGroupGrid>

            <h3>New Listed IPO Details (When IPO Gets Listed)</h3>
            <FormGroupGrid>
              <div>
                <label>IPO Price</label>
                <Input
                  type="text"
                  value={ipoPrice}
                  onChange={(e) => setIpoPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Listing Price</label>
                <Input
                  type="text"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  required
                />
              </div>
            </FormGroupGrid>

            <FormGroupGrid>
              <div>
                <label>Listing Gain</label>
                <Input
                  type="text"
                  value={listingGain}
                  onChange={(e) => setListingGain(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Listing Date</label>
                <Input
                  type="text"
                  value={listingDate}
                  onChange={(e) => setListingDate(e.target.value)}
                  required
                />
              </div>
            </FormGroupGrid>

            <FormGroupGrid>
              <div>
                <label>CMP</label>
                <Input
                  type="text"
                  value={cmp}
                  onChange={(e) => setCmp(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Current Return</label>
                <Input
                  type="text"
                  value={currentReturn}
                  onChange={(e) => setCurrentReturn(e.target.value)}
                  required
                />
              </div>
            </FormGroupGrid>

            <ButtonGroup>
              <Button type="submit" className="register">
                {selectedIpoId ? "Update" : "Register"}
              </Button>
              <Button type="button" className="cancel" onClick={resetForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </form>
        </FormSection>

        {/* Display IPO List */}
        <div style={{ marginTop: "20px", color: "black" }}>
          <h2 style={{ color: "black" }}>IPO List</h2>
          <ul>
            {ipos.map((ipo) => (
              <li key={ipo.id} style={{ marginBottom: "10px", color: "black" }}>
                <strong>{ipo.company.company_name}</strong> - {ipo.status}
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleEdit(ipo)}
                >
                  Edit
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(ipo.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </MainContent>
    </Container>
  );
};

export default RegisterIpo;

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #f4f4f4;
  padding: 20px;
  position: fixed;
  height: 100vh;
  left: -260px;
  transition: left 0.3s ease;
  z-index: 1000;
  margin-top: 70px;
  &.open {
    left: 0;
  }

  @media (min-width: 768px) {
    position: static;
    left: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover,
  &.active {
    background: #ddd;
    border-radius: 5px;
  }
`;

const OtherMenu = styled.div`
  margin-top: 20px;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background: #fff;
  transition: margin-left 0.3s ease;
  margin-left: 0;

  @media (min-width: 768px) {
    margin-left: 250px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #eee;
  padding: 5px 10px;
  border-radius: 4px;

  input {
    border: none;
    outline: none;
    background: none;
    margin-left: 10px;
    color: black;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;
`;

const FormSection = styled.section`
  padding: 20px;
  background: #fff;

  h2, h3 {
    color: black;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    color: black;
    font-weight: 500;
    margin-bottom: 5px;
  }
`;

const FormGroupGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  div {
    flex: 1;
    min-width: 150px;

    label {
      display: block;
      color: black;
      font-weight: 500;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  color: black;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  color: black;
  background-color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  &.register {
    background: #28a745;
    color: white;
  }
  &.cancel {
    background: #dc3545;
    color: white;
  }
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    color: black;
    cursor: pointer;
  }
`;