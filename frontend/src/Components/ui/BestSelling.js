import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './css/BestSelling.css';

function BestSelling() {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);
  const scrollAmount = 300; // Amount to scroll on each interval

  // Function to fetch best-selling products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bestSelling'); // Adjust the URL as necessary
      setProducts(response.data); // Set the fetched products
    } catch (error) {
      console.error('Error fetching best selling products:', error);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount

    const container = scrollContainerRef.current;

    if (!container) return;

    let scrollInterval = setInterval(() => {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });

      // Wrap around to the beginning
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    }, 3000); // Adjust the interval time (in milliseconds) as needed

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  }, [scrollAmount]);

  return (
    <div className="best-selling">
      <h2>Best Selling</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
      <div className="best-selling-products" ref={scrollContainerRef}>
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <img src={product.img} alt={product.title} />
            <h3>{product.title}</h3>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <button>Shop Now</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSelling;
