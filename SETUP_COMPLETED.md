# ✅ Backend Configuration - COMPLETED

**Status**: All configuration done. Ready to setup your laptop.

---

## 📋 Configuration Summary

| Item | Details |
|------|---------|
| **PostgreSQL Version** | 17.10 |
| **PostgreSQL User** | postgres |
| **PostgreSQL Password** | skvasan |
| **Database Name** | ipo_db |
| **Host** | localhost |
| **Port** | 5432 |
| **Django Version** | 5.2.3 |
| **Python Version** | 3.12.3 |

---

## 📁 Files Modified

### ✅ `.env` - Updated
**Location**: `ipo_backend/ipo_backend/.env`

**Changes Made**:
```env
DB_PASSWORD=skvasan        
```

### ✅ `settings.py` - Updated  
**Location**: `ipo_backend/ipo_backend/settings.py`

**Changes Made**:
```python
"PASSWORD": config('DB_PASSWORD', 'skvasan'),  ← Changed fallback password
```

---

## 🎯 Follow These Steps (20 Minutes)

### 1. Install Python 3.12.3
- Download from: https://www.python.org/downloads/
- Check "Add Python to PATH"
- Verify: `python --version`

### 2. Install PostgreSQL 17.10
- Download from: https://www.postgresql.org/download/
- **Username**: postgres
- **Password**: skvasan
- **Port**: 5432

### 3. Create Database
```bash
psql -U postgres
CREATE DATABASE ipo_db;
\q
```

### 4. Navigate to Project Root
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main
```

### 5. Create & Activate Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 6. Navigate to Backend
```bash
cd ipo_backend
```

### 7. Install Dependencies
```bash
pip install -r requirement.txt
```

### 8. Apply Migrations
```bash
python manage.py migrate
```

### 9. Create Admin User
```bash
python manage.py createsuperuser
# Username: admin
# Email: admin@example.com
# Password: (your choice)
```

### 10. Start Server
```bash
python manage.py runserver
```

### 11. Test in Browser
```
http://localhost:8000/admin/
```

---

## 📖 Read This File

**For complete step-by-step instructions**: Read `COMPLETE_SETUP_GUIDE.md`

It contains:
- ✅ All prerequisites
- ✅ Detailed setup steps
- ✅ Configuration explanation
- ✅ Troubleshooting guide
- ✅ Verification checklist

---

## ⏱️ Time Required

- Python Installation: 5 minutes
- PostgreSQL Installation: 5 minutes
- Django Setup: 5 minutes
- Database Configuration: 3 minutes
- Testing: 2 minutes

**Total**: ~20 minutes

---

## 🎨 FRONTEND SETUP (To See Stock Page)

After backend is running, setup the frontend:

### Step 1: Open New Terminal
```bash
# Keep backend running in first terminal
# Open NEW terminal for frontend
```

### Step 2: Navigate to Frontend
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\frontend
```

### Step 3: Install Frontend Dependencies
```bash
npm install
```

### Step 4: Start Frontend Server
```bash
npm run dev
```

### Step 5: Open in Browser
```
http://localhost:5173/
# or whatever port shows in terminal
```

You should now see the stock IPO page!

---

## ✨ After Setup

Your backend will have:
- ✅ PostgreSQL 17.10 connected
- ✅ Django 5.2.3 running
- ✅ All dependencies installed
- ✅ Admin panel at `/admin/`
- ✅ API ready at `/api/v1/`

---

## 🚀 Start with

→ Open and follow: **COMPLETE_SETUP_GUIDE.md**

**Quick Start Command (from D:\Intern\IPO-Web-App-main\IPO-Web-App-main):**
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main
venv\Scripts\activate
cd ipo_backend
python manage.py runserver
```

Then visit: `http://localhost:8000/admin/`

---

**Status**: ✅ Configuration Complete
