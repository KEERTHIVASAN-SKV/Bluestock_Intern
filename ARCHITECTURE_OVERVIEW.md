# 🏗️ ARCHITECTURE OVERVIEW - IPO Portal

**System Design & Data Flow**

---

## 📐 HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│                     (React Frontend)                        │
│                   http://localhost:5173                     │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                         │ JSON Request/Response
                         │
                ┌────────▼─────────┐
                │   CORS Layer     │
                │   (Middleware)   │
                └────────┬─────────┘
                         │
    ┌────────────────────▼────────────────────┐
    │   API Gateway / URL Router              │
    │   (Django URL Configuration)            │
    └────────┬─────────────────────────────┬──┘
             │                             │
    ┌────────▼──────────┐       ┌──────────▼────────┐
    │  Authentication   │       │   Data Endpoints  │
    │  • JWT Tokens     │       │  • CRUD APIs      │
    │  • User Sessions  │       │  • Filtering      │
    └────────┬──────────┘       └──────────┬────────┘
             │                             │
    ┌────────▼─────────────────────────────▼──────┐
    │        REST API ViewSets (Django)           │
    │  • CompanyViewSet                           │
    │  • IPOViewSet                               │
    │  • ApplicationViewSet                       │
    │  • DocumentViewSet                          │
    │  • UserViewSet                              │
    └────────┬─────────────────────────────┬──────┘
             │                             │
    ┌────────▼────────────────────┐       │
    │   Business Logic (views.py)  │       │
    │  • Data validation           │       │
    │  • Processing                │       │
    │  • Market data fetch         │       │
    └────────┬─────────────────────┤       │
             │                     │       │
    ┌────────▼──────────┐   ┌──────▼──────────────┐
    │   NSE API Layer   │   │  Data Serializers   │
    │   (nselib)        │   │  (serializers.py)   │
    │  • Market data    │   │  • JSON conversion  │
    │  • Real-time quotes│  │  • Validation       │
    └────────┬──────────┘   └──────┬──────────────┘
             │                     │
             └──────┬──────────────┘
                    │
        ┌───────────▼────────────┐
        │   Django ORM Models     │
        │  • Company              │
        │  • IPO                  │
        │  • Application          │
        │  • Document             │
        │  • User                 │
        └───────────┬─────────────┘
                    │
        ┌───────────▼─────────────────┐
        │   PostgreSQL Database       │
        │  • Tables                   │
        │  • Indexes                  │
        │  • Relationships            │
        │  Port: 5432                 │
        └─────────────────────────────┘
```

---

## 🔄 DATA FLOW ARCHITECTURE

### Request Flow (User → Backend → Database):

```
1. USER ACTION
   └─→ Click button or submit form
       
2. FRONTEND (React)
   └─→ Generate HTTP request
   └─→ Add headers (JWT token, content-type)
   └─→ Serialize data to JSON
   
3. NETWORK
   └─→ Send to http://localhost:8000/api/v1/
   
4. URL ROUTER (Django URLs)
   └─→ Match URL pattern
   └─→ Route to correct ViewSet
   
5. MIDDLEWARE
   └─→ CORS check
   └─→ Authentication check
   └─→ Permission check
   
6. VIEWSET (API Logic)
   └─→ Receive request
   └─→ Validate data
   └─→ Process business logic
   
7. SERIALIZER
   └─→ Validate input data
   └─→ Convert to Python objects
   
8. MODEL / ORM
   └─→ Generate SQL query
   └─→ Interact with database
   
9. DATABASE (PostgreSQL)
   └─→ Execute SQL
   └─→ Return results
   
10. RESPONSE FLOW (Reverse)
    └─→ Model → ORM
    └─→ Serializer → JSON
    └─→ ViewSet → HTTP Response
    └─→ Frontend receives JSON
    └─→ React updates UI
```

---

## 🎯 COMPONENT RESPONSIBILITIES

### Frontend (React) Layer
**Responsibilities:**
- User interface rendering
- Form validation (client-side)
- State management
- API calls
- User interaction handling
- Local storage of tokens

**Key Files:**
- `App.jsx` - Main routing
- `AuthProvider.jsx` - Auth context
- `pages/*/` - Page components
- `assets/` - Images, icons

---

### Backend API Layer (Django REST)
**Responsibilities:**
- Routing incoming requests
- Authentication/authorization
- Data validation (server-side)
- Business logic execution
- Database interaction
- Error handling

**Key Files:**
- `urls.py` - URL routing
- `views.py` - ViewSets and logic
- `serializers.py` - Data validation/transformation
- `models.py` - Data structures

---

### Data Layer (PostgreSQL)
**Responsibilities:**
- Data persistence
- Relationships between tables
- Data integrity
- Indexing for performance
- Backup and recovery

**Tables:**
- Company
- IPO
- Document
- Application
- User (auth_user)
- Sessions
- Permissions

---

## 🔐 AUTHENTICATION ARCHITECTURE

```
┌──────────────────────────────────────┐
│  User Submits Login Credentials      │
│  (username, password)                │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  POST /api/token/                    │
│  Django-REST-SimpleJWT validates     │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Generate JWT Token                  │
│  • Header (algorithm, type)          │
│  • Payload (user_id, username)       │
│  • Signature (secret key)            │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Return Token to Frontend            │
│  {                                   │
│    "access": "eyJ0eXAi...",         │
│    "refresh": "eyJ0eXAi..."         │
│  }                                   │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Frontend Stores Token               │
│  • localStorage.setItem('token')     │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  For Future Requests:                │
│  Headers: {                          │
│    Authorization: "Bearer token"     │
│  }                                   │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Backend Validates Token             │
│  • Decode JWT                        │
│  • Check signature                   │
│  • Verify expiration                 │
│  • Allow/Deny request                │
└──────────────────────────────────────┘
```

---

## 📊 DATABASE SCHEMA RELATIONSHIPS

```
┌──────────────────┐
│    Company       │
├──────────────────┤
│ ID (PK)          │
│ name             │
│ logo             │
└────────┬─────────┘
         │ 1:M
         │
         ▼
┌──────────────────────────┐
│        IPO               │
├──────────────────────────┤
│ ID (PK)                  │
│ company_id (FK)          │──────┐
│ price_band               │      │
│ status                   │      │
│ ipo_price                │      │
│ listing_price            │      │
│ current_market_price     │      │
└────────┬─────────────────┘      │
         │ 1:M                    │
         │                        │
    ┌────▼────────────────┐      │
    │    Application      │       │
    ├─────────────────────┤       │
    │ ID (PK)             │       │
    │ user_id (FK)────────┼───┐   │
    │ ipo_id (FK)─────────┼───┼──┤ 1:M
    │ quantity            │   │  │
    │ status              │   │  │
    └─────────────────────┘   │  │
                              │  │
                    ┌─────────┘  │
                    │            │
                    ▼            │
        ┌───────────────────┐    │
        │   User (auth)     │    │
        ├───────────────────┤    │
        │ ID (PK)           │    │
        │ username          │    │
        │ email             │    │
        │ password (hashed) │    │
        └───────────────────┘    │
                                 │
        ┌────────────────────────┘
        │ 1:M
        ▼
    ┌──────────────────┐
    │   Document       │
    ├──────────────────┤
    │ ID (PK)          │
    │ ipo_id (FK)      │
    │ rhp_pdf_url      │
    │ drhp_pdf_url     │
    └──────────────────┘
```

---

## 🔄 REQUEST-RESPONSE CYCLE

### Example: Fetch all IPOs

```
1. FRONTEND REQUEST
   GET http://localhost:8000/api/v1/ipos/
   Headers: {
     "Authorization": "Bearer eyJ0eXAi...",
     "Content-Type": "application/json"
   }

2. URL ROUTING
   Matches: path('ipos/', IPOViewSet)
   Action: list() method called

3. VIEWSET LOGIC
   queryset = IPO.objects.all()
   serializer_class = IPOSerializer
   Apply filters, pagination, ordering

4. DATABASE QUERY
   SELECT * FROM ipos JOIN companies ...

5. SERIALIZATION
   For each IPO object:
   {
     "id": 1,
     "company": {"id": 1, "name": "Acme Corp"},
     "price_band": "100-150",
     "status": "Upcoming",
     "ipo_price": 120.50,
     ...
   }

6. HTTP RESPONSE
   Status: 200 OK
   Content-Type: application/json
   Body: [{...}, {...}, ...]

7. FRONTEND RECEIVES
   Parse JSON
   Update React state
   Re-render UI
   Display IPO cards

8. USER SEES
   List of IPOs with all details
```

---

## 🔌 API INTEGRATION POINTS

### External APIs:

#### 1. NSE (Indian Stock Exchange)
- **Library**: nselib 2.0.1
- **Purpose**: Real-time market data
- **Endpoint**: `bhav_copy_equities()`
- **Data**: Stock prices, 52-week high/low
- **Usage**: MarketMoverData view

#### 2. Django Admin
- **Built-in**: Django admin interface
- **Purpose**: Manage data
- **Access**: http://localhost:8000/admin/
- **Uses**: Django ORM models

---

## 🎨 FRONTEND COMPONENT HIERARCHY

```
App.jsx (Root)
├── AuthProvider (Auth Context)
├── Navbar (Navigation)
└── Routes
    ├── Route: "/" 
    │   ├── App2.jsx
    │   ├── SecondPage.jsx
    │   ├── Card.jsx
    │   ├── Download.jsx
    │   ├── AppDownload.jsx
    │   ├── Review.jsx
    │   ├── MarketMovers.jsx
    │   └── BottomSection.jsx
    ├── Route: "/ipo" → Ipo.jsx
    ├── Route: "/blog" → Blog.jsx
    ├── Route: "/dashboard" → Admin.jsx
    ├── Route: "/login" → Login.jsx
    ├── Route: "/signup" → SignUp.jsx
    └── ... (other routes)
```

---

## 📈 DEPLOYMENT ARCHITECTURE (Production)

```
┌─────────────────────────────────────┐
│   Client Browser                    │
│   (React App - Built/Optimized)     │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   CDN / Static File Server          │
│   (Frontend built files)            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   API Server (Gunicorn/uWSGI)       │
│   (Django Backend)                  │
│   • Multiple worker processes       │
│   • Load balanced                   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   Database Server (PostgreSQL)      │
│   • Primary (Read/Write)            │
│   • Replica (Read-only)             │
│   • Backups automated               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Cache Server (Redis)              │
│   • Session cache                   │
│   • Query cache                     │
│   • Rate limiting                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   External Services                 │
│   • Email service (SendGrid, etc.)  │
│   • Error tracking (Sentry)         │
│   • Analytics (Google Analytics)    │
└─────────────────────────────────────┘
```

---

## ⚡ PERFORMANCE CONSIDERATIONS

### Optimization Strategies:

1. **Database Level**
   - Add indexes on frequently queried fields
   - Use select_related() for ForeignKey
   - Use prefetch_related() for reverse relations
   - Query pagination

2. **API Level**
   - Response pagination
   - Caching responses
   - Gzip compression
   - Rate limiting

3. **Frontend Level**
   - Code splitting
   - Lazy loading components
   - Image optimization
   - Minification

4. **Infrastructure**
   - Load balancing
   - CDN for static files
   - Database replication
   - Redis caching

---

## 🔒 SECURITY ARCHITECTURE

```
Request Chain:
1. HTTPS/TLS
   └─→ Encrypted communication

2. CORS Validation
   └─→ Check origin

3. Authentication
   └─→ JWT token validation

4. Authorization
   └─→ Check user permissions

5. Data Validation
   └─→ Input sanitization

6. SQL Injection Protection
   └─→ ORM parameterized queries

7. CSRF Protection
   └─→ CSRF tokens

8. Rate Limiting
   └─→ Prevent abuse

9. Logging
   └─→ Audit trail
```

---

**Architecture Documentation Complete ✅**

For detailed code implementation: `PROJECT_DOCUMENTATION.md`  
For quick reference: `QUICK_REFERENCE_GUIDE.md`  
For setup: `COMPLETE_SETUP_GUIDE.md`
