import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/Description.css';

function Description() {
  const { id } = useParams(); // Get item ID from URL
  const [seedItem, setSeedItem] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ reviewerName: '', reviewText: '', rating: 1 });
  const navigate = useNavigate(); // To navigate to the cart

  useEffect(() => {
    // Fetch item details by ID
    axios.get(`http://localhost:8000/showcase/get/${id}`)
      .then((res) => {
        setSeedItem(res.data.showcaseItem);
      })
      .catch((err) => {
        console.error('Error fetching seed item:', err);
        alert('Error fetching item details');
      });

    // Fetch reviews for the item
    axios.get(`http://localhost:8000/reviews/item/${id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value >= 1 ? value : 1); // Ensure quantity is at least 1
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1); // Increase quantity
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Decrease quantity but ensure it's at least 1
  };

  // Function to calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const addToCart = () => {
    if (!seedItem) {
        return alert('Item details are not available');
    }

    const discountedPrice = getDiscountedPrice(seedItem.price, seedItem.discount);

    axios.post('http://localhost:8000/card/add', {
        itemNamec: seedItem.name,
        categoryc: seedItem.category,
        pricec: discountedPrice.toFixed(2), // Send the discounted price to the backend
        quantityc: quantity, // Send the quantity to the backend
        imagec: seedItem.imageBase64 // Add imageBase64 to the cart data
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


  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = () => {
    if (!newReview.reviewerName || !newReview.reviewText) {
      return alert('Please fill out all fields');
    }

    axios.post('http://localhost:8000/reviews/add', {
      itemId: id,
      reviewerName: newReview.reviewerName,
      reviewText: newReview.reviewText,
      rating: newReview.rating,
    })
    .then(() => {
      alert('Review added successfully');
      setNewReview({ reviewerName: '', reviewText: '', rating: 1 });
      // Refresh reviews
      axios.get(`http://localhost:8000/reviews/item/${id}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error('Error fetching reviews:', err));
    })
    .catch(err => {
      console.error('Error adding review:', err);
      alert('Error adding review');
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

          <div className="price-section">
            {seedItem.discount > 0 ? (
              <>
                <p className="discount">Original Price: ₹{seedItem.price.toFixed(2)}</p>
                <p className="discount-percentage">Discount: {seedItem.discount}% off</p>
                <p>Discounted Price: ₹{ (seedItem.price - (seedItem.price * (seedItem.discount / 100))).toFixed(2) }</p>
              </>
            ) : (
              <p>Price: ₹{seedItem.price.toFixed(2)}</p>
            )}
          </div>
          
          <div className="quantity-control">
            <label htmlFor="quantity">Quantity:</label>
            <button onClick={decreaseQuantity} className="quantity-btn">-</button>
            <input 
              type="number" 
              id="quantity" 
              value={quantity} 
              min="1" 
              onChange={handleQuantityChange} 
            />
            <button onClick={increaseQuantity} className="quantity-btn">+</button>
          </div>
          
          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
          
          <div className="reviews-section">
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map(review => (
                  <li key={review._id} className="review-item">
                    <strong>{review.reviewerName}</strong> - {review.rating} Stars
                    <p>{review.reviewText}</p>
                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet</p>
            )}
            
            <h4>Add a Review</h4>
            <div className="review-form">
              <label htmlFor="reviewerName">Name:</label>
              <input 
                type="text" 
                id="reviewerName" 
                name="reviewerName" 
                value={newReview.reviewerName} 
                onChange={handleReviewChange} 
              />
              
              <label htmlFor="reviewText">Review:</label>
              <textarea 
                id="reviewText" 
                name="reviewText" 
                value={newReview.reviewText} 
                onChange={handleReviewChange} 
              ></textarea>
              
              <label htmlFor="rating">Rating:</label>
              <input 
                type="number" 
                id="rating" 
                name="rating" 
                value={newReview.rating} 
                min="1" 
                max="5" 
                onChange={handleReviewChange} 
              />
              
              <button onClick={submitReview}>Submit Review</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Description;
