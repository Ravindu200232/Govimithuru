import React from 'react';
import './css/product.css';

// Import category images
import seedsImage from './img/seeds.jpg';
import growthPromotersImage from './img/growth Promoters.webp';
import remediesImage from './img/ramedis.png';
import organicFarmingImage from './img/organinc farming.png';
import equipmentsImage from './img/eqump.jpg';
import fertilizersImage from './img/fertilizer.jpg';
import irrigationImage from './img/irrigation.jpg';
import gardeningImage from './img/gardening.png';
import bulkImage from './img/bulk.png';

function Product() {
  return (
    <div className="product-page">
      <section className="products-section">
        <div className="search-bar">
          <input type="text" placeholder="Search Product, Categories and Brand" />
          <button className="technical-name-btn">Search by Technical Name</button>
        </div>

        <div className="product-categories">
          <div className="category">
           
          <a href='/Seeds'><img src={seedsImage} alt="SEEDS" /></a>
            <span>SEEDS</span>
            
          </div>
          <div className="category">
            <img src={growthPromotersImage} alt="Growth Promoters" />
            <span>Growth Promoters</span>
          </div>
          <div className="category">
            <img src={remediesImage} alt="Remedies" />
            <span>Remedies</span>
          </div>
          <div className="category">
            <img src={organicFarmingImage} alt="Organic Farming" />
            <span>Organic Farming</span>
          </div>
          <div className="category">
            <img src={equipmentsImage} alt="Equipments" />
            <span>Equipments</span>
          </div>
          <div className="category">
            <img src={fertilizersImage} alt="Fertilizers" />
            <span>Fertilizers</span>
          </div>
          <div className="category">
            <img src={irrigationImage} alt="Irrigation" />
            <span>Irrigation</span>
          </div>
          <div className="category">
            <img src={gardeningImage} alt="Gardening" />
            <span>Gardening</span>
          </div>
          {/* <div className="category">
            <img src={bulkImage} alt="Bulk" />
            <span>Bulk</span>
          </div> */}
        </div>

        <a href="#" className="see-more">See More</a>
      </section>
    </div>
  );
}

export default Product;
