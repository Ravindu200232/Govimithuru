import React from 'react';
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        
        <li><a href="/login">About</a></li>
        <li><a href="/login">Contact</a></li>
        <li><a href="/login">Other</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
