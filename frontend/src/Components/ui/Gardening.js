import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function Gardening() {
  const [gardeningItems, setGardeningItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/gardening')
      .then((res) => {
        setGardeningItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching gardening items:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGardening = gardeningItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="gardening-page">
      <section className="gardening-section">
        <h1>Gardening</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for gardening items..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="gardening-info">
          <div className="info-left">
            <h3>GARDENING</h3>
            <p>(Total products: {filteredGardening.length})</p>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredGardening.length > 0 ? (
                filteredGardening.map((item) => (
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
                <p>No gardening items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gardening;
