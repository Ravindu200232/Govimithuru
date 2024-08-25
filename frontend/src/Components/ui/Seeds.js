import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function Seeds() {
  const [seedItems, setSeedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8090/showcase/seeds')
      .then((res) => {
        setSeedItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching seed items:', err);
      });
  }, []);

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="seeds-page">
      <section className="seeds-section">
        <h1>Seeds</h1>
        <div className="seeds-info">
          <div className="info-left">
            <h3>AGRICULTURAL SEEDS</h3>
            <p>(Total products: {seedItems.length})</p>
            {/* Categories, Manufacturers, Sizes */}
          </div>
          
          <div className="info-right">
            <div className="products-grid">
              {seedItems.length > 0 ? (
                seedItems.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img 
                      src={`data:image/jpeg;base64,${item.imageBase64}`} 
                      alt={item.name} 
                    />
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button 
                      className="buy-now-btn"
                      onClick={() => handleBuyNow(item._id)}
                    >
                      Buy Now
                    </button>
                  </div>
                ))
              ) : (
                <p>No seed items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Seeds;
