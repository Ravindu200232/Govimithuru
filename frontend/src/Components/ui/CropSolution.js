import React, { useRef, useEffect } from 'react';
import './css/CropSolution.css';
import cr1 from './img/cr1.jpg';
import cr2 from './img/cr2.jpg';
import cr3 from './img/cr3.jpg';

const crops = [
  { img: cr1, name: "Potato" },
  { img: cr2, name: "Pumpkin" },
  { img: cr3, name: "Radish" },
  { img: cr1, name: "Carrot" },
  { img: cr2, name: "Onion" },
  { img: cr3, name: "Tomato" },
  { img: cr1, name: "Cucumber" },
  { img: cr2, name: "Pepper" },
  { img: cr3, name: "Garlic" },
  { img: cr1, name: "Beetroot" },
];

function CropSolution() {
  const scrollContainerRef = useRef(null);

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
    <div className="crop-solution">
      <h2>Crop Solution</h2>
      <div className="crops" ref={scrollContainerRef}>
        {crops.map((crop, index) => (
          <div className="crop-item" key={index}>
            <img src={crop.img} alt={crop.name} />
            <p>{crop.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropSolution;
