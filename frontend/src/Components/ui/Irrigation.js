import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function Irrigation() {
  const [irrigationItems, setIrrigationItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/irrigation')
      .then((res) => {
        setIrrigationItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching irrigation items:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredIrrigation = irrigationItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="irrigation-page">
      <section className="irrigation-section">
        <h1><center>Irrigation</center></h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for irrigation items..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="irrigation-info">
          <div className="info-left">
            <h3>IRRIGATION</h3>
            <p>(Total products: {filteredIrrigation.length})</p>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredIrrigation.length > 0 ? (
                filteredIrrigation.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img 
                      src={`data:image/jpeg;base64,${item.imageBase64}`} 
                      alt={item.name} 
                    />
                    <h4>{item.name}</h4>
                    <p>
                      Price: Rs{item.price.toFixed(2)}
                      {item.discount > 0 && (
                        <>
                          <span className="discount"> (Rs{(item.price - (item.price * (item.discount / 100))).toFixed(2)})</span>
                          <span className="discount-percentage"> {item.discount}% off</span>
                        </>
                      )}
                    </p>
                    <button 
                      className="buy-now-btn"
                      onClick={() => handleBuyNow(item._id)}
                    >
                      Buy Now
                    </button>
                  </div>
                ))
              ) : (
                <p>No irrigation items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Irrigation;
