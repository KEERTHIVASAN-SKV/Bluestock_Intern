import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../Home/Footer";

const IpoContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
  flex: 1;
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
  
  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 10px 0;
  }
  
  p {
    font-size: 16px;
    color: #666;
    margin: 0;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const FilterButton = styled.button`
  padding: 10px 24px;
  border: 2px solid ${props => props.active ? "#685DFF" : "#ddd"};
  background: ${props => props.active ? "#685DFF" : "white"};
  color: ${props => props.active ? "white" : "#333"};
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #685DFF;
    background: ${props => props.active ? "#685DFF" : "#f5f5f5"};
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const IpoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 6px;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const CompanyName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
`;

const StatusBadge = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  background: ${props => {
    switch(props.status) {
      case 'Upcoming': return '#E3F2FD';
      case 'Open': return '#FFF3E0';
      case 'Closed': return '#F3E5F5';
      case 'Listed': return '#E8F5E9';
      default: return '#f0f0f0';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'Upcoming': return '#1976D2';
      case 'Open': return '#F57C00';
      case 'Closed': return '#7B1FA2';
      case 'Listed': return '#388E3C';
      default: return '#666';
    }
  }};
  font-weight: 600;
  white-space: nowrap;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  word-break: break-word;

  &.status-not-issued {
    color: #999;
    font-style: italic;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 12px;
  border: 2px solid ${props => props.type === 'rhp' ? '#685DFF' : '#FF4444'};
  background: ${props => props.type === 'rhp' ? 'white' : '#FF4444'};
  color: ${props => props.type === 'rhp' ? '#685DFF' : 'white'};
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.type === 'rhp' ? '#685DFF' : '#E53535'};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 11px;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
`;

const LoadingState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
`;

function Ipo() {
  const [ipoList, setIpoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statuses = ["All", "Upcoming", "Open", "Closed", "Listed"];

  useEffect(() => {
    const fetchIpoData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/v1/ipos/");
        const data = await response.json();
        setIpoList(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch IPO data. Please try again later.");
        console.error("Error fetching IPO data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpoData();
  }, []);

  const filteredIpos = selectedStatus === "All" 
    ? ipoList 
    : ipoList.filter(ipo => ipo.status === selectedStatus);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not Issued") return "Not issued";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price) => {
    if (!price || price === "Not Issued") return "Not issued";
    return `₹${price}`;
  };

  const formatSize = (size) => {
    if (!size || size === "Not Issued") return "Not issued";
    if (typeof size === 'number') {
      if (size >= 10000000) return `${(size / 10000000).toFixed(2)} Cr.`;
      if (size >= 100000) return `${(size / 100000).toFixed(2)} Lakh`;
      return size.toString();
    }
    return size;
  };

  return (
    <>
      <IpoContainer>
        <Header>
          <h1>IPO Listings</h1>
          <p>Browse all available IPO opportunities and find detailed information about each company.</p>
        </Header>

        <FilterSection>
          {statuses.map(status => (
            <FilterButton
              key={status}
              active={selectedStatus === status}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </FilterButton>
          ))}
        </FilterSection>

        {loading ? (
          <GridContainer>
            <LoadingState>Loading IPO data...</LoadingState>
          </GridContainer>
        ) : error ? (
          <GridContainer>
            <EmptyState>{error}</EmptyState>
          </GridContainer>
        ) : filteredIpos.length === 0 ? (
          <GridContainer>
            <EmptyState>No IPOs found for this filter</EmptyState>
          </GridContainer>
        ) : (
          <GridContainer>
            {filteredIpos.map(ipo => (
              <IpoCard key={ipo.id}>
                <LogoSection>
                  <Logo 
                    src={ipo.company?.company_logo} 
                    alt={ipo.company?.company_name}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/48'} 
                  />
                  <div style={{ flex: 1 }}>
                    <CompanyName>{ipo.company?.company_name}</CompanyName>
                  </div>
                  <StatusBadge status={ipo.status}>{ipo.status}</StatusBadge>
                </LogoSection>

                <InfoGrid>
                  <InfoBox>
                    <InfoLabel>Price Band</InfoLabel>
                    <InfoValue>{ipo.price_band || "Not issued"}</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoLabel>Open</InfoLabel>
                    <InfoValue>{formatDate(ipo.open_date)}</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoLabel>Close</InfoLabel>
                    <InfoValue>{formatDate(ipo.close_date)}</InfoValue>
                  </InfoBox>
                </InfoGrid>

                <InfoGrid>
                  <InfoBox>
                    <InfoLabel>Issue Size</InfoLabel>
                    <InfoValue>{formatSize(ipo.issue_size)}</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoLabel>Issue Type</InfoLabel>
                    <InfoValue>{ipo.issue_type || "Not issued"}</InfoValue>
                  </InfoBox>
                  <InfoBox>
                    <InfoLabel>Listing Date</InfoLabel>
                    <InfoValue>{formatDate(ipo.listing_date)}</InfoValue>
                  </InfoBox>
                </InfoGrid>

                <ButtonGroup>
                  <ActionButton type="rhp" disabled>
                    RHP
                  </ActionButton>
                  <ActionButton type="drhp" disabled>
                    DRHP
                  </ActionButton>
                </ButtonGroup>
              </IpoCard>
            ))}
          </GridContainer>
        )}
      </IpoContainer>
      <Footer />
    </>
  );
}

export default Ipo;
