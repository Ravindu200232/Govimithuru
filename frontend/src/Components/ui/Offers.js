import React, { useRef, useEffect } from 'react';
import './css/Offers.css';
import offer1 from './img/offer1.jpg';
import offer2 from './img/off2.webp';
import offer3 from './img/off2.webp';

const offers = [
  { img: offer1, title: "Product 1", description: "Description of product 1" },
  { img: offer2, title: "Product 2", description: "Description of product 2" },
  { img: offer3, title: "Product 3", description: "Description of product 3" },
  { img: offer1, title: "Product 4", description: "Description of product 4" },
  { img: offer2, title: "Product 5", description: "Description of product 5" },
  { img: offer3, title: "Product 6", description: "Description of product 6" },
  { img: offer1, title: "Product 7", description: "Description of product 7" },
  { img: offer2, title: "Product 8", description: "Description of product 8" },
  { img: offer3, title: "Product 9", description: "Description of product 9" },
  { img: offer1, title: "Product 10", description: "Description of product 10" },
];

function Offers() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({
          left: 300, // Adjust the scroll amount as needed
          behavior: 'smooth',
        });
      }
    }, 3000); // Adjust the interval time (in milliseconds) as needed

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="offers">
      <h2>Today's Offers</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
      <div className="offers-list" ref={scrollContainerRef}>
        {offers.map((offer, index) => (
          <div className="offer-item" key={index}>
            <img src={offer.img} alt={offer.title} />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <button>Shop Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
