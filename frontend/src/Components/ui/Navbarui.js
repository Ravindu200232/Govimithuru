import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Get username from localStorage

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data
    localStorage.removeItem('username'); // Remove username on logout
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
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li>
          {username && (
            <b><a onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
              {username}
            </a></b>
          )}
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
