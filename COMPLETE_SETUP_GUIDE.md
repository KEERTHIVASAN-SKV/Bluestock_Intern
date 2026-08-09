# 🎯 IPO Backend - Complete Setup Guide (All Prerequisites + Configuration)

**Project**: IPO Web Application Backend  
**Framework**: Django 5.2.3 + PostgreSQL 17.10  
**Your Setup**: PostgreSQL Password: `skvasan`  
**Status**: Ready to Configure

---

## ✅ PREREQUISITE 1: Install Python 3.12.3

### Check If Already Installed
```bash
python --version
# Should show: Python 3.12.x or higher
```

### If Not Installed
- Download from: https://www.python.org/downloads/
- Choose: Python 3.12.3
- **Important**: Check "Add Python to PATH" during installation
- Verify: `python --version`

---

## ✅ PREREQUISITE 2: Install PostgreSQL 17.10

### Check If Already Installed
```bash
psql --version
# Should show: psql (PostgreSQL) 17.10
```

### If Not Installed
- Download from: https://www.postgresql.org/download/
- Choose: PostgreSQL 17.10
- During installation:
  - **Username**: postgres (default)
  - **Password**: `skvasan` (YOUR PASSWORD)
  - **Port**: 5432 (default)
  - **Superuser**: postgres

### After Installation
```bash
# Verify installation
psql --version
# Test connection
psql -U postgres -c "SELECT version();"
# Should show PostgreSQL version info
```

---

## ✅ PREREQUISITE 3: Install pip and Virtual Environment

```bash
# Verify pip is installed
pip --version
# Should show: pip X.X.X

# Install virtualenv (if not present)
pip install virtualenv
```

---

## ✅ PREREQUISITE 4: Check Django Framework Requirements

Your `requirement.txt` already has:
- Django 5.2.3
- djangorestframework 3.16.0
- psycopg2-binary 2.9.10 (PostgreSQL connector)
- All other dependencies

No manual Django installation needed!

---

## 🔧 CONFIGURATION FILES UPDATED

### File 1: `.env` - Database Configuration
**Location**: `ipo_backend/ipo_backend/.env`

**Already Updated with Your Credentials:**
```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ipo_db
DB_USER=postgres
DB_PASSWORD=skvasan          ← YOUR PASSWORD
DB_HOST=localhost
DB_PORT=5432
```

### File 2: `settings.py` - Django Configuration
**Location**: `ipo_backend/ipo_backend/settings.py`

**Already Updated to Read from .env:**
```python
DATABASES = {
    "default": {
        "ENGINE": config('DB_ENGINE', 'django.db.backends.postgresql'),
        "NAME": config('DB_NAME', 'ipo_db'),
        "USER": config('DB_USER', 'postgres'),
        "PASSWORD": config('DB_PASSWORD', 'skvasan'),
        "HOST": config('DB_HOST', 'localhost'),
        "PORT": config('DB_PORT', '5432'),
    }
}
```

---

## 🚀 COMPLETE SETUP STEPS (20 Minutes)

### STEP 1: Start PostgreSQL Service

**Windows:**
```bash
# Check if running
pg_isready
# Should show: accepting connections

# If not, start service
net start postgresql-x64-17
```

**Mac:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

**Verify:**
```bash
pg_isready -h localhost
# Output: accepting connections
```

✅ **If you see "accepting connections", continue to STEP 2**

---

### STEP 2: Create Database in PostgreSQL

```bash
# Connect to PostgreSQL
psql -U postgres

# When prompted for password, enter: skvasan

# Create database
CREATE DATABASE ipo_db;

# Verify it was created
\l

# Exit
\q
```

**Expected Output:** Should see `ipo_db` in the database list

✅ **Database created successfully**

---

### STEP 3: Navigate to Project Root Folder

```bash
# Navigate to the project root folder
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main
```

**Verify location:**
```bash
# You should be in a folder with these items:
# - ipo_backend/    (folder)
# - frontend/       (folder)
# - venv/           (folder)
# - README.md       (file)
```

✅ **You're in the project root**

---

### STEP 4: Create Virtual Environment (If Not Exists)

```bash
# Check if venv already exists
# (Look for venv folder in current directory)

# If venv doesn't exist, create it:
python -m venv venv
```

✅ **Virtual environment created**

---

### STEP 5: Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

**Verify Activation:**
```bash
# Your terminal should show: (venv)
# Example: (venv) C:\path\to\IPO-Web-App-main\IPO-Web-App-main>
```

✅ **Virtual environment activated**

---

### STEP 6: Navigate to Backend and Install Dependencies

```bash
# Go to backend folder
cd ipo_backend

# Install all dependencies from backend's requirement.txt
pip install -r requirement.txt
```

**This installs:**
- Django 5.2.3
- djangorestframework 3.16.0
- psycopg2-binary 2.9.10 (PostgreSQL connection)
- django-cors-headers
- django-filter
- djangorestframework-simplejwt (JWT authentication)
- nselib (for stock data)
- And 14+ other packages

**Expected Output:**
```
Successfully installed Django-5.2.3 psycopg2-binary-2.9.10 ...
```

✅ **All dependencies installed**

---

### STEP 7: Verify Database Connection

```bash
# Make sure you're in the backend folder (ipo_backend) with venv activated
python manage.py shell
```

**In the Python shell, run:**
```python
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("SELECT version();")
    print(cursor.fetchone())
exit()
```

**Expected Output:**
```
('PostgreSQL 17.10 ...',)
```

✅ **Django connected to PostgreSQL successfully**

---

### STEP 8: Create Database Tables (Migrations)

```bash
# Make sure you're in ipo_backend folder with (venv) activated
# Create migration files (if needed)
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

**Expected Output:**
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, ipo, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
  Applying ipo.0001_initial... OK
```

✅ **Database tables created successfully**

---

### STEP 9: Create Admin User (Superuser)

```bash
# From ipo_backend folder with (venv) activated
python manage.py createsuperuser
```

**When prompted, enter:**
```
Username: admin
Email: admin@example.com
Password: (enter your password - e.g., Admin@123)
Password (again): (confirm)
```

✅ **Admin user created successfully**

---

### STEP 10: Start Django Server

```bash
# From ipo_backend folder with (venv) activated
python manage.py runserver
```

**Expected Output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

✅ **Server running successfully**

---

### STEP 11: Test Backend

**Option 1: Test Admin Panel**
- Open browser: `http://localhost:8000/admin/`
- Login with admin credentials
- Should see admin dashboard

**Option 2: Test API**
- Open browser: `http://localhost:8000/api/v1/ipos/`
- Should see empty list: `[]` (or existing data if added)

✅ **Backend is working!**

---

## 📊 CURRENT CONFIGURATION

```
PostgreSQL Version:     17.10
Database Name:          ipo_db
Database User:          postgres
Database Password:      skvasan
Database Host:          localhost
Database Port:          5432

Django Version:         5.2.3
Python Version:         3.12.3
REST Framework:         3.16.0
PSycopg2 (Connector):   2.9.10
```

---

## ✅ VERIFICATION CHECKLIST

After completing all 11 steps, verify:

```
PostgreSQL:
  ☐ pg_isready shows "accepting connections"
  ☐ Can login: psql -U postgres (with password: skvasan)
  ☐ Database ipo_db exists

Python/Django:
  ☐ Python version is 3.12.x
  ☐ Virtual environment activated (shows (venv))
  ☐ All dependencies installed (pip list shows Django, psycopg2, etc.)
  ☐ Django shell connects without error

Database:
  ☐ Django migrations applied successfully
  ☐ All tables created in database
  ☐ Superuser created

Server:
  ☐ Server starts without errors
  ☐ Admin panel loads at http://localhost:8000/admin/
  ☐ Can login with admin credentials
  ☐ API responds at http://localhost:8000/api/v1/ipos/
```

✅ **All checked?** → Your backend is fully configured!

---

## 🐛 TROUBLESHOOTING

### Problem 1: "could not connect to server"
**Solution:**
```bash
pg_isready
# If not accepting connections, start PostgreSQL service
net start postgresql-x64-17
```

### Problem 2: "FATAL: password authentication failed"
**Cause:** Wrong password in .env file  
**Solution:**
```bash
# Update .env with correct password: skvasan
# Or reset PostgreSQL password:
psql -U postgres
ALTER USER postgres WITH PASSWORD 'skvasan';
\q
```

### Problem 3: "database does not exist"
**Solution:**
```bash
psql -U postgres -c "CREATE DATABASE ipo_db;"
```

### Problem 4: "psycopg2 module not found"
**Solution:**
```bash
pip install psycopg2-binary==2.9.10
```

### Problem 5: "python: command not found"
**Cause:** Python not installed or not in PATH  
**Solution:**
- Download Python 3.12.3 from python.org
- Install with "Add Python to PATH" checked
- Restart terminal/command prompt

### Problem 6: "venv not found"
**Solution:**
```bash
python -m venv venv
venv\Scripts\activate
```

### Problem 7: "(venv) not showing in terminal"
**Solution:**
```bash
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

### Problem 8: "No module named 'django'"
**Solution:**
```bash
# Make sure venv is activated (shows (venv))
pip install -r requirement.txt
```

---

## 📝 IMPORTANT FILES

```
D:\Intern\IPO-Web-App-main\IPO-Web-App-main\    ← PROJECT ROOT
├── venv\                                        ✓ Virtual environment
├── frontend\                                    ✓ React frontend
├── ipo_backend\                                 ✓ Django backend
│   ├── ipo_backend\
│   │   ├── settings.py                          ✅ Updated (reads from .env)
│   │   ├── .env                                 ✅ Updated (PostgreSQL credentials)
│   │   ├── urls.py                              ✓ No changes needed
│   │   └── wsgi.py                              ✓ No changes needed
│   ├── ipo\
│   │   ├── models.py                            ✓ Database models ready
│   │   ├── views.py                             ✓ API endpoints ready
│   │   ├── serializers.py                       ✓ Data validation ready
│   │   └── urls.py                              ✓ Routes ready
│   ├── manage.py                                ✓ Django CLI tool
│   ├── requirement.txt                          ✓ All dependencies listed
│   └── migrations\                              ✓ Database migrations
└── README.md                                    ✓ Project documentation
```

---

## 🎯 QUICK COMMAND REFERENCE

```bash
# Database
pg_isready                              # Check PostgreSQL running
psql -U postgres -c "SELECT 1;"        # Test connection

# Python/Django - From D:\Intern\IPO-Web-App-main\IPO-Web-App-main
python --version                        # Check Python version
python -m venv venv                    # Create virtual environment
venv\Scripts\activate                  # Activate venv (Windows)
source venv/bin/activate               # Activate venv (Mac/Linux)

# After activating venv, navigate to backend
cd ipo_backend

# Install dependencies (from ipo_backend folder)
pip install -r requirement.txt         # Install from backend folder
pip list                                # See installed packages

# Django commands (all from ipo_backend folder with venv activated)
python manage.py migrate               # Apply migrations
python manage.py createsuperuser       # Create admin user
python manage.py runserver             # Start server
python manage.py shell                 # Python shell
python manage.py collectstatic         # Collect static files

# Testing
http://localhost:8000/admin/           # Admin panel
http://localhost:8000/api/v1/ipos/     # API endpoint
```

---

## ✨ FINAL SUMMARY

### What's Installed:
✅ Python 3.12.3
✅ PostgreSQL 17.10 (password: skvasan)
✅ Django 5.2.3
✅ All required packages
✅ Virtual environment

### What's Configured:
✅ Database connection (.env file)
✅ Django settings (settings.py)
✅ Database created (ipo_db)
✅ Tables created (via migrations)
✅ Admin user created

### What You Can Do:
✅ Access admin panel at /admin/
✅ View API at /api/v1/ipos/
✅ Add companies and IPOs
✅ Manage users
✅ Run development server

### What's Next:
⬜ Setup React frontend
⬜ Connect frontend to backend API
⬜ Add sample data
⬜ Deploy to production

---

## 🎉 YOU'RE READY!

Your friend's IPO Web Application backend is now fully configured and ready for development!

**Start the server anytime with:**
```bash
# From D:\Intern\IPO-Web-App-main\IPO-Web-App-main (project root)
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main
venv\Scripts\activate
cd ipo_backend
python manage.py runserver
```

Then visit: `http://localhost:8000/admin/`

---

**Setup Date**: July 26, 2026  
**Configuration Status**: ✅ COMPLETE  
**Ready for Development**: ✅ YES
