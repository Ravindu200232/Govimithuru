import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
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

const categories = [
  { name: 'SEEDS', image: seedsImage, link: '/seeds' },
  { name: 'Growth Promoters', image: growthPromotersImage, link: '/growthPromoters' },
  { name: 'Remedies', image: remediesImage, link: '/remedies' },
  { name: 'Organic Farming', image: organicFarmingImage, link: '/organicFarming' },
  { name: 'Equipments', image: equipmentsImage, link: '/equipments' },
  { name: 'Fertilizers', image: fertilizersImage, link: '/fertilizers' },
  { name: 'Irrigation', image: irrigationImage, link: '/irrigation' },
  { name: 'Gardening', image: gardeningImage, link: '/gardening' },
];

function Product() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page">
      <section className="products-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Product, Categories, and Brand"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="technical-name-btn">
            <FaSearch /> {/* Search icon */}
            Search by Technical Name
          </button>
        </div>

        <div className="product-categories">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div className="category" key={index}>
                <a href={category.link}>
                  <img src={category.image} alt={category.name} />
                  <span>{category.name}</span>
                </a>
              </div>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Product;
