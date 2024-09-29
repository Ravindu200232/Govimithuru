import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import logo from './img/logo.png';
import img2 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_83da0e81.jpg"; // Imported profile image

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Get username from localStorage

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data
    localStorage.removeItem('username'); // Remove username on logout
    navigate('/login'); // Redirect to login page
  };

  const imageStyle = {
    width: '30px',   // Adjusted width
    height: '30px',  // Adjusted height
    borderRadius: '50%', // Circular border
    marginLeft: '8px',
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink></li>
        <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : '')}>Products</NavLink></li>
        <li><NavLink to="/cart" className={({ isActive }) => (isActive ? 'active-link' : '')}>Cart</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact</NavLink></li>
        <li>
          {username && (
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : '')} style={{ cursor: 'pointer' }}>
              {username}
             
            </NavLink>
          )}
        </li>
        <li>
        <img src={img2} alt="Profile" style={imageStyle} /> {/* Profile image */}
        </li>
        <li>
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
