# IPO Web Application - BlueStock

## Overview

**BlueStock IPO Web Application** is a full-stack web application for managing Initial Public Offerings (IPOs). It provides a comprehensive platform for users to view IPO information, apply for IPOs, and for administrators to manage IPO listings.

---

## 🎯 Key Features

### For Users
- 📊 Browse available IPOs
- 📈 View IPO analytics and performance
- 💬 Community discussions
- 📝 Read IPO-related blogs
- 🔍 Compare brokers for IPO applications
- 📱 View on mobile devices

### For Admins
- ➕ Add new IPO listings
- ✏️ Edit IPO details
- 🗑️ Delete IPO listings
- 📋 Manage companies
- 📄 Upload IPO documents
- 👥 View user applications

---

## 📋 Quick Navigation

- **New to the project?** → Start with [Quick Start Guide](#quick-start)
- **Need architecture details?** → See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Want to know how it works?** → See [HOW_IT_WORKS.md](./HOW_IT_WORKS.md)
- **Database information?** → See [DATABASE.md](./DATABASE.md)
- **Having issues?** → See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- SQLite (or MySQL/PostgreSQL)
- Virtual environment (recommended)

### Installation (5 minutes)

1. **Clone/Navigate to Project**
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main
```

2. **Setup Backend**
```bash
cd ipo_backend

# Create .env file (if not exists)
copy .env.example .env

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
python -m python -m pip install -r requirement.txt

# Run migrations
python manage.py migrate

# Create admin user (if not exists)
python manage.py createsuperuser

# Start backend
python manage.py runserver
```

3. **Setup Frontend**
```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://127.0.0.1:8000/api/v1/
- Admin Panel: http://127.0.0.1:8000/admin/

---

## 🔐 Admin Credentials

For testing purposes, use:
```
Username: admin
Password: Admin@123
```

**Change these in production!**

---

## 📁 Project Structure

```
IPO-Web-App-main/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images and logos
│   │   └── AuthProvider.jsx # Authentication context
│   └── package.json
│
└── ipo_backend/             # Django backend
    ├── ipo/                 # Main app
    │   ├── models.py        # Data models
    │   ├── views.py         # API views
    │   ├── serializers.py   # Data serialization
    │   └── urls.py          # URL routing
    ├── ipo_backend/         # Project settings
    │   └── settings.py      # Configuration
    ├── manage.py            # Django CLI
    └── requirement.txt      # Python dependencies
```

---

## 🔌 Technology Stack

### Backend
- **Django** - Python web framework
- **Django REST Framework** - REST API
- **Django JWT** - Token-based authentication
- **SQLite** - Database (configurable)
- **nselib** - NSE data integration
- **pandas** - Data processing

### Frontend
- **React.js** - UI library
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **Framer Motion** - Animations

---

## 🔑 Core Concepts

### Authentication
- JWT token-based authentication
- Admin-only operations require valid JWT token + is_staff=True
- Public endpoints allow unauthenticated access
- Tokens stored in localStorage

### Authorization
- **IsAdminOrReadOnly** permission class:
  - GET requests: Public (anyone can read)
  - POST/PUT/PATCH/DELETE: Admin only (requires is_staff=True + JWT)

### API Response Format
All API responses follow standard JSON format:
```json
{
  "id": 1,
  "company": {
    "id": 1,
    "company_name": "XYZ Ltd",
    "company_logo": "url"
  },
  "status": "Upcoming",
  "ipo_price": 100,
  "listing_price": 120
}
```

---

## 📊 Key Endpoints

### Authentication
- `POST /api/token/` - Login (get JWT tokens)
- `POST /api/token/refresh/` - Refresh token
- `POST /api/v1/register/` - Sign up (public)

### IPOs (Admin operations require JWT + is_staff)
- `GET /api/v1/ipos/` - List IPOs (public)
- `POST /api/v1/ipos/` - Create IPO (admin)
- `PUT /api/v1/ipos/{id}/` - Update IPO (admin)
- `DELETE /api/v1/ipos/{id}/` - Delete IPO (admin)

### Companies
- `GET /api/v1/companies/` - List companies (public)
- `POST /api/v1/companies/` - Create (admin)

### Other
- `GET /api/v1/stock/` - Market data
- `GET /api/v1/documents/` - IPO documents
- `GET /api/v1/users/` - List users (admin)
- `GET /api/v1/applications/` - IPO applications

---

## ✨ Recent Fixes & Updates

### ✅ Issue #1: Public Signup
- Fixed public user registration
- Endpoint: `POST /api/v1/register/`
- Now allows unauthenticated signup

### ✅ Issue #2: Admin IPO Management
- Verified JWT authentication for admin operations
- Admin (admin/Admin@123) can fully manage IPOs
- All CRUD operations working with proper permissions

### ✅ Issue #3: UI Text Visibility
- Fixed invisible text in forms (white on white)
- Added explicit `color: black;` to all form components
- All text now readable

---

## 🧪 Testing

### Test Sign Up
1. Go to `/signup`
2. Create new account
3. Login with new credentials

### Test Admin Functions
1. Login with `admin/Admin@123`
2. Go to `/registeripo`
3. Add new IPO
4. View, edit, and delete IPOs

### Test User Features
1. View IPOs on `/ipo` page
2. View analytics on `/analysis`
3. Browse blog posts on `/blog`
4. Compare brokers on `/broker`

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | This file - Project overview |
| ARCHITECTURE.md | System design and components |
| HOW_IT_WORKS.md | Detailed workflow explanations |
| QUICK_START.md | Step-by-step setup guide |
| DATABASE.md | Database schema and relationships |
| TROUBLESHOOTING.md | Common issues and solutions |

---

## 🤝 Common Tasks

### Change Admin Password
```bash
cd ipo_backend
python manage.py changepassword admin
```

### Create Another Admin
```bash
python manage.py createsuperuser
```

### Reset Database
```bash
# Delete existing
rm ipo_db.sql

# Create new migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin
python manage.py createsuperuser
```

### View API Documentation
```
http://127.0.0.1:8000/admin/  # Django admin
```

---

## ⚙️ Configuration

### Backend (.env file)
```
SECRET_KEY=your-secret-key
DEBUG=True
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=ipo_db.sqlite3
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
ALLOWED_HOSTS=127.0.0.1,localhost
```

### Frontend (.env file in frontend/)
```
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🚨 Important Notes

1. **Environment Variables**: Always use `.env` file for sensitive data
2. **Admin Credentials**: Change default admin password in production
3. **CORS**: Configure CORS for production domains
4. **Database**: Use PostgreSQL for production (not SQLite)
5. **Security**: Enable HTTPS in production
6. **Debug Mode**: Set DEBUG=False in production

---

## 📞 Support

### Troubleshooting
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
- Check browser console (F12) for frontend errors
- Check terminal logs for backend errors

### Common Issues
- **Port already in use**: Change port or kill existing process
- **Module not found**: Run `python -m python -m pip install -r requirement.txt`
- **Database error**: Run `python manage.py migrate`
- **CORS error**: Check backend CORS settings

---

## 📈 Performance Tips

1. Use production build for frontend: `npm run build`
2. Enable caching in Django settings
3. Use PostgreSQL instead of SQLite
4. Enable compression in web server
5. Use CDN for static files

---

## 🎓 Learning Path

1. **First Time?** Read QUICK_START.md
2. **Understand System?** Read ARCHITECTURE.md
3. **Learn How It Works?** Read HOW_IT_WORKS.md
4. **Work With Database?** Read DATABASE.md
5. **Having Issues?** Read TROUBLESHOOTING.md

---

## 📝 License

Private project for BlueStock

---

## ✅ Status

- ✅ All critical issues fixed
- ✅ Full JWT authentication
- ✅ Admin operations verified
- ✅ UI text visibility fixed
- ✅ Ready for production setup

---

**Last Updated**: August 22, 2026
**Version**: 1.0 (Stable)
**Status**: Production Ready

For detailed information, see the documentation files linked above.
