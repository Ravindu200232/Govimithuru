import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/OrganicFarming.css';

function OrganicFarming() {
  const [organicFarmingItems, setOrganicFarmingItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/showcase/organic-farming')
      .then((res) => {
        setOrganicFarmingItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching organic farming items:', err);
      });
  }, []);

  return (
    <div className="organic-farming-page">
      <section className="organic-farming-section">
        <h1>Organic Farming</h1>
        <div className="organic-farming-info">
          <div className="info-left">
            <h3>ORGANIC FARMING PRODUCTS</h3>
            <p>(Total products: {organicFarmingItems.length})</p>
            <h4>Category</h4>
            <ul>
              {/* List categories if needed */}
            </ul>
            
            <h4>Company / Manufacturer</h4>
            <ul>
              {/* List manufacturers if needed */}
            </ul>
            
            <h4>Size / Volume</h4>
            <ul>
              {/* List sizes if needed */}
            </ul>

            <button className="read-more-btn">Read more</button>
          </div>
          
          <div className="info-right">
            <div className="products-grid">
              {organicFarmingItems.length > 0 ? (
                organicFarmingItems.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img 
                      src={`data:image/jpeg;base64,${item.imageBase64}`} 
                      alt={item.name} 
                    />
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button className="buy-now-btn">Buy Now</button>
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
