# Troubleshooting Guide & API Reference

## 🚨 Common Issues & Solutions

### 1. Backend Issues

#### Backend Won't Start

**Error**: `Address already in use`

**Solution**:
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process
taskkill /PID <PID> /F

# Start backend again
python manage.py runserver
```

**Alternative**: Use different port
```bash
python manage.py runserver 8001
```

---

#### ModuleNotFoundError: No module named 'pandas'

**Error**: `ModuleNotFoundError: No module named 'pandas'`

**Solution**:
```bash
# Activate virtual environment
.\venv\Scripts\activate

# Reinstall requirements
python -m python -m pip install -r requirement.txt

# Or install specific package
pip install pandas nselib
```

---

#### Database Migration Error

**Error**: `django.db.utils.OperationalError: no such table`

**Solution**:
```bash
# Run migrations
python manage.py migrate

# If still failing, reset database
del ipo_db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

---

#### SECRET_KEY not found

**Error**: `ImproperlyConfigured: The SECRET_KEY setting must not be empty`

**Solution**:
1. Create `.env` file in `ipo_backend/` folder
2. Copy from `.env.example`:
   ```bash
   copy .env.example .env
   ```
3. Add SECRET_KEY:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ```
4. Restart backend

---

#### Virtual Environment Issues

**Error**: `The system cannot find the path specified`

**Solution**:
```bash
# Check venv exists
ls .\venv\Scripts\

# If not, create new venv
python -m venv venv

# Activate it
.\venv\Scripts\activate

# Install requirements
python -m python -m pip install -r requirement.txt
```

---

### 2. Frontend Issues

#### Frontend Won't Start

**Error**: `Port 3000 already in use`

**Solution**:
```bash
# Use different port
npm run dev -- --port 3001

# Or kill process on 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm run dev
```

---

#### npm install fails

**Error**: `npm ERR! Various dependency errors`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rmdir /s /q node_modules

# Reinstall
npm install

# If still failing, try
npm install --legacy-peer-deps
```

---

#### Text Still Invisible

**Error**: Form text is white/invisible

**Solution**:
```javascript
// Hard refresh browser
Ctrl + Shift + R

// Or clear cache
Ctrl + Shift + Delete

// Or restart frontend
npm run dev
```

---

### 3. Authentication Issues

#### Can't Login as Admin

**Error**: "Invalid Credentials"

**Credentials to Use**:
```
Username: admin
Password: Admin@123
```

**If Still Failing**:
```bash
# Reset admin password
python manage.py changepassword admin

# Or create new admin
python manage.py createsuperuser
```

---

#### Signup Not Working

**Error**: "Signup failed"

**Check**:
1. Backend is running: `python manage.py runserver`
2. Endpoint is correct: `/api/v1/register/` (not `/api/v1/users/`)
3. Check browser console: F12 → Console tab for error
4. Check backend logs for error message

**Solution**:
```bash
# Check endpoint in urls.py
# Should have: path('api/v1/register/', RegisterView.as_view(), name='register')

# Verify RegisterView has AllowAny permission
# Should have: permission_classes = [AllowAny]

# Restart backend if changed
python manage.py runserver
```

---

#### Session/Token Issues

**Error**: "401 Unauthorized" suddenly appears

**Reason**: Access token expired (5 minutes)

**Solution**:
- Automatic: App retries with refresh token
- Manual: Logout and login again

**If Still Failing**:
```javascript
// Clear tokens
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');

// Refresh page
location.reload();

// Login again
```

---

#### Can't Add IPO as Admin

**Error**: "You must be admin" or "Forbidden"

**Check**:
1. Are you logged in as admin?
   - Username: `admin`
   - Password: `Admin@123`
2. Check localStorage has token: F12 → Application → Local Storage → `accessToken`
3. Is the token included in request? F12 → Network → Look for Authorization header

**Solution**:
```bash
# Verify user is admin in database
python manage.py shell
>>> from django.contrib.auth.models import User
>>> u = User.objects.get(username='admin')
>>> u.is_staff
True  # Should be True

# If False, fix it
>>> u.is_staff = True
>>> u.save()
```

---

### 4. Network & API Issues

#### CORS Error in Console

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:

In `ipo_backend/settings.py`:
```python
# Make sure CORS is enabled
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

Restart backend after changes:
```bash
python manage.py runserver
```

---

#### API Returns 404

**Error**: `404 Not Found` from API

**Check**:
- Correct endpoint? `/api/v1/ipos/` (not `/api/ipos/`)
- Correct domain? `http://127.0.0.1:8000` (not `localhost`)
- URL trailing slash? `/ipos/` (not `/ipos`)

**Test Endpoint**:
```bash
# Open browser or use curl
curl http://127.0.0.1:8000/api/v1/ipos/

# Should return JSON list of IPOs
```

---

#### API Returns 500 Error

**Error**: `500 Internal Server Error`

**Solution**:
1. Check backend terminal for error message
2. Check backend logs
3. Look for specific error in output

**Common 500 Causes**:
- Database not migrated: `python manage.py migrate`
- Missing import: Check if all imports in views.py
- Serializer error: Check serializers.py syntax

---

### 5. UI/Display Issues

#### Buttons Don't Work

**Error**: Click button, nothing happens

**Check**:
1. Browser console errors: F12 → Console
2. Network errors: F12 → Network tab
3. Backend running: http://127.0.0.1:8000

**Solution**:
```javascript
// Check browser console for error
F12 → Console → Look for red errors

// Check network requests
F12 → Network → Look for failed requests (red)

// Try hard refresh
Ctrl + Shift + R
```

---

#### Forms Don't Submit

**Error**: Click submit, form doesn't send

**Check**:
1. Validation errors: Check form validation in console
2. All required fields filled?
3. Network connection working?

**Solution**:
```javascript
// Check browser console for errors
F12 → Console

// Check network tab
F12 → Network → See if request was sent

// Try filling all fields correctly
```

---

### 6. Database Issues

#### Can't Create IPO

**Error**: "Database error" when creating IPO

**Solution**:
```bash
# Check database exists
dir ipo_db.sqlite3

# If not, migrate
python manage.py migrate

# If migration fails, reset
del ipo_db.sqlite3
python manage.py migrate
python manage.py createsuperuser admin
```

---

#### Data Loss

**Error**: Data disappeared

**Prevention** (for next time):
```bash
# Regular backups
copy ipo_db.sqlite3 ipo_db_backup.sqlite3

# Or use Django dump
python manage.py dumpdata > backup.json

# Restore if needed
python manage.py loaddata backup.json
```

---

## 🔌 API Reference

### Authentication Endpoints

#### Login (Get JWT Tokens)
```http
POST /api/token/
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123"
}

Response 200:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Refresh Token
```http
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response 200:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Sign Up
```http
POST /api/v1/register/
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "New User"
}

Response 201:
{
  "id": 2,
  "username": "newuser",
  "email": "user@example.com"
}
```

---

### IPO Endpoints

#### Get All IPOs (Public)
```http
GET /api/v1/ipos/

Response 200:
[
  {
    "id": 1,
    "company": {
      "id": 1,
      "company_name": "TechCorp Ltd",
      "company_logo": "url"
    },
    "status": "Upcoming",
    "open_date": "2025-01-01",
    "close_date": "2025-01-05",
    "ipo_price": 100.00,
    "listing_price": 120.00,
    "current_market_price": 125.00
  }
]
```

#### Get Single IPO (Public)
```http
GET /api/v1/ipos/1/

Response 200:
{
  "id": 1,
  "company": {...},
  "status": "Upcoming",
  // ... full details
}
```

#### Create IPO (Admin Only)
```http
POST /api/v1/ipos/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "company": {
    "company_name": "NewCorp Ltd",
    "company_logo": "url"
  },
  "open_date": "2025-02-01",
  "close_date": "2025-02-05",
  "status": "Upcoming",
  "ipo_price": 150.00,
  "listing_price": 170.00,
  "issue_size": 5000000,
  "issue_type": "Book Built"
}

Response 201:
{
  "id": 2,
  "company": {...},
  "status": "Upcoming",
  // ... created IPO data
}
```

#### Update IPO (Admin Only)
```http
PUT /api/v1/ipos/1/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "status": "Ongoing",
  "current_market_price": 155.00
}

Response 200:
{
  "id": 1,
  "status": "Ongoing",
  "current_market_price": 155.00,
  // ... updated IPO
}
```

#### Delete IPO (Admin Only)
```http
DELETE /api/v1/ipos/1/
Authorization: Bearer {access_token}

Response 204: No Content
```

---

### Company Endpoints

#### Get All Companies (Public)
```http
GET /api/v1/companies/

Response 200:
[
  {
    "id": 1,
    "company_name": "TechCorp Ltd",
    "company_logo": "url"
  }
]
```

#### Create Company (Admin Only)
```http
POST /api/v1/companies/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "company_name": "NewCorp",
  "company_logo": "url"
}

Response 201:
{
  "id": 2,
  "company_name": "NewCorp",
  "company_logo": "url"
}
```

---

### Common API Errors

#### 400 Bad Request
```json
{
  "field_name": ["This field is required."]
}
```
**Solution**: Check all required fields are provided

#### 401 Unauthorized
```json
{
  "detail": "Invalid token"
}
```
**Solution**: Login again, token expired

#### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```
**Solution**: Not admin (is_staff=False), or need to login first

#### 404 Not Found
```json
{
  "detail": "Not found."
}
```
**Solution**: Check endpoint URL and ID

#### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```
**Solution**: Check backend logs

---

## 🧪 Testing with curl

### Test Signup
```bash
curl -X POST http://127.0.0.1:8000/api/v1/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123!",
    "name": "Test User"
  }'
```

### Test Login
```bash
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

### Test Get IPOs (Public)
```bash
curl http://127.0.0.1:8000/api/v1/ipos/
```

### Test Create IPO (Admin)
```bash
curl -X POST http://127.0.0.1:8000/api/v1/ipos/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "company": {"company_name": "Test Corp"},
    "open_date": "2025-01-01",
    "close_date": "2025-01-05",
    "status": "Upcoming",
    "ipo_price": 100,
    "issue_size": 1000000
  }'
```

---

## 🔍 Debugging Tips

### Check Backend Logs
1. Look at terminal where `python manage.py runserver` is running
2. Every API call logged
3. Errors shown with full traceback

### Check Frontend Logs
1. Open F12 (Developer Tools)
2. Console tab for errors
3. Network tab for API calls

### Check Database
```bash
# Open Django shell
python manage.py shell

# Query users
>>> from django.contrib.auth.models import User
>>> User.objects.all()
<QuerySet [<User: admin>]>

# Query IPOs
>>> from ipo.models import IPO
>>> IPO.objects.all()
<QuerySet [<IPO: IPO object (1)>]>

# Exit shell
>>> exit()
```

---

## ✅ Health Check

Run this checklist to verify everything is working:

- [ ] Backend running: `http://127.0.0.1:8000` (page loads)
- [ ] Frontend running: `http://localhost:5173` (app loads)
- [ ] Can signup new account: Go to `/signup`
- [ ] Can login as admin: admin / Admin@123
- [ ] Can view IPOs: Go to `/ipo`
- [ ] Can add IPO: Go to `/registeripo` (admin only)
- [ ] All form text visible: Check LoginSubmit forms
- [ ] Password toggle works: Click eye on login page
- [ ] No browser console errors: F12 → Console (no red errors)
- [ ] No broken links: Try all navbar items

**If any fails**, refer to the relevant section above.

---

## 📞 Getting Help

### If Still Stuck:

1. **Check logs**:
   - Backend terminal
   - Browser console (F12)
   - Network tab (F12)

2. **Try basic fixes**:
   - Restart backend: `python manage.py runserver`
   - Restart frontend: `npm run dev`
   - Hard refresh: `Ctrl + Shift + R`
   - Clear cache: `Ctrl + Shift + Delete`

3. **Check documentation**:
   - [README.md](./README.md) - Overview
   - [QUICK_START.md](./QUICK_START.md) - Setup
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Design
   - [HOW_IT_WORKS.md](./HOW_IT_WORKS.md) - Features

4. **Verify basics**:
   - Is `.env` created? (copy from `.env.example`)
   - Is virtual environment activated? (`.\venv\Scripts\activate`)
   - Are dependencies installed? (`python -m python -m pip install -r requirement.txt`)
   - Is database migrated? (`python manage.py migrate`)

---

**Last Updated**: August 22, 2026
**Status**: All issues fixed and verified
