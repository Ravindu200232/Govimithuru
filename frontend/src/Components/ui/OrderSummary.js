import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './css/OrderSummary .css';

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
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardType: 'visa',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
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

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateCardNumber = (number) => {
    const cardPattern = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/
    };
    return cardPattern[paymentDetails.cardType].test(number);
  };

  const validateExpirationDate = (date) => {
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(`20${year}`, month - 1);
    return (
      month >= 1 && month <= 12 && 
      expiryDate >= currentDate
    );
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
    if (customerInfo.paymentType === 'online') {
      if (!paymentDetails.cardName) newErrors.cardName = "Card name is required.";
      if (!paymentDetails.cardNumber) {
        newErrors.cardNumber = "Card number is required.";
      } else if (!validateCardNumber(paymentDetails.cardNumber)) {
        newErrors.cardNumber = "Invalid card number.";
      }
      if (!paymentDetails.expirationDate) {
        newErrors.expirationDate = "Expiration date is required.";
      } else if (!validateExpirationDate(paymentDetails.expirationDate)) {
        newErrors.expirationDate = "Invalid expiration date.";
      }
      if (!paymentDetails.cvv) newErrors.cvv = "CVV is required.";
    }
    return newErrors;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    alert("Payment details submitted successfully!");
    setLoading(false);
  };

  const handleSaveOrder = async () => {
    if (orderSummary.length === 0) {
      alert("No items in order summary");
      return;
    }

    const orderData = {
      customerName: customerInfo.name,
      saleDate: new Date(),
      status: "Pending",
      address: `${customerInfo.address1} ${customerInfo.address2}`.trim(),
      postalCode: customerInfo.postalCode,
      email: customerInfo.email,
      phoneNumber: customerInfo.phoneNumber,
      paymentType: customerInfo.paymentType,
      productDetails: orderSummary.map(item => ({
        itemName: item.itemName,
        quantitySold: item.quantity,
        itemPrice: item.price,
        totalPrice: item.totalPrice
      }))
    };

    const deliveryData = {
      deliveryPersonName: customerInfo.name,
      deliveryDate: new Date(),
      status: "Pending",
      address: `${customerInfo.address1} ${customerInfo.address2}`.trim(),
      postalCode: customerInfo.postalCode,
      email: customerInfo.email,
      phoneNumber: customerInfo.phoneNumber,
      deliveryType: customerInfo.paymentType === 'cash' ? 'standard' : 'express',
      deliveryDetails: orderSummary.map(item => ({
        itemName: item.itemName,
        quantity: item.quantity,
        itemPrice: item.price,
        totalPrice: item.totalPrice
      }))
    };

    try {
      // Submit order
      await axios.post('http://localhost:8000/orders/add', orderData);
      // Submit delivery
      await axios.post('http://localhost:8000/delivery/add', deliveryData);
      alert("Order and delivery information submitted successfully!");

    

      // Clear state after submission
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
      setPaymentDetails({
        cardName: '',
        cardType: 'visa',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
      });
    } catch (error) {
      console.error("Error submitting order or delivery:", error);
      alert(`Failed to submit: ${error.response?.data?.error || "Unknown error"}`);
    }
  };

  const totalPrice = orderSummary.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);

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
      <form onSubmit={handlePaymentSubmit}>
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
        
        <button onClick={handleSaveOrder} disabled={loading}>
          {loading ? 'Saving...' : 'Save Order and Delivery'}
        </button>

        {customerInfo.paymentType === 'online' && (
          <div>
            <label>
              Card Name:
              <input
                type="text"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handlePaymentChange}
                required
              />
              {errors.cardName && <span className="error">{errors.cardName}</span>}
            </label>
            <label>
              Card Type:
              <select
                name="cardType"
                value={paymentDetails.cardType}
                onChange={handlePaymentChange}
              >
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="amex">American Express</option>
              </select>
            </label>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                required
              />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </label>
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={paymentDetails.expirationDate}
                onChange={handlePaymentChange}
                required
              />
              {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}
            </label>
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                required
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}
            </label>
            <div>
              <strong>Total Price: ₹{totalPrice}</strong>
            </div>
          </div>
        )}

        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Payment'}
        </button>
      </form>


    </div>
  );
}

export default OrderSummary;
