import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Description.css';

function Description() {
  const { id } = useParams();
  const [seedItem, setSeedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ reviewerName: '', reviewText: '', rating: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/showcase/get/${id}`)
      .then((res) => {
        setSeedItem(res.data.showcaseItem);
      })
      .catch((err) => {
        console.error('Error fetching seed item:', err);
        toast.error('Error fetching item details');
      });

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
    setQuantity(value >= 1 ? value : 1);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const addToCart = () => {
    if (!seedItem) {
      return toast.error('Item details are not available');
    }

    const discountedPrice = getDiscountedPrice(seedItem.price, seedItem.discount);

    axios.post('http://localhost:8000/card/add', {
      itemNamec: seedItem.name,
      categoryc: seedItem.category,
      pricec: discountedPrice.toFixed(2),
      quantityc: quantity,
      imagec: seedItem.imageBase64
    })
    .then(response => {
      if (response.status === 200) {
        toast.success('Item added to cart successfully');
        navigate('/cart');
      }
    })
    .catch(err => {
      console.error('Error adding item to cart:', err);
      toast.error('Error adding item to cart');
    });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = () => {
    if (!newReview.reviewerName || !newReview.reviewText) {
      return toast.error('Please fill out all fields');
    }

    axios.post('http://localhost:8000/reviews/add', {
      itemId: id,
      reviewerName: newReview.reviewerName,
      reviewText: newReview.reviewText,
      rating: newReview.rating,
    })
    .then(() => {
      toast.success('Review added successfully');
      setNewReview({ reviewerName: '', reviewText: '', rating: 1 });
      axios.get(`http://localhost:8000/reviews/item/${id}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error('Error fetching reviews:', err));
    })
    .catch(err => {
      console.error('Error adding review:', err);
      toast.error('Error adding review');
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
                <p className="discount">Original Price: Rs:{seedItem.price.toFixed(2)}</p>
                <p className="discount-percentage">Discount: {seedItem.discount}% off</p>
                <p>Discounted Price: Rs:{(getDiscountedPrice(seedItem.price, seedItem.discount)).toFixed(2)}</p>
              </>
            ) : (
              <p>Price: Rs:{seedItem.price.toFixed(2)}</p>
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
            <FaShoppingCart style={{ marginRight: '5px' }} /> Add to Cart
          </button>
          
          <div className="reviews-section">
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map(review => (
                  <li key={review._id} className="review-item">
                    <strong>{review.reviewerName}</strong> - {review.rating} <FaStar />
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
              
              <button onClick={submitReview}>
                <FaStar style={{ marginRight: '5px' }} /> Submit Review
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Description;
