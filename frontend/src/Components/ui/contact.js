import React from 'react';
import './css/contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="header-banner">
      <h1 style={{ color: 'white' }}>Contact</h1>

      </div>
      
      <div className="content-section">
        <div className="info-box about-box">
          <h2>About</h2>
          <p><b>At Govi Mothiru Agriculture Shop, we are dedicated to providing the best products and services for all your agricultural needs. Whether you're a seasoned farmer or just starting out, our knowledgeable team is here to assist you with expert advice and high-quality supplies.

For inquiries, product information, or assistance, feel free to reach out to us using the contact details below. We value your feedback and are committed to helping you grow your agricultural endeavors.</b></p>
        </div>

        <div className="info-box contact-box">
          <h2>Contact</h2>
          <p><b>Phone:</b> +123-456-7890</p>
          <p><b>Email:</b> info@govimothiru.com</p>
          <p>Working Hours<br></br>
Monday - Friday: 9:00 AM - 6:00 PM<br></br>
Saturday: 10:00 AM - 4:00 PM<br></br>
Sunday: Closed</p>
          
        </div>

        <div className="info-box address-box">
          <h2>Address</h2>
          <p><b>123 Green Valley Road, Agriville, Country</b> </p>
        </div>
      </div>

      

      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.95373531550455!3d-37.81720997975153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772c2a7a41d0a!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1602141019053!5m2!1sen!2sau"
          title="Location"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>

      
    </div>
  );
};

export default Contact;
