import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './css/CropSolution.css';

function CropSolution() {
  const [crops, setCrops] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Fetch crop solutions from the API
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cropSolutions'); // Adjust URL as needed
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crop solutions:', error);
      }
    };

    fetchCrops();

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
    <div className="crop-solution">
      <h2>Crop Solutions</h2>
      <div className="crops" ref={scrollContainerRef}>
        {crops.map((crop, index) => (
          <div className="crop-item" key={index}>
            <img src={crop.img} alt={crop.title} />
            <p>{crop.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropSolution;
