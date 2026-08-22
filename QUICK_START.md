# Quick Start Guide - Get Running in 10 Minutes

## Prerequisites Check
- ✅ Python 3.8+ installed
- ✅ Node.js 14+ installed
- ✅ Project folder: `D:\Intern\IPO-Web-App-main\IPO-Web-App-main`

---

## 🚀 Step 1: Backend Setup (5 minutes)

### 1.1 Navigate to Backend
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\ipo_backend
```

### 1.2 Activate Virtual Environment
```bash
# Windows
.\venv\Scripts\activate

# You should see (venv) in terminal
```

### 1.3 Create .env File
If `.env` doesn't exist:
```bash
copy .env.example .env
```

Edit `.env` with your settings (defaults should work):
```
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=ipo_db.sqlite3
```

### 1.4 Install Dependencies
```bash
python -m pip install -r requirement.txt
```
**Expected**: Takes 2-3 minutes, all packages installed

### 1.5 Run Migrations
```bash
python manage.py migrate
```
**Expected**: Database created/updated successfully

### 1.6 Create Admin User (if first time)
```bash
python manage.py createsuperuser
# Or use existing: admin / Admin@123
```

### 1.7 Start Backend Server
```bash
python manage.py runserver
```

✅ **Expected Output**:
```
Starting development server at http://127.0.0.1:8000/
```

**Keep this terminal open!**

---

## 🎨 Step 2: Frontend Setup (3 minutes)

### 2.1 Open New Terminal
Keep backend terminal open, open a NEW terminal window

### 2.2 Navigate to Frontend
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\frontend
```

### 2.3 Install Dependencies
```bash
npm install
```
**Expected**: Takes 1-2 minutes

### 2.4 Start Frontend Server
```bash
npm run dev
```

✅ **Expected Output**:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

**Keep this terminal open!**

---

## 🧪 Step 3: Test the Application (2 minutes)

### 3.1 Open Browser
Open: `http://127.0.0.1:3000`

### 3.2 Test Signup (First Time Users)
1. Click "Sign Up Now"
2. Fill form:
   - Name: Test User
   - Username: testuser
   - Email: test@example.com
   - Password: Password123!
3. Click "Sign up"
4. Should see: "Signup successful! Please log in."

### 3.3 Test Admin Login
1. Go to: `http://localhost:5173/login`
2. Login with:
   - Username: `admin`
   - Password: `Admin@123`
3. Should redirect to `/dashboard`

### 3.4 Test Admin Features
1. Click on "Dashboard" in navigation
2. You should see admin options
3. Go to `/registeripo` to add IPOs
4. Click "Register" to add new IPO

### 3.5 Test Public Features
1. Click "IPO" in navbar
2. Should see all IPOs
3. Click on IPO for details
4. Browse other pages: Blog, Analysis, Brokers

✅ **All working?** Great! Application is running!

---

## 📍 Quick Reference URLs

| Page | URL | Access |
|------|-----|--------|
| Home | http://127.0.0.1:3000 | Public |
| Sign Up | http://localhost:5173/signup | Public |
| Login | http://localhost:5173/login | Public |
| IPO List | http://localhost:5173/ipo | Public |
| Dashboard | http://localhost:5173/dashboard | Admin |
| Register IPO | http://localhost:5173/registeripo | Admin |
| Manage IPO | http://localhost:5173/manageipo | Admin |
| Analysis | http://localhost:5173/analysis | Public |
| Blog | http://localhost:5173/blog | Public |
| Brokers | http://localhost:5173/broker | Public |
| Admin Panel | http://127.0.0.1:8000/admin/ | Admin |
| API | http://127.0.0.1:8000/api/v1/ | As configured |

---

## 🔐 Admin Credentials

For testing admin features:
```
Username: admin
Password: Admin@123
```

---

## 🎯 Common First Tasks

### Add Your First IPO (as Admin)
1. Login as admin
2. Go to `/registeripo`
3. Fill form:
   - Company Name: "TechCorp Ltd"
   - Open: "01-01-2025"
   - Close: "05-01-2025"
   - Status: "Upcoming"
   - Prices: 100, 120, etc.
4. Click "Register"
5. Go to `/ipo` to see your IPO

### Create Regular User Account
1. Go to `/signup`
2. Fill all fields
3. Click "Sign up"
4. Login with new account

### View All IPOs
1. Go to `/ipo`
2. All public IPOs visible
3. Click on any IPO for details

---

## ⚠️ Troubleshooting - Quick Fixes

### Backend won't start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill the process (if needed)
taskkill /PID <PID> /F

# Try again
python manage.py runserver
```

### "Module not found" error
```bash
# Reinstall dependencies
python -m pip install -r requirement.txt
```

### Frontend won't start
```bash
# Install dependencies again
npm install

# Try again
npm run dev
```

### Database error
```bash
# Reset migrations
python manage.py migrate

# If that fails, delete db and restart
# rm ipo_db.sqlite3
# python manage.py migrate
```

### Port already in use
```bash
# Use different port
python manage.py runserver 8001
npm run dev -- --port 3001
```

---

## 📊 What You Should See

### Backend Terminal (runserver)
```
Starting development server at http://127.0.0.1:8000/
Django version 5.0, using settings 'ipo_backend.settings'
Quit the server with CONTROL-C.
```

### Frontend Terminal (npm run dev)
```
VITE v4.0.0 ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Browser
- Home page with logo and navigation
- Ability to navigate to all pages
- Sign up form working
- Admin login working
- Admin features visible when logged in

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend running on http://127.0.0.1:8000
- [ ] Frontend running on http://127.0.0.1:3000
- [ ] Can access home page
- [ ] Can signup new account
- [ ] Can login as admin (admin/Admin@123)
- [ ] Can see admin dashboard
- [ ] Can register new IPO as admin
- [ ] Can view IPOs on public page
- [ ] No errors in browser console (F12)
- [ ] No errors in terminal logs

---

## 🎓 Next Steps

After getting everything running:

1. **Understand Architecture** → See [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Learn How It Works** → See [HOW_IT_WORKS.md](./HOW_IT_WORKS.md)
3. **Database Details** → See [DATABASE.md](./DATABASE.md)
4. **API Operations** → See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) (API section)
5. **Customization** → Modify as needed

---

## 🆘 Still Having Issues?

1. **Check TROUBLESHOOTING.md** for detailed solutions
2. **Check browser console**: F12 → Console tab
3. **Check backend logs**: Look at terminal where runserver is running
4. **Check frontend logs**: Look at terminal where npm run dev is running

---

## ⏱️ Timing Reference

If everything works smoothly:
- Backend setup: ~3-5 minutes
- Frontend setup: ~2-3 minutes
- Testing: ~2 minutes
- **Total: ~7-10 minutes**

If issues occur:
- Troubleshooting adds 5-15 minutes

---

## 💡 Pro Tips

1. Keep both terminals open side-by-side for easy monitoring
2. Use browser DevTools (F12) for frontend debugging
3. Check Django admin at `http://127.0.0.1:8000/admin/` for database
4. Use curl or Postman to test API endpoints manually
5. Clear browser cache if you see old pages: Ctrl+Shift+Delete

---

**You're all set!** 🎉

Start exploring the application and refer to other documentation files as needed.

For architecture details → [ARCHITECTURE.md](./ARCHITECTURE.md)
For troubleshooting → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
