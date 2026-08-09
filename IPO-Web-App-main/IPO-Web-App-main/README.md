# 📈 Bluestock IPO Portal

An internship project for **Bluestock**, this real-time IPO tracking and management platform enables users to view **Upcoming**, **Ongoing**, and **Listed IPOs**, while allowing admins to manage IPO data through a secure dashboard.

> 🚀 Built with Django, React, PostgreSQL, and real-time data from NSE using `nselib`.

---

## 🎯 Purpose

This project was developed as part of a professional internship at **Bluestock**. Its aim is to provide a responsive and data-driven web application to help users and admins track and manage IPO data in real-time.

---

## 🔍 Features

- **📅 Categorized IPO Listings**  
  Displays IPOs in three categories: *Upcoming*, *Ongoing*, and *Listed*.

- **🔐 JWT-Based Authentication**  
  Secure login and session handling using JSON Web Tokens.

- **🛠 Admin Panel**  
  Admins can add, update, and delete IPOs through authenticated APIs.

- **👤 User Personalization**  
  Logged-in users can add IPOs to their personal watchlist/account.

- **📡 Real-Time NSE Data**  
  Uses the `nselib` Python package to fetch live IPO/stock data from NSE.

- **📊 Clean REST API Design**  
  Built using Django REST Framework for structured data access and manipulation.

---

## ⚙️ Tech Stack

| Layer       | Technologies                                 |
|-------------|---------------------------------------------|
| **Frontend**| React, Tailwind CSS, CSS                      |
| **Backend** | Django, Django REST Framework, JWT Auth      |
| **Database**| PostgreSQL                                   |
| **APIs**    | `nselib`, Custom REST APIs                    |
| **Other**   | NumPy, Pandas, Axios, React Router            |

---

## 🧩 Functional Modules

### 👥 User Module
- Sign up / Login with JWT
- Browse categorized IPO listings
- Add IPOs to personal tracker

### 🔧 Admin Module
- Secure admin-only login
- Add/edit/delete IPO data
- Dashboard for IPO management

### 📃 IPO Listing
- Includes IPO name, price band, dates, subscription details
- Live IPO data pulled using `nselib`

---

## 🧪 API Endpoints (Sample)

| Method | Endpoint                   | Description                   |
|--------|----------------------------|-------------------------------|
| POST   | `/api/v1/users/login/`     | User/Admin login (JWT token)  |
| GET    | `/api/v1/ipos/`            | Get all IPOs                  |
| GET    | `/api/v1/companies/`       | Get all Companies             |
| GET    | `/api/v1/documents/`       | Get all Documents             |
| GET    | `/api/v1/users/`           | Get all Users                 |










