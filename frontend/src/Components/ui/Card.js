import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa'; // Importing icons
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import './css/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [availability, setAvailability] = useState({});

  const navigate = useNavigate();

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
        toast.error('Error fetching cart items');
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
    const selectedItems = cartItems.filter(item => checkedItems[item._id]);
    
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item to proceed to checkout.');
      return;
    }

    const orderSummary = selectedItems.map(item => ({
      id: item._id,
      itemName: item.itemNamec,
      quantity: quantities[item._id],
      price: item.pricec,
      totalPrice: (item.pricec * quantities[item._id]),
    }));

    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));

    const updatePromises = orderSummary.map(item => {
      return axios.put(`http://localhost:8000/card/update/${item.id}`, { quantityc: item.quantity })
        .then(() => {
          console.log(`Quantity for item ${item.id} updated successfully`);
        })
        .catch(err => {
          console.error(`Error updating quantity for item ${item.id}:`, err);
          toast.error(`Error updating quantity for item ${item.id}`);
        });
    });

    Promise.all(updatePromises)
      .then(() => {
        const deletePromises = selectedItems.map(item => {
          return axios.delete(`http://localhost:8000/card/delete/${item._id}`)
            .then(() => {
              console.log(`Item ${item._id} deleted successfully`);
              toast.success(`Item ${item.itemNamec} removed from cart.`);
            })
            .catch(err => {
              console.error(`Error deleting item ${item._id}:`, err);
              toast.error(`Error deleting item ${item._id}`);
            });
        });

        return Promise.all(deletePromises);
      })
      .then(() => {
        navigate('/order-summary');
      })
      .catch(err => {
        console.error('Error during checkout process:', err);
        toast.error('An error occurred during checkout.');
      });
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
        toast.success('Item removed from cart.');
      })
      .catch(err => {
        console.error('Error removing item from cart:', err);
        toast.error('Error removing item from cart.');
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
        <h2>My Cart <FaShoppingCart /></h2>
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
                <p>Price: Rs:{item.pricec.toFixed(2)}</p>
                <div className="quantity-control">
                  <button 
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={quantities[item._id] <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span>{quantities[item._id]}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, 1)}
                    disabled={quantities[item._id] >= availability[item._id]}
                  >
                    <FaPlus />
                    {quantities[item._id] > availability[item._id] && (
                      <span className="warning-message">Max reached</span>
                    )}
                  </button>
                </div>
                <p>Available: {availability[item._id]}</p>
              </div>
              <div className="remove-item" onClick={() => removeItem(item._id)}>
                <FaTrash />
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="cart-summary">
        <h3>TOTAL</h3>
        <p>Subtotal: Rs:{calculateTotal()}</p>
        <p>Delivery: Free</p>
        <button className="checkout-btn" onClick={handleCheckout}>
          <FaShoppingCart /> Check Out
        </button>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default Cart;
