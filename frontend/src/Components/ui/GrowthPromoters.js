import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'; // Import icons
import './css/Seeds.css'; 

function GrowthPromoters() {
  const [promoterItems, setPromoterItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/Growthpromoters')
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

  // Sort promoters based on selected order
  const sortedPromoters = [...filteredPromoters].sort((a, b) => {
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
    <div className="growth-promoters-page">
      <section className="growth-promoters-section">
        <h1><center>Growth Promoters</center></h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for growth promoters..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="promoters-info">
          <div className="info-left">
            <h3>GROWTH PROMOTERS</h3>
            <p>(Total products: {sortedPromoters.length})</p>
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
              {sortedPromoters.length > 0 ? (
                sortedPromoters.map((item) => (
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
