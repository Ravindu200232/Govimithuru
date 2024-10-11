import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'; // Importing icons
import './css/Seeds.css'; // Using the same CSS file for consistency

function Equipments() {
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/equipments')
      .then((res) => {
        setEquipmentItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching equipment items:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEquipment = equipmentItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort items based on selected order
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="equipments-page">
      <section className="equipments-section">
        <h1><center>Equipments</center></h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for equipments..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="equipment-info">
          <div className="info-left">
            <h3>EQUIPMENTS</h3>
            <p>(Total products: {sortedEquipment.length})</p>
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
              {sortedEquipment.length > 0 ? (
                sortedEquipment.map((item) => (
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
                <p>No equipment items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Equipments;
