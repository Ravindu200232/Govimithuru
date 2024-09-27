import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Import social media icons
import logo from './img/logo.png'; // Import the logo image

function Footer() {
  return (
    <footer style={styles.footerSection}>
      <div style={styles.footerLeft}>
        <img src={logo} alt="Govimithuru Logo" style={styles.logo} />
        <p style={styles.footerLeftP}>
        To offer our ultimate gratitude towards this amazing nature by providing the best agricultural plants and products in order sustain a greener future.
        </p>
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
        <p>September 5, 2024</p>
      </div>
      <div style={styles.footerContact}>
        <h3 style={styles.h3}>Contact</h3>
        <p>+789840996</p>
        <p>info@Govimithuru.com</p>
        <p>Kahatagasdigiliya,Anuradhaoura</p>
        <input type="email" placeholder="Your Email Address" style={styles.inputEmail} />
      </div>
      <div style={styles.footerSocial}>
        <h3 style={styles.h3}>Follow Us</h3>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" style={styles.iconLink}>
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" style={styles.iconLink}>
            <FaInstagram size={24} />
          </a>
          <a href="https://whatsapp.com" style={styles.iconLink}>
            <FaWhatsapp size={24} />
          </a>
        </div>
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
    backgroundColor: '#B0EACD',
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
  footerSocial: {
    flex: 1,
    padding: '10px',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  iconLink: {
    color: '#000', // Change to desired color
    textDecoration: 'none',
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
