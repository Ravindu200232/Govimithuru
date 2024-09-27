import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function OrganicFarming() {
  const [farmingItems, setFarmingItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/organic-farming')
      .then((res) => {
        setFarmingItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching organic farming items:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFarming = farmingItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="organic-farming-page">
      <section className="organic-farming-section">
        <h1>Organic Farming</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for organic farming items..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="farming-info">
          <div className="info-left">
            <h3>ORGANIC FARMING</h3>
            <p>(Total products: {filteredFarming.length})</p>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredFarming.length > 0 ? (
                filteredFarming.map((item) => (
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
                <p>No organic farming items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrganicFarming;
