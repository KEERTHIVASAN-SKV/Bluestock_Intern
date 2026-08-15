# 🚀 QUICK REFERENCE GUIDE - IPO Portal

**For Interns & Developers**  
**Quick Look-Up for Common Tasks**

---

## 🎯 PROJECT AT A GLANCE

| Aspect | Details |
|--------|---------|
| **Project Name** | Bluestock IPO Portal |
| **Type** | Full-Stack Web App |
| **Backend** | Django REST Framework |
| **Frontend** | React 19 |
| **Database** | PostgreSQL 17.10 |
| **API** | RESTful with JWT Auth |
| **Real-time Data** | NSE (Indian Stock Market) |

---

## 📁 FOLDER STRUCTURE (Quick View)

```
D:\Intern\IPO-Web-App-main\IPO-Web-App-main\
├── ipo_backend/          → Django Backend
├── frontend/             → React Frontend
└── venv/                 → Virtual Environment (at root)
```

---

## ⚡ QUICK START (5 Steps)

### Step 1: Activate Backend
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main
venv\Scripts\activate
cd ipo_backend
python manage.py runserver
```
✅ Backend at: http://localhost:8000

### Step 2: Activate Frontend (New Terminal)
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\frontend
npm run dev
```
✅ Frontend at: http://localhost:5173

### Step 3: Access Admin Panel
```
http://localhost:8000/admin/
Login with admin credentials
```

### Step 4: View Stock Page
```
http://localhost:5173/
Browse IPO listings
```

### Step 5: API Testing
```
http://localhost:8000/api/v1/ipos/
View all IPOs in JSON format
```

---

## 🔑 KEY MODELS (Database Structure)

### Company
```python
- company_name: str
- company_logo: url
```

### IPO
```python
- company: ForeignKey(Company)
- price_band: str
- open_date: date
- close_date: date
- ipo_price: decimal
- listing_price: decimal
- current_market_price: decimal
- status: enum (Upcoming/Open/Closed/Listed)
```

### Application
```python
- user: ForeignKey(User)
- ipo: ForeignKey(IPO)
- quantity: int
- status: str
```

---

## 🔌 API ENDPOINTS (Most Used)

### IPO Endpoints
```
GET    /api/v1/ipos/                 → All IPOs
POST   /api/v1/ipos/                 → Create IPO
GET    /api/v1/ipos/{id}/            → Get specific IPO
PUT    /api/v1/ipos/{id}/            → Update IPO
DELETE /api/v1/ipos/{id}/            → Delete IPO

Filters:
GET    /api/v1/ipos/?status=Upcoming
GET    /api/v1/ipos/?search=Company
```

### Company Endpoints
```
GET    /api/v1/companies/            → All companies
POST   /api/v1/companies/            → Create company
GET    /api/v1/companies/{id}/       → Get specific
```

### Authentication
```
POST   /api/token/                   → Get JWT token
POST   /api/token/refresh/           → Refresh token
POST   /api/v1/register/             → Register user
```

### Market Data
```
GET    /api/v1/stock/                → Market movers (52-week high/low)
```

---

## 🛣️ FRONTEND ROUTES

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Landing page |
| `/ipo` | IPO Listing | Browse all IPOs |
| `/login` | Login | User login |
| `/signup` | Sign Up | Register account |
| `/dashboard` | Admin Dashboard | Admin panel |
| `/blog` | Blog | Read articles |
| `/broker` | Brokers | Compare brokers |
| `/analysis` | Analytics | Market analysis |

---

## 🔐 AUTHENTICATION FLOW

1. **Register** → POST `/api/v1/register/` with username, password
2. **Login** → POST `/api/token/` with credentials
3. **Get Token** → Receive JWT token in response
4. **Store Token** → Save in localStorage
5. **Use Token** → Send in Authorization header: `Bearer <token>`
6. **Refresh** → POST `/api/token/refresh/` when expired

---

## 💾 DATABASE OPERATIONS

### Create Tables
```bash
python manage.py migrate
```

### Create Admin User
```bash
python manage.py createsuperuser
```

### Reset Database
```bash
python manage.py migrate zero ipo
python manage.py migrate
```

### Access Database
```bash
psql -U postgres -d ipo_db
# Common queries:
SELECT * FROM ipo_company;
SELECT * FROM ipos;
SELECT COUNT(*) FROM auth_user;
```

---

## 🐛 COMMON ERRORS & FIXES

| Error | Cause | Fix |
|-------|-------|-----|
| `ModuleNotFoundError: No module named 'django'` | Venv not activated | Run `venv\Scripts\activate` |
| `connection refused` | Backend not running | Run `python manage.py runserver` |
| `CORS error` | Frontend/backend not communicating | Check CORS settings |
| `401 Unauthorized` | Invalid JWT token | Log in again |
| `404 Not Found` | Wrong endpoint | Check URL in browser/Postman |
| `psycopg2 error` | PostgreSQL not running | Start PostgreSQL service |

---

## 📊 DATA FLOW EXAMPLE

### User Views IPO Stock Page:
```
1. User visits http://localhost:5173/ipo
2. Frontend calls GET /api/v1/ipos/
3. Backend queries database
4. Returns JSON list of IPOs
5. Frontend displays as cards/table
6. User sees price, status, company info
```

### Admin Adds New IPO:
```
1. Admin logs in → /dashboard
2. Clicks "Register New IPO"
3. Fills form → Company, Price, Dates
4. Clicks Submit
5. Frontend POST /api/v1/ipos/
6. Backend creates IPO in database
7. Confirmation message shown
8. IPO visible to all users
```

---

## 📦 IMPORTANT FILES

### Backend
| File | Purpose |
|------|---------|
| `models.py` | Database schema |
| `views.py` | API logic |
| `serializers.py` | Data validation |
| `urls.py` | API routes |
| `settings.py` | Configuration |
| `requirement.txt` | Dependencies |

### Frontend
| File | Purpose |
|------|---------|
| `App.jsx` | Main router |
| `AuthProvider.jsx` | Auth context |
| `pages/` | Page components |
| `App.css` | Styles |
| `package.json` | Dependencies |

---

## 🧪 TESTING QUICKLY

### Test Backend API
```bash
# Using curl
curl http://localhost:8000/api/v1/ipos/

# Using Python
import requests
response = requests.get('http://localhost:8000/api/v1/ipos/')
print(response.json())
```

### Test Login
```bash
curl -X POST http://localhost:8000/api/token/ \
  -d "username=admin&password=yourpassword"
```

### Test Frontend
```bash
# Open browser console (F12)
# Check for errors
# Test API calls in Network tab
```

---

## 📝 FILE NAMING CONVENTIONS

- **Models**: PascalCase (Company, IPO)
- **Functions**: snake_case (get_user_data)
- **Variables**: snake_case (user_count)
- **Components**: PascalCase (CompanyCard)
- **Files**: lowercase-with-dash or camelCase

---

## 🔄 COMMON COMMANDS

### Django
```bash
python manage.py makemigrations    # Create migration
python manage.py migrate            # Apply migration
python manage.py createsuperuser    # Create admin
python manage.py runserver          # Start server
python manage.py shell              # Python shell
python manage.py collectstatic      # Collect static files
```

### npm
```bash
npm install                         # Install deps
npm run dev                         # Start dev server
npm run build                       # Build for production
npm run lint                        # Check code
npm run preview                     # Preview build
```

### Git
```bash
git add .                           # Stage changes
git commit -m "message"             # Commit changes
git push origin branch              # Push to remote
git pull                            # Pull from remote
```

---

## 🎨 IMPORTANT CONSTANTS

### IPO Status Values
```python
'Upcoming'  # IPO not yet open
'Open'      # IPO open for subscriptions
'Closed'    # IPO subscription closed
'Listed'    # IPO listed on stock exchange
```

### Database Configuration
```python
DB_NAME = 'ipo_db'
DB_USER = 'postgres'
DB_HOST = 'localhost'
DB_PORT = 5432
```

### API Base URL (Frontend)
```javascript
const API_URL = 'http://localhost:8000/api/v1/'
```

---

## 📞 USEFUL RESOURCES

- **Django Docs**: https://docs.djangoproject.com/
- **DRF Docs**: https://www.django-rest-framework.org/
- **React Docs**: https://react.dev/
- **API Testing**: Use Postman or Insomnia
- **Database**: Use pgAdmin or psql CLI

---

## ✅ BEFORE YOU START CODING

- [ ] Read PROJECT_DOCUMENTATION.md
- [ ] Activate venv correctly
- [ ] Start both backend and frontend
- [ ] Test APIs in Postman
- [ ] Understand data models
- [ ] Know the feature you're building
- [ ] Create a new branch for features

---

## 🚀 DEPLOYMENT QUICK CHECKLIST

- [ ] Set DEBUG = False
- [ ] Update SECRET_KEY
- [ ] Configure DATABASE (use cloud service)
- [ ] Setup SSL/HTTPS
- [ ] Collect static files
- [ ] Configure email settings
- [ ] Setup error tracking (Sentry)
- [ ] Create database backups
- [ ] Test all critical flows
- [ ] Monitor performance

---

**Last Updated**: July 2026  
**For Questions**: Refer to PROJECT_DOCUMENTATION.md  
**For Setup Issues**: See COMPLETE_SETUP_GUIDE.md
