import React from 'react';
import './css/contsssssssssact.css'; // Adjust the path as necessary
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="header-banner">
        <h1 style={{ color: 'white' }}>Contact</h1>
      </div>
      
      <div className="content-section">
        <div className="info-box about-box">
          <h2>About</h2>
          <p>
            <b>
              At Govi Mothiru Agriculture Shop, we are dedicated to providing the best products and services for all your agricultural needs. 
              Whether you're a seasoned farmer or just starting out, our knowledgeable team is here to assist you with expert advice and high-quality supplies.
              For inquiries, product information, or assistance, feel free to reach out to us using the contact details below. 
              We value your feedback and are committed to helping you grow your agricultural endeavors.
            </b>
          </p>
        </div>

        <div className="info-box contact-box">
          <h2>Contact</h2>
          <p>
            <i className="fas fa-phone-alt"></i> <b>Phone:</b> +94789840996
          </p>
          <p>
            <i className="fas fa-envelope"></i> <b>Email:</b> info@govimothiru.com
          </p>
          <p>
            <b>Working Hours</b><br />
            Monday - Friday: 9:00 AM - 6:00 PM<br />
            Saturday: 10:00 AM - 4:00 PM<br />
            Sunday: Closed
          </p>
        </div>

        <div className="info-box address-box">
          <h2>Address</h2>
          <p>
            <i className="fas fa-map-marker-alt"></i> <b>Kahatagasdigiliya, Anuradhapura</b>
          </p>
        </div>
      </div>

      <div className="map-section">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1563406.706583331!2d81.80043790531797!3d8.357991192862717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae17a8edb80f641%3A0x3e4b4f2a7f97e6d!2sKahatagasdigiliya%2C%20Sri%20Lanka!5e0!3m2!1sen!2sau!4v1602141019053!5m2!1sen!2sau"
      title="Location"
      width="800" // Increased width
      height="600" // Increased height
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
