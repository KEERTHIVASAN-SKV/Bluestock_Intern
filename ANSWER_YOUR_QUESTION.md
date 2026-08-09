# ✅ ANSWER: What Data is Stored & Where are Stock Details?

---

## 🎯 Quick Answer

### What Data is Stored in Database?

**4 Main Tables Store:**

1. **Companies** - Company names and logos
2. **IPOs** - IPO details AND **ALL STOCK PRICES** (⭐ Main table)
3. **Documents** - RHP and DRHP PDF links
4. **Applications** - User IPO applications
5. **Users** - Admin and user accounts (Django built-in)

### Where are Stock Details Stored?

**In the `ipos` table**, these columns store stock data:

| Column | What it stores | Example |
|--------|----------------|---------|
| `ipo_price` | Offer price | ₹383 |
| `listing_price` | Listing day price | ₹435 |
| `current_market_price` | Current trading price (CMP) | ₹410 |
| `listing_gain` | Gain % at listing | 13.58% |
| `current_return` | Return % from IPO to now | 7.05% |

---

## 📊 COMPLETE DATABASE STRUCTURE

### Table 1: `companies`
```sql
CREATE TABLE companies (
    id INTEGER PRIMARY KEY,
    company_name VARCHAR(255),
    company_logo VARCHAR(500)
);
```

**Stores**: Company basic info  
**Example**:
```
ID | Company Name | Logo
1  | Adani Power  | https://...png
2  | TCS Limited  | https://...png
```

---

### Table 2: `ipos` ⭐ (STOCK DATA HERE)
```sql
CREATE TABLE ipos (
    id INTEGER PRIMARY KEY,
    company_id INTEGER (Foreign Key),
    price_band VARCHAR,
    open_date DATE,
    close_date DATE,
    issue_size VARCHAR,
    issue_type VARCHAR,
    listing_date DATE,
    status VARCHAR,
    ipo_price DECIMAL,          ← STOCK PRICE 1
    listing_price DECIMAL,      ← STOCK PRICE 2
    listing_gain DECIMAL,       ← GAIN %
    current_market_price DECIMAL,  ← STOCK PRICE 3 (CMP)
    current_return DECIMAL      ← RETURN %
);
```

**Stores**: IPO details and ALL stock price information  
**Example**:
```
ID | Company | Price Band | IPO Price | Listing Price | Current CMP | Listing Gain | Current Return
1  | Adani   | 329-136    | 383       | 435           | 410         | 13.58%       | 7.05%
2  | TCS     | 500-550    | 525       | 600           | 620         | 14.29%       | 18.10%
```

---

### Table 3: `documents`
```sql
CREATE TABLE documents (
    id INTEGER PRIMARY KEY,
    ipo_id INTEGER (Foreign Key),
    rhp_pdf VARCHAR(500),
    drhp_pdf VARCHAR(500)
);
```

**Stores**: PDF document links  
**Example**:
```
ID | IPO ID | RHP PDF | DRHP PDF
1  | 1      | https://...rhp.pdf | https://...drhp.pdf
2  | 2      | https://...rhp.pdf | https://...drhp.pdf
```

---

### Table 4: `applications`
```sql
CREATE TABLE applications (
    id INTEGER PRIMARY KEY,
    user_id INTEGER (Foreign Key),
    ipo_id INTEGER (Foreign Key),
    quantity INTEGER,
    status VARCHAR
);
```

**Stores**: User IPO applications  
**Example**:
```
ID | User ID | IPO ID | Quantity | Status
1  | 1       | 1      | 100      | Allotted
2  | 1       | 2      | 50       | Applied
3  | 2       | 1      | 200      | Rejected
```

---

### Table 5: `auth_user` (Django Built-in)
```sql
CREATE TABLE auth_user (
    id INTEGER PRIMARY KEY,
    username VARCHAR,
    password VARCHAR (hashed),
    email VARCHAR,
    is_staff BOOLEAN,
    is_active BOOLEAN,
    date_joined DATETIME
);
```

**Stores**: User accounts and admin  
**Example**:
```
ID | Username | Email            | Is Staff
1  | admin    | admin@example.com | True
2  | user1    | user1@example.com | False
```

---

## 📈 WHERE STOCK PRICES ARE STORED

### Stored in Database (`ipos` table):

**5 Stock Price Fields**:

1. **ipo_price** - Initial offering price
   - Set when IPO is added to database
   - Example: ₹383

2. **listing_price** - Price on listing day
   - Set when IPO is listed
   - Example: ₹435

3. **current_market_price** - Current trading price (CMP)
   - Updated manually by admin when price changes
   - Example: ₹410

4. **listing_gain** - Calculated gain %
   - = (listing_price - ipo_price) / ipo_price * 100
   - Example: 13.58%

5. **current_return** - Calculated return %
   - = (current_market_price - ipo_price) / ipo_price * 100
   - Example: 7.05%

### NOT Stored - Fetched Live:

**API Endpoint**: `/api/v1/stock/`
- Fetches real-time data from **NSE** (National Stock Exchange)
- Returns: 52-week highs and lows
- NOT stored in database
- Fetched on-demand using `nselib` library

---

## 🔍 EXAMPLE: Complete IPO Record

When you add 1 IPO to database, here's what gets stored:

**In companies table:**
```
ID=1, company_name="Adani Power", company_logo="https://..."
```

**In ipos table:**
```
ID=1
company_id=1
price_band="329-136"
open_date="2024-06-03"
close_date="2024-06-05"
issue_size="4530 Cr"
issue_type="Book Built"
listing_date="2024-06-10"
status="Listed"
ipo_price=383.00              ← STOCK PRICE
listing_price=435.00          ← STOCK PRICE
listing_gain=13.58            ← STOCK GAIN %
current_market_price=410.00   ← STOCK PRICE (CMP)
current_return=7.05           ← STOCK RETURN %
```

**In documents table:**
```
ID=1
ipo_id=1
rhp_pdf="https://example.com/rhp-adani.pdf"
drhp_pdf="https://example.com/drhp-adani.pdf"
```

**When users apply - in applications table:**
```
ID=1, user_id=2, ipo_id=1, quantity=100, status="Allotted"
ID=2, user_id=3, ipo_id=1, quantity=50, status="Applied"
```

---

## 🗂️ DATA RELATIONSHIPS

```
companies (1) 
    │
    ├─ ONE company has MANY IPOs
    │
    └─→ ipos (1)
        │
        ├─ ONE IPO has MANY documents
        │  └─→ documents
        │
        └─ ONE IPO has MANY applications
           └─→ applications
               │
               └─ MANY applications by MANY users
                  └─→ auth_user
```

---

## 🌐 HOW TO ACCESS THIS DATA

### Via Admin Panel
```
http://localhost:8000/admin/
├── Companies → See all companies
├── IPOs → See all IPOs with stock prices
├── Documents → See all PDF links
├── Applications → See user applications
└── Users → See all user accounts
```

### Via REST API
```
GET /api/v1/companies/          → List companies
GET /api/v1/ipos/               → List IPOs with all stock prices
GET /api/v1/documents/          → List documents
GET /api/v1/applications/       → List applications
GET /api/v1/stock/              → Live market data
```

### Via Direct SQL
```sql
-- See all IPOs with stock prices
SELECT company_name, ipo_price, listing_price, 
       current_market_price, listing_gain, current_return 
FROM ipos 
JOIN companies ON ipos.company_id = companies.id;

-- See specific IPO
SELECT * FROM ipos WHERE id = 1;

-- See all applications
SELECT * FROM applications;
```

---

## 📊 EXAMPLE API RESPONSE (Stock Data)

When you request: `GET /api/v1/ipos/`

Response includes stock prices:
```json
{
  "count": 2,
  "results": [
    {
      "id": 1,
      "company": {
        "id": 1,
        "company_name": "Adani Power",
        "company_logo": "https://..."
      },
      "price_band": "329-136",
      "open_date": "2024-06-03",
      "close_date": "2024-06-05",
      "issue_size": "4530 Cr",
      "issue_type": "Book Built",
      "listing_date": "2024-06-10",
      "status": "Listed",
      "ipo_price": 383.00,           ← STOCK PRICE 1
      "listing_price": 435.00,       ← STOCK PRICE 2
      "listing_gain": 13.58,         ← GAIN %
      "current_market_price": 410.00, ← STOCK PRICE 3
      "current_return": 7.05         ← RETURN %
    },
    {
      "id": 2,
      "company": {
        "id": 2,
        "company_name": "TCS Limited",
        "company_logo": "https://..."
      },
      "ipo_price": 525.00,
      "listing_price": 600.00,
      "current_market_price": 620.00,
      "listing_gain": 14.29,
      "current_return": 18.10
    }
  ]
}
```

---

## ✅ SUMMARY TABLE

| What | Where | Table | Column |
|------|-------|-------|--------|
| Company name | Database | companies | company_name |
| Company logo | Database | companies | company_logo |
| **IPO Price** | Database | ipos | **ipo_price** |
| **Listing Price** | Database | ipos | **listing_price** |
| **Current CMP** | Database | ipos | **current_market_price** |
| **Listing Gain %** | Database | ipos | **listing_gain** |
| **Current Return %** | Database | ipos | **current_return** |
| Open/Close dates | Database | ipos | open_date, close_date |
| Issue size | Database | ipos | issue_size |
| Status | Database | ipos | status |
| RHP PDF link | Database | documents | rhp_pdf |
| DRHP PDF link | Database | documents | drhp_pdf |
| User applications | Database | applications | user_id, ipo_id, quantity |
| 52-week highs | **Live API** | /api/v1/stock/ | - |
| 52-week lows | **Live API** | /api/v1/stock/ | - |
| Today's prices | **Live API** | NSE API | - |

---

## 🎯 KEY POINTS

✅ **Stock prices ARE stored in database** (ipos table)
✅ **5 different stock price metrics** stored per IPO
✅ **Database size is small** (~1.5 MB for 1000 IPOs)
✅ **Real-time market data** fetched live from NSE (not stored)
✅ **All data accessible** via admin panel or API endpoints
✅ **Data is organized** in 4 related tables
✅ **Stock prices updated** manually by admin
✅ **User applications** also tracked in database

---

## 📚 FOR MORE DETAILS READ:

1. **DATABASE_STRUCTURE_AND_DATA.md** - Complete schema explanation
2. **DATABASE_QUICK_REFERENCE.txt** - Quick lookup reference
3. **DATA_STORAGE_DIAGRAM.txt** - Visual diagrams

---

**Now you know exactly where all data is stored and how to access it!** ✅
