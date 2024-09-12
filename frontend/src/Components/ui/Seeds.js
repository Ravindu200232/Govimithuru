import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Seeds.css';

function Seeds() {
  const [seedItems, setSeedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/seeds')
      .then((res) => {
        setSeedItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching seed items:', err);
      });
  }, []);

  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter seeds based on the search query
  const filteredSeeds = seedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="seeds-page">
      <section className="seeds-section">
        <h1>Seeds</h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for seeds..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="seeds-info">
          <div className="info-left">
            <h3>AGRICULTURAL SEEDS</h3>
            <p>(Total products: {filteredSeeds.length})</p>
            {/* Categories, Manufacturers, Sizes */}
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredSeeds.length > 0 ? (
                filteredSeeds.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img 
                      src={`data:image/jpeg;base64,${item.imageBase64}`} 
                      alt={item.name} 
                    />
                    <h4>{item.name}</h4>
                    
                    {/* Display Price and Discount */}
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
