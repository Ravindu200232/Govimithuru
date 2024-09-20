import React from 'react';
import './css/Footer.css';
import logo from './img/logo.png'; // Import the logo image

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-left">
        <img src={logo} alt="Govimithuru Logo" className="logo" />
        <p>There are many variations of passages of lorem ipsum available, but the majority suffered alteration.</p>
      </div>
      <div className="footer-links">
        <ul>
          <li>Services</li>
          <li>Our Projects</li>
          <li>Meet the Farmers</li>
          <li>Latest News</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="footer-news">
        <h3>News</h3>
        <p>Bringing Food Production Back to Cities</p>
        <p>July 5, 2023</p>
      </div>
      <div className="footer-contact">
        <h3>Contact</h3>
        <p>+666 888 0000</p>
        <p>info@agriculturecompany.com</p>
        <p>120 Gotham Golden Street, New York, USA</p>
        <input type="email" placeholder="Your Email Address" />
      </div>
    </footer>
  );
}

export default Footer;
