// OrderSummary.js
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './css/OrderSummary .css'

function OrderSummary() {
  const [orderSummary, setOrderSummary] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address1: '',
    address2: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    secondPhoneNumber: '',
    paymentType: 'cash',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const summary = JSON.parse(sessionStorage.getItem('orderSummary') || '[]');
    setOrderSummary(summary);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.name) newErrors.name = "Customer name is required.";
    if (!customerInfo.address1) newErrors.address1 = "1st address is required.";
    if (!customerInfo.postalCode) newErrors.postalCode = "Postal code is required.";
    if (!customerInfo.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!customerInfo.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    if (orderSummary.length === 0) {
      alert("No items in order summary");
      setLoading(false);
      return;
    }

    const orderData = {
      customerName: customerInfo.name,
      saleDate: new Date(),
      status: "Pending",
      address: `${customerInfo.address1} ${customerInfo.address2}`.trim(),
      postalCode: customerInfo.postalCode,
      email: customerInfo.email,
      paymentType: customerInfo.paymentType,
      productDetails: orderSummary.map(item => ({
        itemName: item.itemName,
        quantitySold: item.quantity,
        itemPrice: item.price,
        totalPrice: item.totalPrice
      }))
    };

    try {
      const response = await axios.post('http://localhost:8000/orders/add', orderData);
      alert("Order submitted successfully!");
      setOrderSummary([]);
      setCustomerInfo({
        name: '',
        address1: '',
        address2: '',
        postalCode: '',
        email: '',
        phoneNumber: '',
        secondPhoneNumber: '',
        paymentType: 'cash',
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(`Failed to submit order: ${error.response?.data?.error || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {orderSummary.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderSummary.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{item.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items selected</p>
      )}

      <h2>Customer Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input type="text" name="name" value={customerInfo.name} onChange={handleInputChange} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          1st Address:
          <input type="text" name="address1" value={customerInfo.address1} onChange={handleInputChange} required />
          {errors.address1 && <span className="error">{errors.address1}</span>}
        </label>
        <label>
          2nd Address:
          <input type="text" name="address2" value={customerInfo.address2} onChange={handleInputChange} />
        </label>
        <label>
          Postal Code:
          <input type="text" name="postalCode" value={customerInfo.postalCode} onChange={handleInputChange} required />
          {errors.postalCode && <span className="error">{errors.postalCode}</span>}
        </label>
        <label>
          Email:
          <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={customerInfo.phoneNumber} onChange={handleInputChange} required />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </label>
        <label>
          Second Phone Number:
          <input type="tel" name="secondPhoneNumber" value={customerInfo.secondPhoneNumber} onChange={handleInputChange} />
        </label>

        <fieldset>
          <legend>Payment Type:</legend>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="cash"
              checked={customerInfo.paymentType === 'cash'}
              onChange={handleInputChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentType"
              value="online"
              checked={customerInfo.paymentType === 'online'}
              onChange={handleInputChange}
            />
            Online Pay
          </label>
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderSummary;
