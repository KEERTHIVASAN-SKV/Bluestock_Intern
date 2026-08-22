# How It Works - Feature Workflows & Operations

## User Authentication & Authorization

### User Registration (Signup)

**Step-by-Step Process**:

1. **User Accesses Signup Page**
   - Navigate to: `http://localhost:5173/signup`
   - Form appears with fields: Name, Username, Email, Password

2. **User Fills Form**
   ```
   Name: "John Doe"
   Username: "johndoe"
   Email: "john@example.com"
   Password: "SecurePass123!"
   ```

3. **Frontend Validates Form**
   - ✅ All fields filled?
   - ✅ Email format valid?
   - ✅ Password strong enough?
   - ✅ I'm not a robot checked?

4. **Frontend Sends Request**
   ```json
   POST http://127.0.0.1:8000/api/v1/register/
   {
     "name": "John Doe",
     "username": "johndoe",
     "email": "john@example.com",
     "password": "SecurePass123!"
   }
   ```

5. **Backend Processes Registration**
   - Check if username already exists
   - Check if email already exists
   - Hash password using PBKDF2
   - Create User record in database
   - Set `is_staff=False` (regular user)

6. **Backend Returns Response**
   ```json
   {
     "id": 2,
     "username": "johndoe",
     "email": "john@example.com"
   }
   ```

7. **Frontend Shows Success Message**
   - "Signup successful! Please log in."
   - Form clears
   - User redirected to login

8. **User Can Now Login**
   - Go to login page
   - Use: johndoe / SecurePass123!
   - Success → Dashboard

---

### User Login (JWT Authentication)

**Step-by-Step Process**:

1. **User Accesses Login Page**
   - Navigate to: `http://localhost:5173/login`
   - Form with: Username, Password, Forgot Password link

2. **User Enters Credentials**
   ```
   Username: "admin"
   Password: "Admin@123"
   ```

3. **Frontend Sends Login Request**
   ```json
   POST http://127.0.0.1:8000/api/token/
   {
     "username": "admin",
     "password": "Admin@123"
   }
   ```

4. **Backend Authenticates**
   - Find user by username
   - Verify password hash matches
   - Check user is_active = True
   - Generate JWT tokens:
     - `access_token` (5 min expiry)
     - `refresh_token` (24 hrs expiry)

5. **Backend Returns Tokens**
   ```json
   {
     "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
     "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
   }
   ```

6. **Frontend Stores Tokens**
   ```javascript
   localStorage.setItem('accessToken', response.data.access);
   localStorage.setItem('refreshToken', response.data.refresh);
   setIsLoggedIn(true);
   ```

7. **Frontend Redirects to Dashboard**
   - Navigate to `/dashboard`
   - User now logged in

8. **All Future Requests Include Token**
   ```javascript
   headers: {
     "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
   }
   ```

---

### Token Refresh

When access token expires (5 minutes):

```
1. API returns 401 Unauthorized
2. Frontend detects 401
3. Frontend sends refresh request:
   POST /api/token/refresh/ with refreshToken
4. Backend validates refreshToken
5. Backend generates new accessToken
6. Frontend stores new accessToken
7. Frontend retries original request
```

---

### Logout

```
1. User clicks "Logout" button
2. Frontend removes tokens from localStorage
3. Frontend sets isLoggedIn = False
4. Frontend redirects to login page
5. Backend doesn't need to do anything (stateless)
```

---

## IPO Management - Admin Operations

### Create IPO (Admin Only)

**Who Can Do This**: Users with `is_staff=True` (admin)

**Access Path**:
1. Admin logs in: `admin` / `Admin@123`
2. Navigate to: `/registeripo`
3. Form appears to enter IPO details

**Form Fields**:
```
Company Name:          "TechCorp Ltd"
Open Date:             "01-01-2025"
Close Date:            "05-01-2025"
Issue Size:            "1000000"
Issue Type:            "Book Built"
Listing Date:          "08-01-2025"
Status:                "Upcoming"
IPO Price:             "100.00"
Listing Price:         "120.00"
Listing Gain:          "20.00"
CMP:                   "125.00"
Current Return:        "25.00"
Company Logo:          [Upload file]
```

**Step-by-Step Process**:

1. **Admin Fills Form**
   - All required fields entered
   - Optional fields can be empty

2. **Frontend Validates**
   - ✅ Required fields present?
   - ✅ Numeric fields are numbers?
   - ✅ Dates are valid format?

3. **Frontend Sends Request**
   ```json
   POST http://127.0.0.1:8000/api/v1/ipos/
   Authorization: Bearer {access_token}
   
   {
     "company": {
       "company_name": "TechCorp Ltd",
       "company_logo": "url_or_base64"
     },
     "open_date": "2025-01-01",
     "close_date": "2025-01-05",
     "issue_size": "1000000",
     "issue_type": "Book Built",
     "listing_date": "2025-01-08",
     "status": "Upcoming",
     "ipo_price": 100.00,
     "listing_price": 120.00,
     "listing_gain": 20.00,
     "current_market_price": 125.00,
     "current_return": 25.00
   }
   ```

4. **Backend Permission Check**
   - Extract JWT token from header
   - Validate token signature (using SECRET_KEY)
   - Decode token to get user
   - Check `user.is_staff = True`
   - ✅ If valid → proceed
   - ❌ If invalid → return 403 Forbidden

5. **Backend Validation**
   - Validate all required fields
   - Check data types
   - Sanitize inputs

6. **Backend Database Operations**
   - Check if Company exists (by name)
   - If exists: Use existing Company
   - If not: Create new Company record
   - Create IPO record linked to Company
   - Save to database

7. **Backend Returns Response**
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
     "status": "Upcoming",
     "ipo_price": 100.00,
     "listing_price": 120.00,
     "created_at": "2025-08-22T10:30:00Z"
   }
   ```

8. **Frontend Success Handling**
   - Shows alert: "IPO created successfully!"
   - Form clears
   - IPO appears in list below form
   - Updates local state: `setIpos([...ipos, response.data])`

---

### Edit IPO (Admin Only)

**Process**:

1. **Admin Views IPO List**
   - Goes to `/registeripo`
   - Sees list of all IPOs with Edit/Delete buttons

2. **Admin Clicks Edit Button**
   - Click "Edit" on specific IPO
   - Form populates with IPO data
   - Admin can modify any field

3. **Admin Submits Changes**
   - Frontend sends PUT request:
   ```json
   PUT http://127.0.0.1:8000/api/v1/ipos/1/
   Authorization: Bearer {access_token}
   
   {
     // Modified fields
     "status": "Ongoing",
     "current_market_price": 130.00,
     "current_return": 30.00
   }
   ```

4. **Backend Validation & Update**
   - Verify user is admin (is_staff=True)
   - Validate new data
   - Update IPO record
   - Save changes

5. **Frontend Success**
   - Shows: "IPO updated successfully!"
   - List refreshes with new values

---

### Delete IPO (Admin Only)

**Process**:

1. **Admin Clicks Delete Button**
   - On IPO in list
   - Confirmation dialog appears

2. **Admin Confirms**
   - Clicks "OK" in confirmation

3. **Frontend Sends Request**
   ```json
   DELETE http://127.0.0.1:8000/api/v1/ipos/1/
   Authorization: Bearer {access_token}
   ```

4. **Backend Validation**
   - Verify user is admin
   - Check IPO exists
   - Delete IPO record
   - (Cascades delete: documents, applications)

5. **Frontend Success**
   - Shows: "IPO deleted successfully"
   - IPO removed from list
   - Refreshes list

---

## IPO Viewing - Public Features

### View IPO List (Public)

**Who Can Access**: Anyone (no login required)

**Process**:

1. **User Visits IPO Page**
   - Navigate to: `/ipo`
   - No auth required

2. **Frontend Sends Request**
   ```json
   GET http://127.0.0.1:8000/api/v1/ipos/
   (NO Authorization header needed)
   ```

3. **Backend Returns Data**
   - Permission check: GET request allowed for everyone
   - Returns all IPOs:
   ```json
   [
     {
       "id": 1,
       "company": { "company_name": "TechCorp Ltd" },
       "status": "Upcoming",
       "ipo_price": 100,
       "listing_price": 120
     },
     {
       "id": 2,
       "company": { "company_name": "RetailCo Inc" },
       "status": "Completed",
       "ipo_price": 150,
       "listing_price": 160
     }
   ]
   ```

4. **Frontend Displays List**
   - Shows all IPOs in table/grid
   - Each IPO shows: Company, Price, Status, Dates
   - User can click for details

### View IPO Details (Public)

1. **User Clicks on IPO**
   - From list: `/ipo`
   - Navigates to detail page: `/ipo/1`

2. **Frontend Sends Detail Request**
   ```json
   GET http://127.0.0.1:8000/api/v1/ipos/1/
   ```

3. **Backend Returns Full Details**
   - All fields for that IPO
   - Associated company info
   - Documents list
   - Application count

4. **Frontend Shows Details**
   - Company name, logo, status
   - Timeline: Open, Close, Listing dates
   - Pricing: IPO price, Listing price, Current price
   - Returns: Listing gain, Current return
   - Related documents (if any)

---

## Text Input & Form Handling

### Form Field Visibility

**Issue Fixed**: Text was invisible (white on white)

**Solution Applied**:
- Added `color: black;` to all form inputs
- Added `color: black;` to all labels
- Added `color: black;` to all headings

**Result**: All form text now readable

**Affected Components**:
- Login page inputs
- Signup form
- RegisterIPO form
- Forgot password form

**How It Works Now**:
1. User types in input field
2. Text appears in black color
3. Label shows company information
4. Dropdown options visible
5. All text readable

---

## Password Visibility Toggle

**Feature**: Eye icon to show/hide password

**How It Works**:

1. **User Types Password**
   - Password field shows dots: ••••••••

2. **User Clicks Eye Icon**
   - Icon location: Right side of password field
   - Field type changes: "password" → "text"

3. **Password Becomes Visible**
   - Shows actual characters: MyPassword123

4. **User Clicks Eye Icon Again**
   - Field type changes: "text" → "password"
   - Password becomes dots again

**Technical Implementation**:
```javascript
// State to track visibility
const [showPassword, setShowPassword] = useState(false);

// Input type toggles
<input type={showPassword ? "text" : "password"} />

// Eye icon onClick
<EyeIcon onClick={() => setShowPassword(!showPassword)} />
```

---

## Navigation & Dead Link Removal

### What Was Fixed

**Issue**: "Live News" link appeared in navbar but didn't work

**Solution**: Completely removed the link

**Result**: 
- Navbar now clean
- No broken links
- All other nav items work correctly

**Navigation Structure**:
```
Home
├── IPO
├── Community
├── Products
│   ├── Dashboard
│   ├── Product
│   └── Analysis
└── Brokers
```

---

## Error Handling & Recovery

### What Happens If Something Goes Wrong

**Signup Fails**:
- ❌ Network error → Shows: "Network error, please try again"
- ❌ Duplicate username → Shows: "Username already exists"
- ❌ Validation error → Shows specific validation message
- ✅ User can retry or try different credentials

**Admin IPO Creation Fails**:
- ❌ Not admin → Shows: "Unauthorized to create IPO"
- ❌ Invalid token → User redirected to login
- ❌ Network error → Shows error alert
- ✅ User can verify admin status or retry

**Form Submission Errors**:
- Shows alert with error message
- Form data is NOT cleared (user can retry)
- Focus moves to problematic field

---

## Permission System in Action

### How Permissions Work

**For GET Requests (Reading Data)**:
```
User (any) → GET /api/v1/ipos/ 
→ Backend: "Is it a GET request?" → Yes
→ Allow access (no auth check)
→ Return data
```

**For POST Request (Creating IPO)**:
```
User (any) → POST /api/v1/ipos/ 
→ Backend: "Is it a POST request?" → Yes
→ Backend: "Is user authenticated?" → Check JWT
→ Backend: "Is user admin (is_staff=True)?" → Check flag
→ If both yes → Allow, create IPO
→ If any no → Deny, return 403 Forbidden
```

**For DELETE Request (Deleting IPO)**:
```
User (any) → DELETE /api/v1/ipos/1/
→ Same checks as POST
→ If valid → Delete IPO
→ If invalid → Deny access
```

---

## Data Security in Action

### How Password Security Works

1. **Registration**
   - User enters password: "MyPass123!"
   - Django hashes using PBKDF2: "pbkdf2_sha256$...long string..."
   - Only hash stored in database
   - Original password never saved

2. **Login**
   - User enters password: "MyPass123!"
   - Django hashes the input
   - Compares hash with stored hash
   - If match → Login success
   - If not → Login failed

3. **Database**
   - Even if database stolen
   - Passwords are hashes (not reversible)
   - Attacker can't recover actual passwords

---

## Session Management

### How Sessions Work

1. **User Logs In**
   - Receives access_token (5 min)
   - Receives refresh_token (24 hrs)

2. **User Browses**
   - Access token included in each request
   - Backend validates token on each request
   - User can perform actions for 5 minutes

3. **Access Token Expires** (after 5 min)
   - API returns 401 Unauthorized
   - Frontend automatically uses refresh_token
   - Gets new access_token
   - Retries original request

4. **Refresh Token Expires** (after 24 hrs)
   - User must login again
   - Automatic login NOT possible
   - Refreshed tokens prevent session hijacking

---

## Common Workflows

### Workflow 1: New User Journey
```
1. Visit home page (/index)
2. Click "Sign Up Now"
3. Create account (signup)
4. Click "Login"
5. Login with credentials
6. See dashboard
7. Browse IPO list
8. View IPO details
9. Logout
```

### Workflow 2: Admin IPO Management
```
1. Login as admin (admin/Admin@123)
2. Navigate to /registeripo
3. Add new IPO (form visible)
4. See IPO in list
5. Click Edit to modify
6. Click Delete to remove
7. Repeat or logout
```

### Workflow 3: Regular User
```
1. Login (optional) or browse as guest
2. Go to /ipo to see IPO list
3. Click on IPO for details
4. View blog posts at /blog
5. Compare brokers at /broker
6. View analysis at /analysis
```

---

## Data Flow Summary

```
User Action → Frontend Handler → API Request → Backend Process → Database → Response → Frontend Update → User Sees Result
```

**Example**:
```
Click "Register IPO" → Form validation → POST /api/v1/ipos/ → Backend creates IPO + Company → Saves to DB → Returns JSON → setIpos(updated) → IPO appears in list → User sees success
```

---

## Troubleshooting Common Issues

### Issue: "Cannot add IPO" 
- ✅ Solution: Verify logged in as admin
- ✅ Check: localStorage has accessToken
- ✅ Try: Refresh page and login again

### Issue: Text invisible in forms
- ✅ Solution: Hard refresh (Ctrl+Shift+R)
- ✅ Check: Browser zoom is 100%
- ✅ Try: Clear browser cache

### Issue: Login fails
- ✅ Solution: Check credentials (admin/Admin@123)
- ✅ Check: Backend is running
- ✅ Try: Signup new account instead

### Issue: Signup fails
- ✅ Solution: Check all fields filled
- ✅ Check: Username not already used
- ✅ Try: Use different username

---

## Performance Considerations

### Caching
- Company list cached (rarely changes)
- IPO list cached for 5 minutes
- User data cached until logout

### Data Loading
- IPO list loads incrementally
- Large lists paginated
- Images lazy-loaded

### Optimization
- Frontend minified in production
- API responses compressed
- Database indexes on key fields

---

For more details, see:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [DATABASE.md](./DATABASE.md) - Data structure
- [README.md](./README.md) - Overview
