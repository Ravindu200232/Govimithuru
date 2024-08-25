import React, { useState, useEffect } from 'react';
import './css/Poster.css';
import Banner1 from './img/banner1.webp';
import Banner2 from './img/banner2.webp';

function Poster({ altText }) {
  const images = [Banner1, Banner2]; // Array of images
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current image index

  useEffect(() => {
    // Set up an interval to change the image every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through the images
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div className="poster">
      <img src={images[currentIndex]} alt={altText} className="poster-img" />
    </div>
  );
}

export default Poster;
