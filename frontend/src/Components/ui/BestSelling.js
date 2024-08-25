import React, { useRef, useEffect } from 'react';
import './css/BestSelling.css';
import bs1 from './img/bs1.webp';
import bs2 from './img/bs2.webp';
import bs3 from './img/bs3.webp';

const products = [
  { img: bs1, title: "Product 1" },
  { img: bs2, title: "Product 2" },
  { img: bs3, title: "Product 3" },
  { img: bs1, title: "Product 4" },
  { img: bs2, title: "Product 5" },
  { img: bs3, title: "Product 6" },
  { img: bs1, title: "Product 7" },
  { img: bs2, title: "Product 8" },
  { img: bs3, title: "Product 9" },
  { img: bs1, title: "Product 10" },
];

function BestSelling() {
  const scrollContainerRef = useRef(null);
  const scrollAmount = 300; // Amount to scroll on each interval

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
            <button>Shop Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSelling;
