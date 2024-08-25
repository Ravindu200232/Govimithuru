import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/GrowthPromoters.css';

function GrowthPromoters() {
  const [growthPromotersItems, setGrowthPromotersItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/showcase/growth-promoters')
      .then((res) => {
        setGrowthPromotersItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching growth promoters items:', err);
      });
  }, []);

  return (
    <div className="growth-promoters-page">
      <section className="growth-promoters-section">
        <h1>Growth Promoters</h1>
        <div className="growth-promoters-info">
          <div className="info-left">
            <h3>AGRICULTURAL GROWTH PROMOTERS</h3>
            <p>(Total products: {growthPromotersItems.length})</p>
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
              {growthPromotersItems.length > 0 ? (
                growthPromotersItems.map((item) => (
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
                <p>No growth promoters items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GrowthPromoters;
