# 📊 Database Structure & Data Storage - Complete Guide

---

## 🎯 Quick Overview

The IPO Web Application stores data in **4 main tables**:

| Table | Purpose | Records |
|-------|---------|---------|
| **companies** | Company information | Multiple companies |
| **ipos** | IPO details & stock prices | Multiple IPOs per company |
| **documents** | RHP/DRHP PDF links | 1 per IPO |
| **applications** | User IPO applications | User subscriptions |

Plus **Django's built-in tables** for authentication and sessions.

---

## 📋 DATABASE SCHEMA (Detailed)

### TABLE 1: `companies`

**Purpose**: Stores company information

**Fields**:
```
id (Primary Key)          → Auto-increment ID
company_name (VARCHAR)    → Company name (max 255 chars)
company_logo (URL)        → Logo URL (max 500 chars)
created_at (DateTime)     → Auto-created timestamp
```

**Example Data**:
```
ID | Company Name        | Logo URL
---|---------------------|----------------------------------
1  | Adani Power         | https://example.com/adani-logo.png
2  | TCS Limited         | https://example.com/tcs-logo.png
3  | Reliance Industries | https://example.com/rel-logo.png
```

**Relationships**:
- ✅ One Company → Many IPOs (1:N)
- Connected to IPO table via `company_id`

---

### TABLE 2: `ipos` ⭐ (MAIN DATA TABLE)

**Purpose**: Stores all IPO and stock information

**Fields** (16 fields total):

```
id (Primary Key)           → Auto-increment ID
company_id (Foreign Key)   → Links to Company
price_band (VARCHAR)       → Price range e.g., "100-150"
open_date (DATE)           → IPO opens on this date
close_date (DATE)          → IPO closes on this date
issue_size (VARCHAR)       → Total issue e.g., "1000 Cr"
issue_type (VARCHAR)       → Type e.g., "Book Built"
listing_date (DATE)        → When stock listed on exchange
status (VARCHAR)           → 'Upcoming' | 'Open' | 'Closed' | 'Listed'
ipo_price (DECIMAL)        → IPO price when issued (STOCK PRICE 1)
listing_price (DECIMAL)    → Price at listing (STOCK PRICE 2)
listing_gain (DECIMAL)     → Gain % at listing
current_market_price (DECIMAL) → Current CMP (STOCK PRICE 3)
current_return (DECIMAL)   → Current return % (STOCK PRICE 4)
created_at (DateTime)      → Auto timestamp
updated_at (DateTime)      → Auto timestamp
```

**Example Data**:
```
ID | Company | Price Band | Open Date | Close Date | IPO Price | Listing Price | CMP
---|---------|-----------|-----------|-----------|-----------|---------------|-----
1  | Adani   | 329-136   | 2024-06-03| 2024-06-05| 383       | 435           | 410
2  | TCS     | 500-550   | 2024-08-01| 2024-08-05| 525       | 600           | 620
```

**Stock Price Information Stored**:
1. **IPO Price** → Initial offering price
2. **Listing Price** → Price on listing day
3. **Current Market Price (CMP)** → Current trading price
4. **Listing Gain** → % gain from IPO to listing
5. **Current Return** → % return from IPO to now

**Relationships**:
- ✅ Belongs to ONE Company (Foreign Key)
- ✅ ONE IPO → Many Documents (1:N)
- ✅ ONE IPO → Many Applications (1:N)

---

### TABLE 3: `documents`

**Purpose**: Stores RHP and DRHP PDF links

**Fields**:
```
id (Primary Key)      → Auto-increment ID
ipo_id (Foreign Key)  → Links to IPO
rhp_pdf (URL)         → Regulatory Prospectus PDF link
drhp_pdf (URL)        → Draft Regulatory Prospectus PDF link
created_at (DateTime) → Auto timestamp
```

**Example Data**:
```
ID | IPO ID | RHP PDF URL                      | DRHP PDF URL
---|--------|----------------------------------|----------------------------------
1  | 1      | https://example.com/rhp-adani.pdf | https://example.com/drhp-adani.pdf
2  | 2      | https://example.com/rhp-tcs.pdf   | https://example.com/drhp-tcs.pdf
```

**Relationships**:
- ✅ Belongs to ONE IPO (Foreign Key)

---

### TABLE 4: `applications`

**Purpose**: Tracks which users applied for which IPOs

**Fields**:
```
id (Primary Key)      → Auto-increment ID
user_id (Foreign Key) → Links to Django User
ipo_id (Foreign Key)  → Links to IPO
quantity (INT)        → Number of shares applied
status (VARCHAR)      → 'Applied' | 'Rejected' | 'Allotted' | etc.
created_at (DateTime) → Auto timestamp
```

**Example Data**:
```
ID | User ID | IPO ID | Quantity | Status
---|---------|--------|----------|----------
1  | 1       | 1      | 100      | Allotted
2  | 1       | 2      | 50       | Applied
3  | 2       | 1      | 200      | Rejected
```

**Relationships**:
- ✅ Belongs to ONE User (Foreign Key)
- ✅ Belongs to ONE IPO (Foreign Key)

---

### TABLE 5: `auth_user` (Django Built-in)

**Purpose**: Stores user accounts

**Fields**:
```
id (Primary Key)       → Auto-increment ID
username (VARCHAR)     → Unique username
password (VARCHAR)     → Hashed password
email (VARCHAR)        → User email
first_name (VARCHAR)   → First name
last_name (VARCHAR)    → Last name
is_staff (BOOLEAN)     → Is admin? (True/False)
is_active (BOOLEAN)    → Active account? (True/False)
date_joined (DateTime) → Registration date
last_login (DateTime)  → Last login date
```

**Example Data**:
```
ID | Username | Email              | Is Staff | Is Active
---|----------|-------------------|----------|----------
1  | admin    | admin@example.com  | True     | True
2  | user1    | user1@example.com  | False    | True
3  | user2    | user2@example.com  | False    | True
```

---

## 🗂️ Complete Database Relationship Diagram

```
Django User System:
├── auth_user (Users)
│   └── Multiple Users
│
IPO Management:
├── companies (Companies)
│   └── Many IPOs
│       ├── ipos (IPO Details + Stock Prices)
│       │   ├── Many Documents
│       │   │   └── documents (PDF Links)
│       │   └── Many Applications
│       │       └── applications (User Applications)
│       │           └── Links back to auth_user

Complete Flow:
auth_user (1) ─────┐
                   │ (1:N)
                   ▼
          applications (N)
                   │
                   │ (N:1)
                   ▼
           ipos (Stock Info)
            ▲      │
            │      │ (1:N)
            │      ▼
            │  documents (PDF)
          (N:1)
            │
            │ (N:1)
            │
        companies
```

---

## 📊 STOCK DATA - WHERE IT'S STORED

### Stock Price Information Stored in `ipos` Table

**Four Types of Stock Prices**:

1. **IPO Price** (Column: `ipo_price`)
   - Offer price during IPO subscription
   - Example: ₹383
   - Stored as: DECIMAL(10, 2)

2. **Listing Price** (Column: `listing_price`)
   - Opening price on listing day
   - Example: ₹435
   - Stored as: DECIMAL(10, 2)

3. **Listing Gain** (Column: `listing_gain`)
   - % gain from IPO to listing = (listing_price - ipo_price) / ipo_price * 100
   - Example: 13.58%
   - Stored as: DECIMAL(5, 2)

4. **Current Market Price (CMP)** (Column: `current_market_price`)
   - Latest market price
   - Example: ₹410
   - Stored as: DECIMAL(10, 2)

5. **Current Return** (Column: `current_return`)
   - % return from IPO to now = (current_market_price - ipo_price) / ipo_price * 100
   - Example: 7.05%
   - Stored as: DECIMAL(5, 2)

### Real-Time Stock Data (NOT Stored)

**Market Data Endpoint**: `/api/v1/stock/`

This endpoint fetches **real-time data from NSE** (National Stock Exchange):
- Uses: `nselib` Python library
- Data Source: NSE Bhavcopy (daily stock data)
- What it retrieves:
  - 52-week high prices
  - 52-week low prices
  - Latest closing prices
  - Today's high/low prices

**NOT stored in database** - fetched live from NSE API

---

## 🔍 EXAMPLE: Complete IPO Data Storage

Let's trace ONE IPO through all tables:

### Company Table
```
INSERT INTO companies (company_name, company_logo)
VALUES ('Adani Power', 'https://example.com/logo.png');
→ ID: 1
```

### IPO Table
```
INSERT INTO ipos (
    company_id, price_band, open_date, close_date,
    issue_size, issue_type, listing_date, status,
    ipo_price, listing_price, listing_gain,
    current_market_price, current_return
)
VALUES (
    1,                      -- company_id
    '329-136',             -- price_band
    '2024-06-03',          -- open_date
    '2024-06-05',          -- close_date
    '4530 Cr',             -- issue_size
    'Book Built',          -- issue_type
    '2024-06-10',          -- listing_date
    'Listed',              -- status
    383.00,                -- ipo_price
    435.00,                -- listing_price
    13.58,                 -- listing_gain
    410.00,                -- current_market_price
    7.05                   -- current_return
);
→ ID: 1
```

### Document Table
```
INSERT INTO documents (ipo_id, rhp_pdf, drhp_pdf)
VALUES (
    1,
    'https://example.com/rhp-adani.pdf',
    'https://example.com/drhp-adani.pdf'
);
→ ID: 1
```

### Application Table
```
INSERT INTO applications (user_id, ipo_id, quantity, status)
VALUES (
    2,              -- user_id (who applied)
    1,              -- ipo_id (which IPO)
    100,            -- quantity (shares)
    'Allotted'      -- status
);
→ ID: 1
```

---

## 📈 DATA TYPES & STORAGE

| Field Type | Usage | Example | Storage |
|-----------|-------|---------|---------|
| VARCHAR | Text | "Book Built", company names | String |
| DATE | Dates | 2024-06-03 | YYYY-MM-DD |
| DECIMAL(10,2) | Prices | 383.50, 435.00 | Exact decimal |
| DECIMAL(5,2) | Percentages | 13.58, 7.05 | Exact decimal |
| INTEGER | Quantities | 100, 200 | Whole numbers |
| URL | Links | https://... | Text up to 500 chars |
| BOOLEAN | Yes/No | True, False | 1 or 0 |
| DateTime | Timestamps | 2024-06-03 15:30:45 | Automatic |

---

## 🔄 DATA FLOW DIAGRAM

```
User adds IPO via Admin Panel
    ↓
Admin fills form:
├── Company: Adani Power
├── Price Band: 329-136
├── Dates: Open/Close/Listing
├── Issue Size: 4530 Cr
├── Status: Listed
├── Prices: IPO, Listing, CMP
└── Documents: RHP, DRHP PDFs
    ↓
Django validates data
    ↓
Data saved to PostgreSQL:
├── companies table (if new company)
├── ipos table (main IPO data)
├── documents table (PDF links)
└── applications table (when users apply)
    ↓
User sees via API:
GET /api/v1/ipos/
    ↓
Response shows all IPO data:
{
  "company_name": "Adani Power",
  "price_band": "329-136",
  "ipo_price": 383,
  "listing_price": 435,
  "current_market_price": 410,
  "listing_gain": 13.58,
  "current_return": 7.05
}
```

---

## 📊 TOTAL DATA STORAGE

### How much data is stored?

**Per Company**: ~500 bytes
**Per IPO**: ~200 bytes
**Per Document**: ~500 bytes
**Per Application**: ~50 bytes
**Per User**: ~300 bytes

### Example Storage Size

For 1000 IPOs:
- Companies: ~100 × 500 bytes = ~50 KB
- IPOs: 1000 × 200 bytes = ~200 KB
- Documents: 1000 × 500 bytes = ~500 KB
- Applications: 10,000 × 50 bytes = ~500 KB
- Users: 1000 × 300 bytes = ~300 KB

**Total**: ~1.5 MB (Very small!)

---

## 🔐 WHERE IS STOCK DATA USED?

### 1. Stored in Database (ipos table)
```
ipo_price              → Offer price
listing_price          → Listing day price
current_market_price   → Latest price
listing_gain           → Calculated gain
current_return         → Calculated return
```

### 2. Live from NSE (via API, NOT stored)
```
/api/v1/stock/
└── Returns:
    ├── 52-week highs (top 18 stocks)
    ├── 52-week lows (top 18 stocks)
    ├── Latest closing prices
    └── Day high/low prices
```

### 3. User Applications (applications table)
```
Quantity applied
Application status
User who applied
Which IPO applied for
```

---

## ✅ QUICK REFERENCE

**What's stored in database?**
- ✅ Company info
- ✅ IPO details
- ✅ Stock prices (IPO, Listing, CMP)
- ✅ Calculated returns
- ✅ Document links
- ✅ User applications
- ✅ User accounts

**What's NOT stored?**
- ❌ Real-time stock quotes (fetched live from NSE)
- ❌ Historical stock data (fetched live from NSE)
- ❌ News or articles (not in scope)
- ❌ Financial statements (not in scope)

**Where to find stock prices?**
- IPO Price: `ipos.ipo_price`
- Listing Price: `ipos.listing_price`
- Current Price: `ipos.current_market_price`
- 52-week High/Low: `/api/v1/stock/` (live from NSE)

---

## 🎯 ACCESSING THE DATA

### Via Admin Panel
```
http://localhost:8000/admin/
├── Companies
├── IPOs
├── Documents
├── Applications
└── Users
```

### Via REST API
```
GET /api/v1/companies/           → List companies
GET /api/v1/ipos/                → List IPOs with prices
GET /api/v1/documents/           → List PDF documents
GET /api/v1/applications/        → List user applications
GET /api/v1/stock/               → Live market data
```

### Via SQL (Direct Database)
```sql
SELECT * FROM companies;
SELECT * FROM ipos;
SELECT * FROM documents;
SELECT * FROM applications;
SELECT * FROM auth_user;
```

---

**Summary**: Your database stores complete IPO information including stock prices, company details, documents, and user applications. Stock prices are manually entered and updated, while real-time market data comes from NSE via API.
