# Database Documentation

## Database Configuration

### Current Setup (Development)
```
Database Engine: PostgreSQL 17.10
Database Name: ipo_db
Location: localhost:5432 (configured in .env)
Configured in: ipo_backend/ipo_backend/.env
```

### Production Setup (Recommended)
```
Database Engine: PostgreSQL
Host: Your database server
Database: ipo_db
User: ipo_user
Password: [Set in .env]
```

---

## 📊 Database Schema

### Entity Relationship Diagram

```
┌──────────────────────┐
│   auth_user          │
├──────────────────────┤
│ id (PK)              │
│ username (UNIQUE)    │
│ email                │
│ password (Hashed)    │
│ first_name           │
│ last_name            │
│ is_staff (Boolean)   │◄─── ADMIN FLAG ◄─── Controls permissions
│ is_superuser         │
│ is_active            │
│ date_joined          │
│ last_login           │
└──────────────────────┘
       │
       │ is_staff=True
       │ = Admin Access
       │
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
┌──────────────────────┐      ┌──────────────────────┐
│   ipo_company        │      │   applications       │
├──────────────────────┤      ├──────────────────────┤
│ id (PK)              │      │ id (PK)              │
│ company_name         │      │ user_id (FK)         │
│ company_logo (URL)   │      │ ipo_id (FK)          │
│                      │      │ quantity (nullable)  │
└──────┬───────────────┘      │ status (nullable)    │
       │                       └──────────────────────┘
       │ 1:Many
       │
       ▼
┌──────────────────────┐
│   ipos               │  (db_table='ipos')
├──────────────────────┤
│ id (PK)              │
│ company_id (FK)      │◄─── Links to Company
│ price_band           │
│ open_date            │
│ close_date           │
│ listing_date         │
│ status               │  Upcoming/Open/Closed/Listed
│ ipo_price            │
│ listing_price        │
│ current_market_price │
│ issue_size           │
│ issue_type           │
│ current_return       │
│ listing_gain         │
└──────┬───────────────┘
       │ 1:Many
       │
       ▼
┌──────────────────────┐
│   documents          │  (db_table='documents')
├──────────────────────┤
│ id (PK)              │
│ ipo_id (FK)          │◄─── Links to IPO
│ rhp_pdf (URL)        │  Red Herring Prospectus
│ drhp_pdf (URL)       │  Draft Red Herring Prospectus
└──────────────────────┘
```

---

## 🗂️ Table Specifications

### 1. auth_user (Django Built-in)

**Purpose**: Store user account information

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique user ID |
| username | VARCHAR(150) | UNIQUE, NOT NULL | Login username |
| email | VARCHAR(254) | NOT NULL | User email |
| password | VARCHAR(128) | NOT NULL | Hashed password (bcrypt) |
| first_name | VARCHAR(150) | - | User's first name |
| last_name | VARCHAR(150) | - | User's last name |
| is_staff | BOOLEAN | DEFAULT=False | ⭐ Admin flag |
| is_superuser | BOOLEAN | DEFAULT=False | Superuser flag |
| is_active | BOOLEAN | DEFAULT=True | Account active status |
| date_joined | DATETIME | AUTO_NOW_ADD | Account creation time |
| last_login | DATETIME | NULLABLE | Last login timestamp |

**Key Point**: `is_staff=True` enables admin access to IPO management

**Sample Data**:
```sql
| id | username | email | first_name | is_staff |
|----|----------|-------|-----------|----------|
| 1  | admin    | admin@... | Admin | True |
| 2  | testuser | test@...  | Test  | False |
```

---

### 2. ipo_company

**Purpose**: Store company information for IPO listings

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Company ID |
| company_name | VARCHAR(255) | NOT NULL | Official company name |
| company_logo | URLField(500) | NOT NULL | URL to company logo |

**Relationships**: One company has many IPOs

**Sample Data**:
```sql
| id | company_name | company_logo |
|----|--------------|--------------|
| 1  | TechCorp Ltd | https://... |
| 2  | RetailCo Inc | https://... |
| 3  | FinServe Ltd | https://... |
```

---

### 3. ipo_ipo

**Purpose**: Core IPO listing information

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | IPO ID |
| company_id | INTEGER | FK (ipo_company), NOT NULL | Links to company |
| price_band | VARCHAR(50) | NOT NULL | Price band range |
| open_date | DATE | NOT NULL | IPO subscription open |
| close_date | DATE | NOT NULL | IPO subscription close |
| listing_date | DATE | NOT NULL | Stock listing date |
| status | VARCHAR(20) | Choices: Upcoming/Open/Closed/Listed | IPO status |
| ipo_price | DECIMAL(10,2) | NOT NULL | IPO issue price |
| listing_price | DECIMAL(10,2) | NOT NULL | Opening price at listing |
| current_market_price | DECIMAL(10,2) | NOT NULL | Current stock price |
| issue_size | VARCHAR(100) | NOT NULL | Total issue size (e.g. "₹500 Cr") |
| issue_type | VARCHAR(50) | NOT NULL | How IPO is priced |
| current_return | DECIMAL(5,2) | NOT NULL | Return from IPO price |
| listing_gain | DECIMAL(5,2) | NOT NULL | Gain on listing day |

**Relationships**:
- One company → Many IPOs
- One IPO → Many documents
- One IPO → Many applications

**Sample Data**:
```sql
| id | company_id | open_date  | close_date | status    | ipo_price |
|----|------------|-----------|-----------|-----------|-----------|
| 1  | 1          | 2025-01-01 | 2025-01-05 | Upcoming  | 100.00   |
| 2  | 2          | 2024-12-01 | 2024-12-05 | Completed | 150.00   |
```

---

### 4. ipo_document

**Purpose**: Store IPO related documents (RHP & DRHP prospectuses as URLs)

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Document ID |
| ipo_id | INTEGER | FK (ipos), NOT NULL | Links to IPO |
| rhp_pdf | URLField(500) | NOT NULL | Red Herring Prospectus URL |
| drhp_pdf | URLField(500) | NOT NULL | Draft Red Herring Prospectus URL |

**Sample Data**:
```sql
| id | ipo_id | rhp_pdf | drhp_pdf |
|----|--------|---------|----------|
| 1  | 1      | https://sebi.gov.in/rhp.pdf | https://sebi.gov.in/drhp.pdf |
```

---

### 5. ipo_application

**Purpose**: Track user applications for IPO subscriptions

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Application ID |
| user_id | INTEGER | FK (auth_user), NOT NULL | User who applied |
| ipo_id | INTEGER | FK (ipos), NOT NULL | IPO applied for |
| quantity | INTEGER | NULLABLE | Number of shares applied |
| status | VARCHAR(50) | NULLABLE | Application status |

**Sample Data**:
```sql
| id | user_id | ipo_id | quantity | status   |
|----|---------|--------|----------|----------|
| 1  | 2       | 1      | 100      | Pending  |
| 2  | 2       | 1      | 50       | Approved |
```

---

## 🔑 Key Relationships

### Company to IPO (1:Many)
```
One Company → Many IPOs
Example: TechCorp Ltd can have multiple IPOs over time
```

### IPO to Document (1:Many)
```
One IPO → Many Documents
Example: An IPO can have prospectus, listing details, etc.
```

### User to Application (1:Many)
```
One User → Many Applications
Example: A user can apply for multiple IPOs
```

### IPO to Application (1:Many)
```
One IPO → Many Applications
Example: Many users can apply for same IPO
```

---

## 📋 Data Types Reference

| Type | Description | Example |
|------|-------------|---------|
| INTEGER | Whole number | 1, 100, 1000 |
| VARCHAR(n) | Text up to n chars | "TechCorp", "123456" |
| DECIMAL(10,2) | Decimal with 2 places | 100.50, 1500.25 |
| BIGINTEGER | Large whole number | 1000000, 999999999 |
| DATE | Date only | 2025-01-15 |
| DATETIME | Date and time | 2025-01-15 10:30:45 |
| BOOLEAN | True/False | True, False |
| URLField | Web URL | https://example.com/image.png |
| FileField | File upload | /uploads/prospectus.pdf |

---

## 🔒 Foreign Keys & Constraints

### Foreign Key Relationships

**ipo_ipo.company_id → ipo_company.id**
- Rule: ON DELETE CASCADE
- Effect: If company deleted, all its IPOs deleted

**documents.ipo_id → ipos.id**
- Rule: ON DELETE CASCADE
- Effect: If IPO deleted, all its documents deleted

**applications.user_id → auth_user.id**
- Rule: ON DELETE CASCADE
- Effect: If user deleted, all their applications deleted

**applications.ipo_id → ipos.id**
- Rule: ON DELETE CASCADE
- Effect: If IPO deleted, all applications for it are deleted

---

## 📊 Important Queries (Examples)

### Get all IPOs for a company
```sql
SELECT * FROM ipo_ipo 
WHERE company_id = 1 
ORDER BY created_at DESC;
```

### Get all applications for an IPO
```sql
SELECT u.username, a.quantity, a.status 
FROM ipo_application a
JOIN auth_user u ON a.user_id = u.id
WHERE a.ipo_id = 1
ORDER BY a.applied_at DESC;
```

### Get user's IPO applications
```sql
SELECT i.*, c.company_name, a.quantity, a.status
FROM ipo_application a
JOIN ipo_ipo i ON a.ipo_id = i.id
JOIN ipo_company c ON i.company_id = c.id
WHERE a.user_id = 2
ORDER BY a.applied_at DESC;
```

### Get all admin users
```sql
SELECT username, email, first_name, date_joined
FROM auth_user
WHERE is_staff = 1
ORDER BY date_joined DESC;
```

### Get upcoming IPOs
```sql
SELECT i.*, c.company_name
FROM ipo_ipo i
JOIN ipo_company c ON i.company_id = c.id
WHERE i.status = 'Upcoming'
AND i.open_date > NOW()
ORDER BY i.open_date ASC;
```

---

## 🛠️ Database Maintenance

### Backup Database
```bash
# SQLite
copy ipo_db.sqlite3 ipo_db_backup.sqlite3

# PostgreSQL
pg_dump -U username database_name > backup.sql
```

### Restore Database
```bash
# SQLite
copy ipo_db_backup.sqlite3 ipo_db.sqlite3

# PostgreSQL
psql -U username database_name < backup.sql
```

### Reset Database
```bash
# Delete old database
rm ipo_db.sqlite3

# Create new database
python manage.py migrate

# Create admin user
python manage.py createsuperuser
```

### Check Database Size
```bash
# SQLite file size
dir /s ipo_db.sqlite3

# PostgreSQL
SELECT pg_size_pretty(pg_database_size('ipo_db'));
```

---

## 📈 Database Growth Estimates

### Per 1000 IPOs:
- Company records: ~500 (multiple IPOs per company)
- IPO records: 1,000
- Documents: ~5,000 (5 per IPO average)
- Database size: ~50-100 MB

### Per 10,000 Users:
- User records: 10,000
- Applications: ~50,000 (5 applications per user)
- Database size: ~20-50 MB

**Total for Medium Installation**: 100-200 MB

---

## 🔄 Migrations

### Create New Migration
```bash
python manage.py makemigrations
```

### Apply Migrations
```bash
python manage.py migrate
```

### Check Migration Status
```bash
python manage.py showmigrations
```

### Revert Migration
```bash
python manage.py migrate app_name 0001
```

---

## 🔐 Data Security

### Password Storage
- Passwords hashed using PBKDF2 (default Django)
- Never stored in plain text
- Salted hash for additional security

### JWT Tokens
- Signed with SECRET_KEY
- Access token: 5 minutes (configurable)
- Refresh token: 24 hours (configurable)

### SQL Injection Prevention
- Django ORM prevents SQL injection
- All user input validated
- Parameterized queries used

---

## 📊 Sample Data Structure

### After Setup, Database Contains:

```
auth_user (1 record)
├── id: 1
├── username: admin
├── is_staff: True

ipo_company (0-N records)
├── id: 1, company_name: "TechCorp Ltd"
└── id: 2, company_name: "RetailCo Inc"

ipo_ipo (0-N records)
├── id: 1, company_id: 1, status: "Upcoming"
└── id: 2, company_id: 2, status: "Completed"

ipo_document (0-N records)
└── id: 1, ipo_id: 1, type: "Prospectus"

ipo_application (0-N records)
└── Empty until users apply
```

---

## 🚀 Production Database Setup

### PostgreSQL Configuration

**1. Install PostgreSQL**
```bash
# Windows: Download from https://www.postgresql.org/download/
# Or: choco install postgresql
```

**2. Create Database**
```sql
CREATE DATABASE ipo_db;
CREATE USER ipo_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE ipo_db TO ipo_user;
```

**3. Update .env**
```
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ipo_db
DB_USER=ipo_user
DB_PASSWORD=secure_password
DB_HOST=localhost
DB_PORT=5432
```

**4. Install PostgreSQL Driver**
```bash
pip install psycopg2
```

**5. Migrate Database**
```bash
python manage.py migrate
```

---

## 📖 Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Overall system design
- [HOW_IT_WORKS.md](./HOW_IT_WORKS.md) - Feature workflows
- [README.md](./README.md) - Project overview
