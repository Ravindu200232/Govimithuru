import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './css/Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]); // State to hold offers data
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/offers'); // Adjust the URL as needed
        console.log(response.data); // Log the offers data
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
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
          left: 300,
          behavior: 'smooth',
        });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="offers">
      <h2>Today's Offers</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
      <div className="offers-list" ref={scrollContainerRef}>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div className="offer-item" key={offer._id}>
              <img
                src={offer.img || 'path/to/placeholder-image.jpg'} // Use a placeholder image if needed
                alt={offer.title}
              />
              <h3>{offer.title}</h3>
              <a href={offer.link} target="_blank" rel="noopener noreferrer">
                <button>Shop Now</button>
              </a>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
}

export default Offers;
