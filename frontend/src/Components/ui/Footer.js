import React from 'react';
import logo from './img/logo.png'; // Import the logo image

function Footer() {
  return (
    <footer style={styles.footerSection}>
      <div style={styles.footerLeft}>
        <img src={logo} alt="Govimithuru Logo" style={styles.logo} />
        <p style={styles.footerLeftP}>There are many variations of passages of lorem ipsum available, but the majority suffered alteration.</p>
      </div>
      <div style={styles.footerLinks}>
        <ul style={styles.footerLinksUl}>
          <li style={styles.footerLinksLi}>Services</li>
          <li style={styles.footerLinksLi}>Our Projects</li>
          <li style={styles.footerLinksLi}>Meet the Farmers</li>
          <li style={styles.footerLinksLi}>Latest News</li>
          <li style={styles.footerLinksLi}>Contact</li>
        </ul>
      </div>
      <div style={styles.footerNews}>
        <h3 style={styles.h3}>News</h3>
        <p>Bringing Food Production Back to Cities</p>
        <p>July 5, 2023</p>
      </div>
      <div style={styles.footerContact}>
        <h3 style={styles.h3}>Contact</h3>
        <p>+666 888 0000</p>
        <p>info@agriculturecompany.com</p>
        <p>120 Gotham Golden Street, New York, USA</p>
        <input type="email" placeholder="Your Email Address" style={styles.inputEmail} />
      </div>
    </footer>
  );
}

const styles = {
  footerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
    backgroundColor: '#fafafa',
  },
  footerLeft: {
    flex: 1,
    padding: '10px',
  },
  logo: {
    borderRadius: '50%',
    width: '150px',
    marginBottom: '10px',
  },
  footerLeftP: {
    maxWidth: '300px',
    lineHeight: '1.6',
    fontSize: '14px',
  },
  footerLinks: {
    flex: 1,
    padding: '10px',
  },
  footerLinksUl: {
    listStyle: 'none',
    padding: '0',
  },
  footerLinksLi: {
    marginBottom: '8px',
  },
  footerNews: {
    flex: 1,
    padding: '10px',
  },
  footerContact: {
    flex: 1,
    padding: '10px',
  },
  h3: {
    marginBottom: '15px',
    fontSize: '18px',
  },
  inputEmail: {
    padding: '8px',
    marginTop: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

export default Footer;
