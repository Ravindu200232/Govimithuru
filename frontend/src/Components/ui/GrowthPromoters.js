import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function GrowthPromoters() {
  const [promoterItems, setPromoterItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/growth-promoters')
      .then((res) => {
        setPromoterItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching growth promoters:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPromoters = promoterItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="growth-promoters-page">
      <section className="growth-promoters-section">
        <h1>Growth Promoters</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for growth promoters..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="promoters-info">
          <div className="info-left">
            <h3>GROWTH PROMOTERS</h3>
            <p>(Total products: {filteredPromoters.length})</p>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredPromoters.length > 0 ? (
                filteredPromoters.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img 
                      src={`data:image/jpeg;base64,${item.imageBase64}`} 
                      alt={item.name} 
                    />
                    <h4>{item.name}</h4>
                    <p>
                      Price: ${item.price.toFixed(2)}
                      {item.discount > 0 && (
                        <>
                          <span className="discount"> (${(item.price - (item.price * (item.discount / 100))).toFixed(2)})</span>
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
                <p>No growth promoter items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GrowthPromoters;
