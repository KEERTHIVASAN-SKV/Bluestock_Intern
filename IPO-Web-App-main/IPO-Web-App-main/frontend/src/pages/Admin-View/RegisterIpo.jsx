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
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [rhpPdf, setRhpPdf] = useState("");
  const [drhpPdf, setDrhpPdf] = useState("");

  const [ipos, setIpos] = useState([]);
  const [selectedIpoId, setSelectedIpoId] = useState(null);

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

    // Validate required fields
    if (!companyName || !openDate || !closeDate || !issueSize || status === "Select" || issueType === "Select") {
      alert("Please fill in all required fields");
      return;
    }

    // Validate date sequence: open_date <= close_date <= listing_date
    if (openDate && closeDate && openDate > closeDate) {
      alert("Validation Error: Close date must be greater than or equal to Open date (Open Date <= Close Date).");
      return;
    }
    if (closeDate && listingDate && closeDate > listingDate) {
      alert("Validation Error: Listing date must be greater than or equal to Close date (Close Date <= Listing Date).");
      return;
    }
    if (openDate && listingDate && openDate > listingDate) {
      alert("Validation Error: Listing date must be greater than or equal to Open date (Open Date <= Listing Date).");
      return;
    }

    // Build request object matching Django serializer format
    const ipoData = {
      company: {
        company_name: companyName,
        company_logo: logoUrl || ""
      },
      price_band: issueSize,
      open_date: openDate,
      close_date: closeDate,
      issue_size: issueSize,
      issue_type: issueType,
      listing_date: listingDate || closeDate || openDate,
      status: status,
      ipo_price: parseFloat(ipoPrice) || 0,
      listing_price: parseFloat(listingPrice) || 0,
      listing_gain: parseFloat(listingGain) || 0,
      current_market_price: parseFloat(cmp) || 0,
      current_return: parseFloat(currentReturn) || 0
    };

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("You are not logged in. Please login again.");
        navigate('/login');
        return;
      }

      let savedIpoId = selectedIpoId;

      if (selectedIpoId) {
        // Update existing IPO
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/ipos/${selectedIpoId}/`,
          ipoData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        );
        console.log("IPO updated:", response.data);
        savedIpoId = response.data.id || selectedIpoId;
        alert("IPO updated successfully!");
      } else {
        // Create new IPO
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/ipos/",
          ipoData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        );
        console.log("IPO created:", response.data);
        savedIpoId = response.data.id;
        alert("IPO created successfully!");
      }

      // Save or update RHP/DRHP Documents if provided
      if (savedIpoId && (rhpPdf || drhpPdf)) {
        try {
          const docResp = await axios.get(`http://127.0.0.1:8000/api/v1/documents/?ipo=${savedIpoId}`);
          if (docResp.data && docResp.data.length > 0) {
            const existingDocId = docResp.data[0].id;
            await axios.put(
              `http://127.0.0.1:8000/api/v1/documents/${existingDocId}/`,
              { ipo: savedIpoId, rhp_pdf: rhpPdf, drhp_pdf: drhpPdf },
              { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
            );
          } else {
            await axios.post(
              "http://127.0.0.1:8000/api/v1/documents/",
              { ipo: savedIpoId, rhp_pdf: rhpPdf, drhp_pdf: drhpPdf },
              { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
            );
          }
        } catch (docError) {
          console.error("Error saving documents:", docError);
        }
      }

      fetchIpos();
      resetForm();
    } catch (error) {
      console.error("Error saving IPO:", error.response?.data || error.message);
      const errorData = error.response?.data;
      let errorMsg = error.message;
      if (errorData) {
        if (typeof errorData === 'string') {
          errorMsg = errorData;
        } else if (errorData.detail) {
          errorMsg = errorData.detail;
        } else {
          errorMsg = Object.entries(errorData)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
            .join("\n");
        }
      }
      alert(`Error saving IPO:\n${errorMsg}`);
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
      fetchIpos();
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
    setLogo(null);
    setLogoUrl("");
    setRhpPdf("");
    setDrhpPdf("");
    setSelectedIpoId(null);
  };

  // Populate form fields for editing
  const handleEdit = (ipo) => {
    setCompanyName(ipo.company?.company_name || "");
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
    setLogoUrl(ipo.company?.company_logo || "");

    // Fetch existing documents for this IPO
    axios.get(`http://127.0.0.1:8000/api/v1/documents/?ipo=${ipo.id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setRhpPdf(res.data[0].rhp_pdf || "");
          setDrhpPdf(res.data[0].drhp_pdf || "");
        } else {
          setRhpPdf("");
          setDrhpPdf("");
        }
      })
      .catch(() => {
        setRhpPdf("");
        setDrhpPdf("");
      });
  };

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar className={sidebarOpen ? "open" : ""}>
        <Logo>Bluestock Fintech</Logo>
        <Menu>
          <MenuItem>
            <a href="/dashboard">Dashboard</a>
          </MenuItem>
          <MenuItem>
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

        <ContentWrapper>
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
                  <label>Open Date</label>
                  <Input
                    type="date"
                    value={openDate}
                    onChange={(e) => setOpenDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Close Date</label>
                  <Input
                    type="date"
                    value={closeDate}
                    min={openDate || undefined}
                    onChange={(e) => setCloseDate(e.target.value)}
                    required
                  />
                  {openDate && closeDate && openDate > closeDate && (
                    <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px", display: "block" }}>
                      ⚠️ Close date must be on or after Open date
                    </span>
                  )}
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
                    type="date"
                    value={listingDate}
                    min={closeDate || openDate || undefined}
                    onChange={(e) => setListingDate(e.target.value)}
                    required
                  />
                  {((closeDate && listingDate && closeDate > listingDate) || (openDate && listingDate && openDate > listingDate)) && (
                    <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px", display: "block" }}>
                      ⚠️ Listing date must be on or after Close date
                    </span>
                  )}
                </div>
                <div>
                  <label>Status</label>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option>Select</option>
                    <option>Upcoming</option>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Listed</option>
                  </Select>
                </div>
              </FormGroupGrid>

              <h3>IPO Prospectus Documents (URL-based Files)</h3>
              <FormGroupGrid>
                <div>
                  <label>RHP Document URL</label>
                  <Input
                    type="url"
                    placeholder="https://.../rhp.pdf"
                    value={rhpPdf}
                    onChange={(e) => setRhpPdf(e.target.value)}
                  />
                </div>
                <div>
                  <label>DRHP Document URL</label>
                  <Input
                    type="url"
                    placeholder="https://.../drhp.pdf"
                    value={drhpPdf}
                    onChange={(e) => setDrhpPdf(e.target.value)}
                  />
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
          <ListSection>
            <h2>IPO List</h2>
            <ListContainer>
              {ipos.length === 0 ? (
                <EmptyState>No IPOs found. Create a new one to get started.</EmptyState>
              ) : (
                <ul>
                  {ipos.map((ipo) => (
                    <ListItem key={ipo.id}>
                      <ListItemContent>
                        <CompanyInfo>
                          <strong>{ipo.company.company_name}</strong>
                          <StatusLabel>{ipo.status}</StatusLabel>
                        </CompanyInfo>
                      </ListItemContent>
                      <ListItemActions>
                        <Button
                          onClick={() => handleEdit(ipo)}
                          className="edit"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(ipo.id)}
                          className="delete"
                        >
                          Delete
                        </Button>
                      </ListItemActions>
                    </ListItem>
                  ))}
                </ul>
              )}
            </ListContainer>
          </ListSection>
        </ContentWrapper>
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
  overflow-y: auto;
  
  &.open {
    left: 0;
  }

  @media (min-width: 768px) {
    position: static;
    left: 0;
    margin-top: 0;
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
  color: #1a1a1a;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 12px;
  cursor: pointer;
  color: #1a1a1a;
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
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
  padding: 0;
  background: #f5f5f5;
  transition: margin-left 0.3s ease;
  margin-left: 0;
  overflow-y: auto;
  max-height: 100vh;

  @media (min-width: 768px) {
    margin-left: 250px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #1a1a1a;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #eee;
  padding: 8px 15px;
  border-radius: 4px;
  flex: 1;
  margin: 0 20px;

  .search-icon {
    color: #999;
  }

  input {
    border: none;
    outline: none;
    background: none;
    margin-left: 10px;
    color: #333;
    font-size: 14px;
    width: 100%;
    
    &::placeholder {
      color: #999;
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1a1a1a;
  font-weight: 500;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 15px;
`;

const FormSection = styled.section`
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin: 30px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h2 {
    color: #1a1a1a;
    font-size: 24px;
    margin: 0 0 25px 0;
  }
  
  h3 {
    color: #1a1a1a;
    font-size: 18px;
    margin: 30px 0 15px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0;

  label {
    display: block;
    color: #1a1a1a;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

const FormGroupGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 0;

  div {
    flex: 1;
    min-width: 220px;

    label {
      display: block;
      color: #1a1a1a;
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    
    div {
      min-width: 100%;
    }
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  color: #333;
  font-size: 14px;
  background-color: #ffffff;
  box-sizing: border-box;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #685DFF;
    box-shadow: 0 0 0 2px rgba(104, 93, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  color: #333;
  background-color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  
  option {
    color: #333;
    background-color: white;
  }
  
  &:focus {
    outline: none;
    border-color: #685DFF;
    box-shadow: 0 0 0 2px rgba(104, 93, 255, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &.register {
    background: #28a745;
    color: white;
    flex: 1;
    
    &:hover {
      background: #218838;
    }
  }
  
  &.cancel {
    background: #dc3545;
    color: white;
    flex: 1;
    
    &:hover {
      background: #c82333;
    }
  }

  &.edit {
    background: #007bff;
    color: white;
    padding: 8px 16px;
    font-size: 12px;
    
    &:hover {
      background: #0056b3;
    }
  }

  &.delete {
    background: #dc3545;
    color: white;
    padding: 8px 16px;
    font-size: 12px;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    color: #685DFF;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ListSection = styled.section`
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin: 30px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h2 {
    color: #1a1a1a;
    font-size: 24px;
    margin: 0 0 20px 0;
  }
`;

const ListContainer = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const ListItem = styled.li`
  padding: 15px;
  background: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 12px;
  border-left: 4px solid #685DFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  &:hover {
    background: #f5f5f5;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ListItemContent = styled.div`
  flex: 1;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  strong {
    color: #1a1a1a;
    font-size: 16px;
  }
`;

const StatusLabel = styled.span`
  background: #685DFF;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const ListItemActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 600px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 16px;
`;
