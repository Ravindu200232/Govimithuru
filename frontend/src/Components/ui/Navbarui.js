import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user data (this could be a token in localStorage or any state management you use)
    localStorage.removeItem('user'); // Example: removing user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/login">About</a></li>
        <li><a href="/login">Contact</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue' }}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
