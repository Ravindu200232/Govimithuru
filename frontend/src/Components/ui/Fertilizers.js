import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function Fertilizers() {
  const [fertilizerItems, setFertilizerItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/fertilizers')
      .then((res) => {
        setFertilizerItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching fertilizer items:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFertilizers = fertilizerItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="fertilizers-page">
      <section className="fertilizers-section">
        <h1>Fertilizers</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for fertilizers..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="fertilizers-info">
          <div className="info-left">
            <h3>FERTILIZERS</h3>
            <p>(Total products: {filteredFertilizers.length})</p>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredFertilizers.length > 0 ? (
                filteredFertilizers.map((item) => (
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
                <p>No fertilizer items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Fertilizers;
