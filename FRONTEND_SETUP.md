# 🎨 FRONTEND SETUP - IPO Web App

**Purpose**: Setup React frontend to see the stock IPO page  
**Time**: ~10 minutes  
**Prerequisites**: Backend already running (see SETUP_COMPLETED.md)

---

## 📋 REQUIREMENTS

Before starting frontend, make sure:
- ✅ Backend is running on `http://localhost:8000`
- ✅ Node.js installed (version 16+)
- ✅ npm installed

Check Node.js:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## 🚀 QUICK START - Frontend Setup

### Step 1: Keep Backend Running

In **FIRST TERMINAL**, backend should be running:
```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\ipo_backend
python manage.py runserver
```

**Don't close this terminal!**

---

### Step 2: Open NEW Terminal for Frontend

Open a **NEW command prompt** or PowerShell window.

---

### Step 3: Navigate to Frontend Folder

```bash
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\frontend
```

Verify you're in correct location:
```bash
# Should see files like:
# - package.json
# - src/
# - public/
# - vite.config.js
```

---

### Step 4: Install Dependencies

```bash
npm install
```

**What this does**: Downloads all React packages needed for frontend

**Expected output**: 
```
added XXX packages in XXs
```

**Note**: This may take 2-5 minutes depending on internet speed

---

### Step 5: Start Frontend Server

```bash
npm run dev
```

**Expected output**:
```
  VITE v... dev server running at:
  
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Note**: Your port might be different (5174, 5175, etc.) - that's okay!

---

### Step 6: Open in Browser

Open your web browser and go to:
```
http://localhost:5173/
```

(Or whatever port was shown in terminal)

---

## ✅ You Should See:

✅ IPO Web App homepage  
✅ Navigation menu (Analytics, Blog, Broker, etc.)  
✅ Stock IPO listings  
✅ Login/Register buttons  

**If you see this, frontend is working!** 🎉

---

## 🔌 CONNECTING FRONTEND TO BACKEND

The frontend automatically connects to backend at:
```
http://localhost:8000/api/v1/
```

**To verify connection is working:**

1. Open browser DevTools: Press `F12`
2. Go to **Network** tab
3. Refresh page (F5)
4. You should see API calls to `localhost:8000`

If you see errors like "CORS error" or "connection refused":
- Make sure backend is still running
- Check both servers are on localhost
- See troubleshooting section below

---

## 🎨 FRONTEND FEATURES

### Home Page
- Welcome banner
- Featured IPOs
- Links to features

### Analytics
- Stock charts and trends
- IPO performance data

### Blog
- News and articles about IPOs
- Market updates

### Broker Comparison
- Compare different brokers
- Pricing and features

### Admin Panel (If Logged In)
- Manage IPOs
- Add companies
- View applications

---

## 📁 FOLDER STRUCTURE

```
D:\Intern\IPO-Web-App-main\IPO-Web-App-main\frontend\
├── src/
│   ├── App.jsx                    Main component
│   ├── App.css                    Main styles
│   ├── main.jsx                   Entry point
│   ├── pages/                     Page components
│   └── assets/                    Images, icons
├── public/                        Static files
├── package.json                   Dependencies list
├── vite.config.js                 Vite configuration
├── index.html                     HTML template
└── eslint.config.js               Linting rules
```

---

## 🔧 COMMON COMMANDS

### Install dependencies:
```bash
npm install
```

### Start development server:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Lint code:
```bash
npm run lint
```

---

## ⚠️ TROUBLESHOOTING

### Problem 1: "npm command not found"
**Cause**: Node.js not installed  
**Solution**:
- Download Node.js from https://nodejs.org/
- Install it (check "Add to PATH")
- Restart terminal
- Try again

### Problem 2: "Port already in use"
**Example error**: `EADDRINUSE :::5173`  
**Cause**: Something else is using port 5173  
**Solution**:
```bash
# Kill process on that port (Windows)
netstat -ano | findstr :5173

# Get PID from output, then:
taskkill /PID <PID> /F

# Try again:
npm run dev
```

### Problem 3: "Module not found"
**Example error**: `Cannot find module '@react/...'`  
**Cause**: Dependencies not fully installed  
**Solution**:
```bash
# Delete old installation
rmdir /s /q node_modules

# Delete lock file
del package-lock.json

# Reinstall fresh
npm install
```

### Problem 4: "Backend not responding"
**Cause**: Backend not running or CORS issue  
**Solution**:
```bash
# Check backend is running
# Terminal 1 should show:
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

# If not running:
cd D:\Intern\IPO-Web-App-main\IPO-Web-App-main\ipo_backend
python manage.py runserver
```

### Problem 5: "Page shows blank/white"
**Cause**: React not loading properly  
**Solution**:
1. Check browser console (F12) for errors
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)
4. Try different browser

---

## 🌐 ACCESSING DIFFERENT PAGES

### Home
```
http://localhost:5173/
```

### Login
```
http://localhost:5173/login
```

### IPO Analytics
```
http://localhost:5173/analytics
```

### Blog
```
http://localhost:5173/blog
```

### Broker Comparison
```
http://localhost:5173/broker
```

### Admin Panel (requires login)
```
http://localhost:8000/admin/
```

---

## 🎯 NEXT STEPS

1. ✅ Backend running on `localhost:8000`
2. ✅ Frontend running on `localhost:5173`
3. ✅ Both communicate via API
4. Add sample data through admin panel
5. Browse IPO listings
6. Test login/registration

---

## 📊 TECH STACK - FRONTEND

```
React 18              - UI framework
Vite                  - Build tool
Tailwind CSS          - Styling
React Router          - Navigation
Axios                 - HTTP requests
JavaScript/ES6        - Language
```

---

## 📝 ENVIRONMENT VARIABLES

If needed, create `.env` in frontend folder:

```
VITE_API_URL=http://localhost:8000/api/v1/
VITE_API_TIMEOUT=5000
```

But usually not needed - frontend auto-detects backend.

---

## 🚀 DEPLOYMENT (LATER)

When ready to deploy:

```bash
# Build production version
npm run build

# This creates "dist/" folder

# Deploy "dist/" folder to web server
```

---

## ✨ YOU'RE DONE!

Frontend is now running and connected to backend!

- Backend: `http://localhost:8000` (Django)
- Frontend: `http://localhost:5173` (React)
- Database: PostgreSQL (ipo_db)

Both servers must run simultaneously to use the app!

---

**Happy coding! 🎉**

---

**Next**: 
- Add sample IPO data via admin panel
- Browse and test stock pages
- Login with admin account
- Explore features!
