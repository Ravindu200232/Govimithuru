import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/Description.css';

function Description() {
  const { id } = useParams(); // Get item ID from URL
  const [seedItem, setSeedItem] = useState(null);
  const navigate = useNavigate(); // To navigate to the cart

  useEffect(() => {
    // Fetch item details by ID
    axios.get(`http://localhost:8090/showcase/get/${id}`)
      .then((res) => {
        setSeedItem(res.data.showcaseItem);
      })
      .catch((err) => {
        console.error('Error fetching seed item:', err);
        alert('Error fetching item details');
      });
  }, [id]);

  const addToCart = () => {
    if (!seedItem) {
      return alert('Item details are not available');
    }

    axios.post('http://localhost:8090/card/add', {
      itemNamec: seedItem.name,
      categoryc: seedItem.category,
      pricec: seedItem.price,
    })
    .then(response => {
      if (response.status === 200) {
        alert('Item added to cart successfully!');
        navigate('/cart'); // Redirect to the cart page
      }
    })
    .catch(err => {
      console.error('Error adding item to cart:', err);
      alert('Error adding item to cart');
    });
  };

  return (
    <div className="description-page">
      {seedItem ? (
        <div className="product-description">
          <img 
            src={`data:image/jpeg;base64,${seedItem.imageBase64}`} 
            alt={seedItem.name} 
          />
          <h2>{seedItem.name}</h2>
          <p>{seedItem.description}</p>
          <p>Price: ${seedItem.price.toFixed(2)}</p>
          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Description;
