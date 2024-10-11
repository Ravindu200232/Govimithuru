import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'; // Importing icons
import './css/Seeds.css'; // Using the same CSS file for consistency

function Fertilizers() {
  const [fertilizerItems, setFertilizerItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting
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

  // Sort items based on selected order
  const sortedFertilizers = [...filteredFertilizers].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="fertilizers-page">
      <section className="fertilizers-section">
        <h1><center>Fertilizers</center></h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for fertilizers..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="fertilizers-info">
          <div className="info-left">
            <h3>FERTILIZERS</h3>
            <p>(Total products: {sortedFertilizers.length})</p>
            {/* Sorting Options */}
            <div className="sorting-options">
              <button 
                onClick={() => setSortOrder('asc')}
                className={sortOrder === 'asc' ? 'active' : ''}
              >
                <FaSortAmountUp /> Ascending
              </button>
              <button 
                onClick={() => setSortOrder('desc')}
                className={sortOrder === 'desc' ? 'active' : ''}
              >
                <FaSortAmountDown /> Descending
              </button>
            </div>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {sortedFertilizers.length > 0 ? (
                sortedFertilizers.map((item) => (
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
