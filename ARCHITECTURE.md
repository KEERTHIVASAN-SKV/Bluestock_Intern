# Architecture - System Design & Components

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     BLUESTOCK IPO APPLICATION                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐              ┌──────────────────────┐     │
│  │   React.js UI    │              │   Django Backend     │     │
│  │   (Frontend)     │◄────JSON────►│   REST API Server    │     │
│  │ Port: 5173       │              │ Port: 8000           │     │
│  └──────────────────┘              └──────────────────────┘     │
│         │                                    │                   │
│         │                                    │                   │
│         │ HTTP/HTTPS                        │ Database           │
│         │ REST API Calls                    │ Operations         │
│         │                                    │                   │
│         │                           ┌────────▼────────┐         │
│         │                           │   PostgreSQL DB │         │
│         │                           │   (ipo_db)      │         │
│         │                           └─────────────────┘         │
│         │                                                        │
│         └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Layered Architecture

### 1. Frontend Layer (React.js)
```
React Application (Port 5173)
├── Pages/Components
│   ├── Authentication (Login, SignUp, Forgot Password)
│   ├── Public Pages (IPO, Blog, Analysis, Brokers)
│   ├── User Pages (Dashboard, Community)
│   └── Admin Pages (RegisterIPO, ManageIPO)
├── Components
│   ├── Navigation Bar
│   ├── Forms
│   ├── Lists
│   └── Charts/Analytics
├── Styling
│   └── Styled Components (CSS-in-JS)
└── State Management
    └── Context API (AuthProvider)
```

### 2. API Layer (REST)
```
REST API (Port 8000/api/v1/)
├── Authentication Endpoints
│   ├── POST /token/ (Login)
│   ├── POST /token/refresh/ (Refresh JWT)
│   └── POST /register/ (Sign Up)
├── Data Endpoints
│   ├── GET /ipos/ (List IPOs - Public)
│   ├── POST /ipos/ (Create IPO - Admin)
│   ├── GET /companies/ (List Companies - Public)
│   ├── POST /companies/ (Create Company - Admin)
│   └── ... (other resources)
└── Permissions
    └── IsAdminOrReadOnly (Custom permission class)
```

### 3. Backend Layer (Django)
```
Django Application
├── Models
│   ├── Company (company_name, logo, etc.)
│   ├── IPO (company_fk, dates, prices, status)
│   ├── Document (ipo_fk, rhp_pdf URL, drhp_pdf URL)
│   ├── Application (user_fk, ipo_fk, quantity)
│   └── User (Django built-in + custom)
├── Views (ViewSets)
│   ├── CompanyViewSet
│   ├── IPOViewSet
│   ├── DocumentViewSet
│   ├── UserViewSet
│   └── ApplicationViewSet
├── Serializers
│   ├── CompanySerializer
│   ├── IPOSerializer
│   └── ... (others)
└── Permissions
    └── IsAdminOrReadOnly (Custom)
```

### 4. Database Layer (PostgreSQL)
```
PostgreSQL Database (ipo_db)
├── Tables
│   ├── auth_user (Users - Django built-in)
│   ├── ipo_company (Companies)
│   ├── ipos (IPOs - custom db_table name)
│   ├── documents (Documents - custom db_table name)
│   ├── applications (Applications - custom db_table name)
│   └── ... (Django system tables)
└── Relationships
    └── IPO ← Company (ForeignKey)
       ← User (through Application)
```

---

## 🔄 Data Flow Architecture

### User Registration Flow
```
1. User fills signup form (Frontend)
   ↓
2. POST /api/v1/register/ with {username, email, password, name}
   ↓
3. Backend creates User object
   ↓
4. JWT tokens generated (access + refresh)
   ↓
5. User can now login
```

### Admin IPO Creation Flow
```
1. Admin logs in → gets JWT token (stored in localStorage)
   ↓
2. Admin accesses /registeripo page
   ↓
3. Fills IPO form → POST /api/v1/ipos/
   ↓
4. Request includes: Authorization: Bearer {JWT_token}
   ↓
5. Backend validates:
   - JWT token valid?
   - User is_staff=True?
   ↓
6. If valid → Create IPO + Company
   If invalid → Return 401/403 error
   ↓
7. Response: IPO object with ID
```

### Public IPO View Flow
```
1. User (logged in or not) visits /ipo
   ↓
2. Frontend GET /api/v1/ipos/
   ↓
3. No auth required (IsAdminOrReadOnly allows GET)
   ↓
4. Backend returns all IPOs with details
   ↓
5. Frontend displays IPO list/details
```

---

## 🔐 Security Architecture

### Authentication System
```
┌─────────────────────────────────────────┐
│     JWT Token-Based Authentication      │
├─────────────────────────────────────────┤
│                                          │
│  1. User Login                           │
│     ↓                                    │
│  2. Backend validates credentials        │
│     ↓                                    │
│  3. Issues JWT tokens:                   │
│     - access_token (short-lived)         │
│     - refresh_token (long-lived)         │
│     ↓                                    │
│  4. Frontend stores in localStorage      │
│     ↓                                    │
│  5. All requests include:                │
│     Authorization: Bearer {access_token} │
│                                          │
└─────────────────────────────────────────┘
```

### Authorization System
```
┌───────────────────────────────────────────────┐
│    IsAdminOrReadOnly Permission Class          │
├───────────────────────────────────────────────┤
│                                                │
│  For GET/HEAD/OPTIONS requests:                │
│  → Allow anyone (public read)                  │
│                                                │
│  For POST/PUT/PATCH/DELETE requests:          │
│  → Check: User authenticated? ✓               │
│  → Check: User is_staff=True? ✓               │
│  → If both true → Allow ✓                     │
│  → If any false → Deny (403 Forbidden) ✗      │
│                                                │
└───────────────────────────────────────────────┘
```

### User Roles
```
┌────────────────────────────────────────┐
│          User Role Matrix               │
├────────────────────────────────────────┤
│                                         │
│  Regular User (is_staff=False)          │
│  - ✅ Read-only access to IPOs          │
│  - ✅ Can signup                        │
│  - ✅ Can view blog, analysis           │
│  - ❌ Cannot create/edit/delete IPOs    │
│                                         │
│  Admin User (is_staff=True)             │
│  - ✅ Full read access                  │
│  - ✅ Create new IPOs                   │
│  - ✅ Edit existing IPOs                │
│  - ✅ Delete IPOs                       │
│  - ✅ Manage companies & documents      │
│  - ✅ Access admin panel                │
│                                         │
└────────────────────────────────────────┘
```

---

## 📚 Component Architecture

### Frontend Components
```
App (Root)
├── Navigation Bar
├── Pages
│   ├── Home
│   ├── IPO List Page
│   │   └── IPO Item Component
│   ├── Dashboard (Admin)
│   │   ├── RegisterIPO Form
│   │   └── ManageIPO List
│   ├── Analysis Page
│   ├── Blog Page
│   │   └── Blog Item Component
│   ├── Broker Comparison
│   ├── Login Page
│   ├── SignUp Page
│   └── Forgot Password Page
└── AuthProvider (Context)
    └── Authentication State
```

### Backend Views/Endpoints
```
Main API Router (api/v1/)
├── /companies/
│   ├── GET - List (Public)
│   ├── POST - Create (Admin)
│   ├── GET {id} - Detail (Public)
│   └── PUT/DELETE {id} - Modify (Admin)
├── /ipos/
│   ├── GET - List (Public)
│   ├── POST - Create (Admin)
│   ├── GET {id} - Detail (Public)
│   └── PUT/DELETE {id} - Modify (Admin)
├── /documents/
│   ├── GET - List (Public)
│   └── POST - Upload (Admin)
├── /users/
│   ├── GET - List (Admin)
│   └── POST - Create User (Admin)
├── /applications/
│   ├── GET - List (Owner/Admin)
│   └── POST - Apply for IPO (Authenticated)
└── /token/
    ├── POST - Login
    └── POST refresh/ - Refresh Token
```

---

## 🗄️ Database Schema

### Core Tables
```
Company
├── id (PK, auto)
├── company_name (VARCHAR 255)
└── company_logo (URLField 500)

IPO  (db_table: 'ipos')
├── id (PK, auto)
├── company_id (FK → Company, CASCADE)
├── price_band (VARCHAR 50)
├── open_date (Date)
├── close_date (Date)
├── listing_date (Date)
├── status (Choice: Upcoming / Open / Closed / Listed)
├── ipo_price (Decimal 10,2)
├── listing_price (Decimal 10,2)
├── listing_gain (Decimal 5,2)
├── current_market_price (Decimal 10,2)
└── current_return (Decimal 5,2)

Document  (db_table: 'documents')
├── id (PK, auto)
├── ipo_id (FK → IPO, CASCADE)
├── rhp_pdf (URLField 500)    ← Red Herring Prospectus
└── drhp_pdf (URLField 500)   ← Draft Red Herring Prospectus

Application  (db_table: 'applications')
├── id (PK, auto)
├── user_id (FK → auth_user, CASCADE)
├── ipo_id (FK → IPO, CASCADE)
├── quantity (Integer, nullable)
└── status (VARCHAR 50, nullable)

User (Django auth_user — built-in)
├── id (PK)
├── username (VARCHAR)
├── email (Email)
├── password (Hashed PBKDF2)
├── first_name (VARCHAR)  ← stores 'name' from registration
├── is_staff (Boolean)    ← Admin flag
├── is_superuser (Boolean)
└── date_joined (DateTime)
```

### Relationships
```
Company (1) ──── (Many) IPO
                    │
                    ├─── (Many) Document
                    └─── (Many) Application ──── (1) User
```

---

## 📡 Request/Response Flow

### Example: Create IPO (Admin)

**Frontend Request:**
```javascript
POST http://127.0.0.1:8000/api/v1/ipos/
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
}
Body: {
  company: {
    company_name: "TechCorp Ltd",
    company_logo: "url"
  },
  open_date: "2025-01-01",
  close_date: "2025-01-05",
  ipo_price: 100,
  status: "Upcoming"
  // ... other fields
}
```

**Backend Processing:**
```
1. Parse JWT token
2. Validate token signature
3. Check user.is_staff = True
4. Validate request data
5. Create Company (if not exists)
6. Create IPO linked to Company
7. Save to database
8. Serialize response
```

**Backend Response:**
```json
{
  "id": 1,
  "company": {
    "id": 1,
    "company_name": "TechCorp Ltd",
    "company_logo": "url"
  },
  "open_date": "2025-01-01",
  "close_date": "2025-01-05",
  "ipo_price": 100,
  "status": "Upcoming",
  "created_at": "2025-08-22T10:30:00Z"
  // ... other fields
}
```

**Frontend Response:**
```javascript
// Success
setIpos([...ipos, response.data])
alert("IPO created successfully!")

// Failure
alert("Error creating IPO: " + error.message)
```

---

## 🔌 Integration Points

### External APIs
- **NSE (National Stock Exchange)**: Market data via `nselib`
- **django-cors-headers**: Enable cross-origin requests

### Libraries & Packages
```
Backend:
├── Django 5.2.3
├── Django REST Framework 3.16
├── djangorestframework-simplejwt 5.5
├── django-cors-headers
├── django-filter 25.1
├── nselib 2.5.1 (NSE stock market data)
└── pandas 2.2.3 (Data processing)

Frontend:
├── React 19
├── Vite 6 (build tool / dev server → port 5173)
├── Axios (HTTP client)
├── TailwindCSS 4
├── Bootstrap 5 + React-Bootstrap
├── React Router 7
├── Chart.js / Recharts (charts)
├── Framer Motion (animations)
├── FontAwesome / React Icons
└── Styled Components
```

---

## 🔄 State Management

### Frontend State
```
Global Context (AuthProvider):
├── isLoggedIn (Boolean)
├── accessToken (JWT)
├── refreshToken (JWT)
└── User data (on login)

Component Local State:
├── Form inputs
├── UI state (loading, modals)
├── Fetched data
└── Error messages
```

### Backend State
```
Session Database:
├── User sessions (if enabled)
└── Token blacklist (for logout)

Cached Data:
├── Market data (TTL)
└── Company info
```

---

## 📊 Deployment Architecture (Production)

```
┌──────────────────────────────────────────────────────┐
│               PRODUCTION ENVIRONMENT                  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  CDN/Static Files                                     │
│  ┌────────────────────────────────────────┐           │
│  │ CSS, JS, Images (Served by CDN)        │           │
│  └────────────────────────────────────────┘           │
│                  ↓                                    │
│  ┌────────────────────────────────────────┐           │
│  │  Web Server (Nginx/Apache)              │           │
│  │  - Reverse proxy                        │           │
│  │  - Load balancing                       │           │
│  │  - SSL/TLS termination                  │           │
│  └────────────────────────────────────────┘           │
│           ↓                          ↓               │
│  ┌──────────────────┐        ┌──────────────────────┐    │
│  │ Frontend Build   │        │ Django WSGI           │    │
│  │ (React + Vite)   │        │ (Gunicorn/uWSGI)      │    │
│  │                  │        │                       │    │
│  └──────────────────┘        └──────────────────────┘    │
│                                    ↓                 │
│                            ┌──────────────────┐      │
│                            │  PostgreSQL DB   │      │
│                            │  (ipo_db)        │      │
│                            └──────────────────┘      │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Key Design Decisions

1. **JWT Authentication**: Stateless, scalable token-based auth
2. **REST API**: Standard HTTP methods, JSON responses
3. **Styled Components**: Scoped CSS, preventing conflicts
4. **React Context**: Simple state management (could upgrade to Redux)
5. **PostgreSQL**: Configured as the primary database for both dev and production
6. **Separation of Concerns**: Backend handles logic, Frontend handles UI
7. **Vite**: Modern ES-module build tool with instant HMR on port 5173
8. **Custom db_table names**: `ipos`, `documents`, `applications` (for PostgreSQL compatibility)

---

## 🚀 Scalability Considerations

### Current Architecture Suitable For:
- Small to medium traffic (< 1000 concurrent users)
- Development and testing
- MVP and initial deployment

### Scaling Requirements:
- Use PostgreSQL instead of SQLite
- Add caching (Redis)
- Implement rate limiting
- Use Celery for background tasks
- Implement API versioning
- Add monitoring and logging
- Use containerization (Docker)

---

## 📖 Architecture Documents

This document covers:
- ✅ System overview
- ✅ Layered architecture
- ✅ Data flow
- ✅ Security design
- ✅ Component structure
- ✅ Database schema
- ✅ Request/response cycles
- ✅ Integration points
- ✅ Production considerations

For more details see:
- [DATABASE.md](./DATABASE.md) - Detailed schema
- [HOW_IT_WORKS.md](./HOW_IT_WORKS.md) - Feature workflows
- [README.md](./README.md) - Project overview
