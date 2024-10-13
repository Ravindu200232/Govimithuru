import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaCommentDots, FaServicestack, FaProjectDiagram, FaUsers, FaNewspaper, FaEnvelope } from 'react-icons/fa'; 
import logo from './img/logo.png'; 

function Footer() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const options = [
    { text: 'Learn about our services', response: 'We offer a variety of agricultural services, including plant sales and consultations.' },
    { text: 'View our projects', response: 'We are currently working on several sustainable farming projects focused on community engagement.' },
    { text: 'Meet our farmers', response: 'We collaborate with local farmers to promote sustainable agriculture and enhance productivity.' },
    { text: 'Get the latest news', response: 'Stay tuned for our latest news on sustainable farming and community events.' },
    { text: 'Learn about sustainable practices', response: 'We promote crop rotation and cover crops to maintain soil health.' },
    { text: 'Ask a common question', response: 'What crops grow best in this region?' },
    { text: 'Get plant care tips', response: 'Ensure your plants receive at least 6 hours of sunlight daily.' },
    { text: 'Learn about pest management', response: 'Natural predators can help control pest populations.' },
    { text: 'Understand weather impacts', response: 'Extreme weather can affect crop yields significantly.' },
    { text: 'Explore community engagement', response: 'Join our workshops to learn more about sustainable farming.' },
    { text: 'Contact us on WhatsApp', response: 'You can reach us on WhatsApp for more information!', action: () => window.open('https://wa.me/your-number', '_blank') },
  ];

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      addMessage(userInput, 'user');
      const response = getResponse(userInput);
      addMessage(response, 'ai');
      setUserInput('');
    }
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello! How can I help you today?';
    } else if (lowerInput.includes('options')) {
      return 'Please select an option:';
    } else {
      return 'I am not sure how to help with that. Can you please specify or type "options" to see what I can help with?';
    }
  };

  const handleOptionSelect = (option) => {
    addMessage(option.text, 'user');
    addMessage(option.response, 'ai');
  };

  return (
    <>
      <footer style={styles.footerSection}>
        <div style={styles.footerLeft}>
          <img src={logo} alt="Govimithuru Logo" style={styles.logo} />
          <p style={styles.footerLeftP}>
            To offer our ultimate gratitude towards this amazing nature by providing the best agricultural plants and products in order to sustain a greener future.
          </p>
        </div>
        <div style={styles.footerLinks}>
          <ul style={styles.footerLinksUl}>
            <li style={styles.footerLinksLi}><FaServicestack /> Services</li>
            <li style={styles.footerLinksLi}><FaProjectDiagram /> Our Projects</li>
            <li style={styles.footerLinksLi}><FaUsers /> Meet the Farmers</li>
            <li style={styles.footerLinksLi}><FaNewspaper /> Latest News</li>
            <li style={styles.footerLinksLi}><FaEnvelope /> Contact</li>
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
          <p>Kahatagasdigiliya, Anuradhapura</p>
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
            <a href="https://wa.me/+94789840996" style={styles.iconLink} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Chat Bot Icon */}
        <div style={styles.chatBotIcon} onClick={handleChatToggle}>
          <FaCommentDots size={30} style={{ color: '#000' }} />
        </div>
      </footer>

      {/* Chat Window */}
      {showChat && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h4>Govimithuru Chat Bot</h4>
            <button onClick={handleChatToggle} style={styles.closeChat}>
              X
            </button>
          </div>
          <div style={styles.chatBody}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
                <span style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={styles.chatFooter}>
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={styles.chatInput}
            />
            <button onClick={handleSend} style={styles.sendButton}>Send</button>
          </div>
          {messages.length && messages[messages.length - 1].text === 'Please select an option:' && (
            <div style={styles.optionContainer}>
              {options.map((option, index) => (
                <button key={index} onClick={() => handleOptionSelect(option)} style={styles.optionButton}>
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
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
    display: 'flex',
    alignItems: 'center',
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
    color: '#000',
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
  chatBotIcon: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  chatWindow: {
    position: 'fixed',
    bottom: '80px',
    right: '30px',
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    padding: '10px',
    backgroundColor: '#25D366', // WhatsApp green color
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#fff',
  },
  chatBody: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
  },
  chatFooter: {
    padding: '10px',
    borderTop: '1px solid #ccc',
    display: 'flex',
  },
  chatInput: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '8px 12px',
    backgroundColor: '#25D366', // WhatsApp green color
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  closeChat: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  optionButton: {
    padding: '8px',
    margin: '4px 0',
    backgroundColor: '#B0EACD',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  userMessage: {
    backgroundColor: '#25D366',
    borderRadius: '8px',
    padding: '10px',
    display: 'inline-block',
    maxWidth: '75%',
  },
  aiMessage: {
    backgroundColor: '#25D366',
    borderRadius: '8px',
    padding: '10px',
    display: 'inline-block',
    maxWidth: '75%',
  },
};

export default Footer;
