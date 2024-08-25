import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/card/')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(err => {
        console.error('Error fetching cart items:', err);
        alert('Error fetching cart items');
      });
  }, []);

  const removeItem = (id) => {
    axios.delete(`http://localhost:8090/card/delete/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error('Error removing item from cart:', err);
        alert('Error removing item from cart');
      });
  };

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2>My Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <input type="checkbox" className="item-select" />
              <div className="cart-item-info">
                <h3>{item.itemNamec}</h3>
                <p>Category: {item.categoryc}</p>
                <p>Price: ₹{item.pricec.toFixed(2)}</p>
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
        <p>Subtotal: ₹{cartItems.reduce((sum, item) => sum + item.pricec, 0).toFixed(2)}</p>
        <p>Delivery: Free</p>
        <button className="checkout-btn">Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
