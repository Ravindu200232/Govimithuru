import React from 'react';
import './css/Footer.css';
import logo from './img/logo.png'; // Import the logo image

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Organic Food Store Logo" className="footer-logo-img" />
        </div>
        <div className="footer-nav">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">TW</a>
            <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">IG</a>
          </div>
        </div>
      </div>
      <div className="footer-copy">
        <p>© 2024 Organic Food Store</p>
      </div>
    </footer>
  );
}

export default Footer;
