import React, { useState ,useContext} from "react";
import { motion } from "framer-motion";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    console.log('Logged out');
    navigate('/login')
  }


  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="navbar-left">
        <img
          src="https://th.bing.com/th/id/OIP.fzMBMaB-5q2MLmGM_MCZUQHaHa?w=150&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt="Logo"
          className="logo"
        />
        <a className="brand" href="/">

          <span className="brand">BLUESTOCK</span>
        </a>
      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><a href="/ipo">IPO</a></li>
        <li><a href="/community">Community</a></li>

        <li className="dropdown product">
          <a className="product" href="/product" onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }}>
            Products ▼
          </a>
          {dropdownOpen && (
            <motion.ul
              className="dropdown-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/product">Product</a></li>

              <li><a href="/analysis">Analysis</a></li>
            </motion.ul>
          )}
        </li>

        <li><a href="/Broker">Brokers</a></li>
      </ul>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className='btn' onClick={handleLogout} style={{backgroundColor:'red', color:'white'}}>Logout</button>
        ) : (
          <>
            <a href="/login" className="signin">Sign In</a>
            <motion.button
              className="signup-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a className="signup-btn1" href="/signup">Sign Up Now</a>
            </motion.button>
          </>
        )}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
      </div>

    </motion.nav >
  );
};

export default Navbar;
