import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [availability, setAvailability] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get('http://localhost:8000/card/')
      .then(response => {
        setCartItems(response.data);
        const initialQuantities = {};
        const initialChecked = {};
        const initialAvailability = {};
        response.data.forEach(item => {
          initialQuantities[item._id] = item.quantityc || 1;
          initialChecked[item._id] = false;
          initialAvailability[item._id] = item.available || 0;
        });
        setQuantities(initialQuantities);
        setCheckedItems(initialChecked);
        setAvailability(initialAvailability);
      })
      .catch(err => {
        console.error('Error fetching cart items:', err);
        alert('Error fetching cart items');
      });
  }, []);

  const handleQuantityChange = (id, change) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(1, prevQuantities[id] + change);
      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });
  };

  const handleCheckout = () => {
    cartItems.forEach(item => {
      if (checkedItems[item._id]) {
        const updatedQuantity = quantities[item._id];
        axios.put(`http://localhost:8000/card/update/${item._id}`, { quantityc: updatedQuantity })
          .then(() => {
            console.log(`Quantity for item ${item._id} updated successfully`);
          })
          .catch(err => {
            console.error(`Error updating quantity for item ${item._id}:`, err);
          });
      }
    });
    
    // Navigate to the order form after updating quantities
    navigate('/admin/orders/add');
    alert('Checkout successful! Quantities updated for selected items.');
  };

  const handleSelectItem = (id) => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const removeItem = (id) => {
    axios.delete(`http://localhost:8000/card/delete/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error('Error removing item from cart:', err);
        alert('Error removing item from cart');
      });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      if (checkedItems[item._id]) {
        return sum + (item.pricec * quantities[item._id]);
      }
      return sum;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2>My Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <input 
                type="checkbox" 
                checked={checkedItems[item._id]} 
                onChange={() => handleSelectItem(item._id)} 
              />
              <div className="cart-item-info">
                <img 
                  src={`data:image/jpeg;base64,${item.imagec}`} 
                  alt={item.itemNamec} 
                  className="cart-item-image"
                />
                <h3>{item.itemNamec}</h3>
                <p>Category: {item.categoryc}</p>
                <p>Price: ₹{item.pricec.toFixed(2)}</p>
                <div className="quantity-control">
                  <button 
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={quantities[item._id] <= 1}
                  >
                    -
                  </button>
                  <span>{quantities[item._id]}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, 1)}
                    disabled={quantities[item._id] >= availability[item._id]}
                  >
                    +
                    {quantities[item._id] > availability[item._id] && (
                      <span className="warning-message">Max reached</span>
                    )}
                  </button>
                </div>
                <p>Available: {availability[item._id]}</p>
                <button className="buy-btn">Buy</button>
              </div>
              <div className="remove-item" onClick={() => removeItem(item._id)}>X</div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="cart-summary">
        <h3>TOTAL</h3>
        <p>Subtotal: ₹{calculateTotal()}</p>
        <p>Delivery: Free</p>
        <button className="checkout-btn" onClick={handleCheckout}>Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
