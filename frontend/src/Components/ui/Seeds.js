import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'; // Import icons
import './css/Seeds.css';

function Seeds() {
  const [seedItems, setSeedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter seeds based on the search query
  const filteredSeeds = seedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort seeds based on selected order
  const sortedSeeds = [...filteredSeeds].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; // Ascending order
    } else {
      return b.price - a.price; // Descending order
    }
  });

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
          <FaSearch className="search-icon" />
        </div>

        <div className="seeds-info">
          <div className="info-left">
            <h3>AGRICULTURAL SEEDS</h3>
            <p>(Total products: {sortedSeeds.length})</p>
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
              {sortedSeeds.length > 0 ? (
                sortedSeeds.map((item) => {
                  const [name, unit] = item.name.split(/(\(\d+kg\))/);
                  return (
                    <div className="product-card" key={item._id}>
                      <img 
                        src={`data:image/jpeg;base64,${item.imageBase64}`} 
                        alt={item.name} 
                      />
                      <h4>
                        {name}
                        <span className="item-unit">{unit}</span>
                      </h4>
                      
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
                  );
                })
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
