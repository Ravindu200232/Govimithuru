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
//import bulkImage from './img/bulk.png';

function Product() {
  return (
    <div className="product-page">
      <section className="products-section">
        <div className="search-bar">
          <input type="text" placeholder="Search Product, Categories, and Brand" />
          <button className="technical-name-btn">Search by Technical Name</button>
        </div>

        <div className="product-categories">
          <div className="category">
            <a href="/seeds">
              <img src={seedsImage} alt="Seeds" />
              <span>SEEDS</span>
            </a>
          </div>
          <div className="category">
            <a href="/growthPromoters">
              <img src={growthPromotersImage} alt="Growth Promoters" />
              <span>Growth Promoters</span>
            </a>
          </div>
          <div className="category">
            <a href="/remedies">
              <img src={remediesImage} alt="Remedies" />
              <span>Remedies</span>
            </a>
          </div>
          <div className="category">
            <a href="/organicFarming">
              <img src={organicFarmingImage} alt="Organic Farming" />
              <span>Organic Farming</span>
            </a>
          </div>
          <div className="category">
            <a href="/equipments">
              <img src={equipmentsImage} alt="Equipments" />
              <span>Equipments</span>
            </a>
          </div>
          <div className="category">
            <a href="/fertilizers">
              <img src={fertilizersImage} alt="Fertilizers" />
              <span>Fertilizers</span>
            </a>
          </div>
          <div className="category">
            <a href="/irrigation">
              <img src={irrigationImage} alt="Irrigation" />
              <span>Irrigation</span>
            </a>
          </div>
          <div className="category">
            <a href="/gardening">
              <img src={gardeningImage} alt="Gardening" />
              <span>Gardening</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
