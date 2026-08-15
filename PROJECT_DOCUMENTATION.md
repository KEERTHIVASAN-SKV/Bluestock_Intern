# 📈 BLUESTOCK IPO PORTAL - PROJECT DOCUMENTATION

**Project Name:** Bluestock IPO Portal  
**Type:** Full-Stack Web Application  
**Purpose:** Real-time IPO tracking and management platform  
**Organization:** Bluestock  
**Status:** Internship Project  

---

## 🎯 PROJECT OVERVIEW

The Bluestock IPO Portal is a comprehensive web application designed to help users track, analyze, and manage Initial Public Offerings (IPOs) in the Indian stock market. The platform provides real-time data from NSE (National Stock Exchange) and offers features for both regular users and administrators.

### Key Objectives:
- ✅ Display IPOs categorized as Upcoming, Ongoing, and Listed
- ✅ Provide real-time market data and stock analysis
- ✅ Enable user registration and authentication
- ✅ Allow users to track IPO applications
- ✅ Provide admin panel for IPO management
- ✅ Offer market analysis and trading insights

---

## 💡 FEATURES

### User Features:
- **Browse IPOs**: View upcoming, ongoing, and listed IPOs
- **User Authentication**: Secure JWT-based login/signup
- **IPO Tracking**: Add IPOs to personal watchlist
- **Market Analysis**: View stock price movements and trends
- **Blog & News**: Read investment articles and market updates
- **Broker Comparison**: Compare different broker services
- **Stock Analysis**: Technical analysis and market movers

### Admin Features:
- **Dashboard**: Monitor all IPOs and applications
- **Manage IPOs**: Add, edit, delete IPO data
- **Register New IPOs**: Create new IPO entries with details
- **Manage Companies**: Add and manage company information
- **View Applications**: Monitor user IPO applications
- **Data Management**: Manage documents and regulatory files

---

## ⚙️ TECHNOLOGY STACK

### Backend:
- **Framework**: Django 5.2.3
- **API**: Django REST Framework 3.16.0
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL 17.10
- **Data Processing**: Pandas, NumPy
- **Real-time Data**: nselib 2.0.1 (NSE data)
- **Language**: Python 3.13

### Frontend:
- **Framework**: React 19.0.0
- **Routing**: React Router 7.3.0
- **Styling**: Tailwind CSS 4.1.10, Bootstrap 5.3.3
- **HTTP Client**: Axios 1.8.2
- **Charts**: Chart.js 4.4.8, Recharts 2.15.1
- **State Management**: React Context API
- **Build Tool**: Vite 6.2.0

### Database:
- **DBMS**: PostgreSQL 17.10
- **Tables**: Companies, IPOs, Documents, Applications, Users
- **ORM**: Django ORM

---

## 📁 PROJECT STRUCTURE

```
D:\Intern\IPO-Web-App-main\IPO-Web-App-main\
├── backend/                          (Django Backend)
│   ├── ipo_backend/
│   │   ├── settings.py              (Django configuration)
│   │   ├── urls.py                  (URL routing)
│   │   ├── wsgi.py                  (WSGI config)
│   │   └── .env                     (Environment variables)
│   ├── ipo/                         (Main app)
│   │   ├── models.py                (Database models)
│   │   ├── views.py                 (API logic)
│   │   ├── serializers.py           (Data serialization)
│   │   ├── urls.py                  (App URLs)
│   │   └── migrations/              (Database migrations)
│   ├── manage.py                    (Django CLI)
│   ├── requirement.txt              (Python dependencies)
│   └── venv/                        (Virtual environment)
│
├── frontend/                         (React Frontend)
│   ├── src/
│   │   ├── App.jsx                  (Main component)
│   │   ├── AuthProvider.jsx         (Auth context)
│   │   ├── pages/                   (Page components)
│   │   │   ├── Admin-View/          (Admin dashboard)
│   │   │   ├── Authontiction/       (Login/Signup)
│   │   │   ├── Blog/                (Blog pages)
│   │   │   ├── Broker/              (Broker comparison)
│   │   │   ├── IPO/                 (IPO listing)
│   │   │   └── Home/                (Home page)
│   │   ├── App.css                  (Styles)
│   │   └── index.css                (Global styles)
│   ├── public/                      (Static files)
│   ├── package.json                 (npm dependencies)
│   ├── vite.config.js               (Vite configuration)
│   └── index.html                   (HTML template)
│
├── venv/                            (Project venv - at root)
├── README.md                        (Original project readme)
└── PROJECT_DOCUMENTATION.md         (This file)
```

---

## 📊 DATABASE SCHEMA

### 1. Company Table
```
- company_id (Primary Key)
- company_name (CharField, max 255)
- company_logo (URLField, max 500)
```

### 2. IPO Table
```
- id (Primary Key)
- company_id (Foreign Key → Company)
- price_band (CharField, max 50)
- open_date (DateField)
- close_date (DateField)
- issue_size (CharField, max 100)
- issue_type (CharField, max 50)
- listing_date (DateField)
- status (CharField - Upcoming/Open/Closed/Listed)
- ipo_price (DecimalField)
- listing_price (DecimalField)
- listing_gain (DecimalField - %)
- current_market_price (DecimalField)
- current_return (DecimalField - %)
```

### 3. Document Table
```
- id (Primary Key)
- ipo_id (Foreign Key → IPO)
- rhp_pdf (URLField - Red Herring Prospectus)
- drhp_pdf (URLField - Draft Red Herring Prospectus)
```

### 4. User Table (Django Built-in)
```
- id (Primary Key)
- username (CharField, unique)
- email (EmailField, unique)
- password (CharField, hashed)
- first_name (CharField)
- last_name (CharField)
```

### 5. Application Table
```
- id (Primary Key)
- user_id (Foreign Key → User)
- ipo_id (Foreign Key → IPO)
- quantity (IntegerField)
- status (CharField - status of application)
```

---

## 🔗 API ENDPOINTS

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/token/` | Obtain JWT token |
| POST | `/api/token/refresh/` | Refresh JWT token |
| POST | `/api/v1/register/` | User registration |

### IPO Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/ipos/` | Get all IPOs |
| POST | `/api/v1/ipos/` | Create new IPO (Admin) |
| GET | `/api/v1/ipos/{id}/` | Get specific IPO |
| PUT | `/api/v1/ipos/{id}/` | Update IPO (Admin) |
| DELETE | `/api/v1/ipos/{id}/` | Delete IPO (Admin) |
| GET | `/api/v1/ipos/?status=Upcoming` | Filter by status |
| GET | `/api/v1/ipos/?search=CompanyName` | Search by company |

### Company Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/companies/` | Get all companies |
| POST | `/api/v1/companies/` | Create company (Admin) |
| GET | `/api/v1/companies/{id}/` | Get specific company |
| PUT | `/api/v1/companies/{id}/` | Update company (Admin) |
| DELETE | `/api/v1/companies/{id}/` | Delete company (Admin) |

### User Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/users/` | Get all users (Admin) |
| POST | `/api/v1/users/` | Create user |
| GET | `/api/v1/users/{id}/` | Get specific user |

### Applications
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/applications/` | Get all applications |
| POST | `/api/v1/applications/` | Create application |
| GET | `/api/v1/applications/{id}/` | Get specific application |

### Market Data
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/stock/` | Get market movers (52-week high/low) |

---

## 🖥️ FRONTEND PAGES & ROUTES

### Public Pages:
- `/` - Home page (hero, features, testimonials)
- `/ipo` - IPO listings
- `/about` - About us
- `/blog` - Blog articles
- `/broker` - Broker comparison
- `/sector` - Sector analysis
- `/analysis` - Market analysis
- `/technical` - Technical analysis
- `/contact` - Contact us

### User Pages:
- `/login` - User login
- `/signup` - User registration
- `/forgot` - Forgot password
- `/mainhome` - User dashboard

### Admin Pages:
- `/dashboard` - Admin dashboard
- `/manageipo` - Manage IPOs
- `/registeripo` - Register new IPO

---

## 🔐 SECURITY & AUTHENTICATION

### JWT Authentication Flow:
1. User submits credentials to `/api/token/`
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage/sessionStorage
4. All subsequent requests include token in Authorization header
5. Backend validates token before processing request

### Protected Routes:
- Admin pages require admin authentication
- User-specific data requires user authentication
- Some pages are public (home, blog, about)

### Security Features:
- ✅ CORS enabled for frontend communication
- ✅ JWT token expiration (configurable)
- ✅ Password hashing with Django default
- ✅ CSRF protection
- ✅ SQL injection prevention via ORM

---

## 🚀 SETUP & DEPLOYMENT

### Prerequisites:
- Python 3.13+
- Node.js 16+
- PostgreSQL 17.10
- pip & npm package managers

### Backend Setup:
```bash
# Navigate to project root
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main

# Activate virtual environment
venv\Scripts\activate

# Navigate to backend
cd ipo_backend

# Install dependencies
pip install -r requirement.txt

# Create database (PostgreSQL)
psql -U postgres -c "CREATE DATABASE ipo_db;"

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

**Backend URL**: http://localhost:8000/

### Frontend Setup:
```bash
# Navigate to frontend
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend URL**: http://localhost:5173/

### Database Configuration:
- **Host**: localhost
- **Port**: 5432
- **Database**: ipo_db
- **User**: postgres
- **Password**: [Set during PostgreSQL installation]

---

## 📝 KEY COMPONENTS EXPLANATION

### Backend - Views (views.py)
**What it does**: Handles API logic and business operations

**Key Components**:
1. **CompanyViewSet**: CRUD operations for companies
2. **IPOViewSet**: CRUD operations for IPOs with filtering by status
3. **DocumentViewSet**: Manage IPO documents (RHP, DRHP PDFs)
4. **UserViewSet**: User management (admin)
5. **ApplicationViewSet**: Track user IPO applications
6. **MarketMoverData**: Real-time market data (52-week high/low)
7. **RegisterView**: User registration endpoint

### Backend - Models (models.py)
**What it does**: Defines database structure

**Key Models**:
1. **Company**: Stores company information
2. **IPO**: Stores IPO details and stock prices
3. **Document**: Links regulatory documents to IPOs
4. **Application**: Tracks user IPO subscriptions
5. **User**: Django's built-in user model

### Backend - Serializers (serializers.py)
**What it does**: Converts model data to JSON and vice versa

**Key Serializers**:
1. **CompanySerializer**: Serializes company data
2. **IPOSerializer**: Serializes IPO with nested company data
3. **DocumentSerializer**: Serializes document data
4. **UserSerializer**: Handles user registration
5. **ApplicationSerializer**: Serializes application data

### Frontend - App Structure (App.jsx)
**What it does**: Main routing and layout component

**Key Features**:
- Defines all application routes
- Wraps app with AuthProvider for authentication
- Includes Navbar for navigation
- Routes organized by feature (IPO, Blog, Admin, etc.)

### Frontend - Authentication (AuthProvider.jsx)
**What it does**: Manages user authentication state

**Provides**:
- Login/logout functionality
- JWT token management
- User context across app
- Protected route wrapper

---

## 🔄 WORKFLOW EXAMPLES

### User Registration & Login:
1. User fills signup form on `/signup`
2. Frontend sends credentials to `/api/v1/register/`
3. Backend creates user in database
4. User redirected to login page
5. User logs in, receives JWT token
6. Frontend stores token for authenticated requests

### IPO Browsing:
1. User visits `/ipo` page
2. Frontend fetches `/api/v1/ipos/` (all IPOs)
3. Backend returns IPO list with company details
4. Frontend displays categorized IPOs (Upcoming/Ongoing/Listed)
5. User can filter by status or search by company

### Admin Adding IPO:
1. Admin logs in and goes to `/registeripo`
2. Admin fills IPO form with company and details
3. Frontend sends POST to `/api/v1/ipos/`
4. Backend validates and creates IPO record
5. IPO appears in all user views
6. Real-time stock data fetched from NSE API

### Market Data Display:
1. Frontend calls `/api/v1/stock/`
2. Backend fetches NSE data using nselib
3. Calculates 52-week highs and lows
4. Returns top 18 stocks near highs/lows
5. Frontend displays in analytics/market movers section

---

## 🛠️ MAINTENANCE & MONITORING

### Key Files to Monitor:
- `.env` - Environment variables and secrets
- `settings.py` - Django configuration
- `models.py` - Database schema
- `views.py` - API business logic
- `package.json` - Frontend dependencies

### Regular Tasks:
- [ ] Update dependencies (pip, npm)
- [ ] Monitor database size
- [ ] Check API performance
- [ ] Review error logs
- [ ] Backup database regularly
- [ ] Update security patches

### Common Issues & Solutions:

**Issue**: 401 Unauthorized Error
- **Cause**: Invalid or expired JWT token
- **Solution**: Log in again to get new token

**Issue**: CORS Error
- **Cause**: Frontend and backend not on same origin
- **Solution**: Check CORS settings in settings.py

**Issue**: Database Connection Error
- **Cause**: PostgreSQL not running
- **Solution**: Start PostgreSQL service

**Issue**: API returns 404
- **Cause**: Endpoint doesn't exist
- **Solution**: Check URLs configuration

---

## 📈 FUTURE ENHANCEMENTS

### Planned Features:
- [ ] Mobile app (React Native)
- [ ] Email notifications for IPO updates
- [ ] Advanced portfolio tracking
- [ ] Push notifications
- [ ] Payment integration
- [ ] Social sharing features
- [ ] Machine learning for predictions
- [ ] Advanced charting library
- [ ] Multi-language support
- [ ] API rate limiting

### Performance Improvements:
- [ ] Implement caching (Redis)
- [ ] Database query optimization
- [ ] Frontend bundle optimization
- [ ] CDN integration
- [ ] Lazy loading images
- [ ] API response compression

---

## 📞 SUPPORT & RESOURCES

### Documentation Links:
- Django Docs: https://docs.djangoproject.com/
- DRF Docs: https://www.django-rest-framework.org/
- React Docs: https://react.dev/
- PostgreSQL Docs: https://www.postgresql.org/docs/
- JWT Docs: https://jwt.io/

### Code Style:
- Follow PEP 8 for Python
- Use ESLint for JavaScript
- Consistent naming conventions
- Add docstrings to functions
- Comment complex logic

---

## ✅ TESTING CHECKLIST

### Backend Testing:
- [ ] Test all API endpoints with Postman/Insomnia
- [ ] Verify authentication flow
- [ ] Check filtering and search functionality
- [ ] Test create/update/delete operations
- [ ] Verify error handling
- [ ] Test with invalid data inputs

### Frontend Testing:
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Verify all routes work correctly
- [ ] Test authentication flow
- [ ] Check form validation
- [ ] Test data loading states
- [ ] Verify error messages display

### Integration Testing:
- [ ] Frontend communicates with backend
- [ ] Authentication tokens work correctly
- [ ] Data persists in database
- [ ] Filtering and search work end-to-end
- [ ] Admin operations reflected for users

---

## 📋 DEPLOYMENT CHECKLIST

Before production deployment:
- [ ] Set DEBUG = False in settings.py
- [ ] Update SECRET_KEY in environment
- [ ] Configure ALLOWED_HOSTS
- [ ] Set up SSL/HTTPS
- [ ] Configure email for notifications
- [ ] Set up database backups
- [ ] Configure static files serving
- [ ] Set up error logging
- [ ] Test all critical workflows
- [ ] Create admin account
- [ ] Populate with sample data

---

## 👥 PROJECT TEAM

**Organization**: Bluestock  
**Type**: Internship Project  
**Purpose**: Real-time IPO Portal for Indian Stock Market

---

## 📄 VERSION INFORMATION

- **Project Version**: 1.0.0
- **Django Version**: 5.2.3
- **React Version**: 19.0.0
- **Node.js**: 16+
- **Python**: 3.13+
- **PostgreSQL**: 17.10
- **Documentation Date**: July 2026

---

## 🎓 LEARNING OUTCOMES

This project demonstrates:
- ✅ Full-stack development (Django + React)
- ✅ RESTful API design and implementation
- ✅ JWT authentication
- ✅ Database design and optimization
- ✅ Frontend component architecture
- ✅ State management with React
- ✅ Real-time data integration (NSE API)
- ✅ Responsive web design
- ✅ Git version control
- ✅ Software best practices

---

**Project Documentation Complete ✅**

For setup instructions, see: `COMPLETE_SETUP_GUIDE.md`  
For frontend setup, see: `FRONTEND_SETUP.md`  
For database info, see: `DATABASE_STRUCTURE_AND_DATA.md`
