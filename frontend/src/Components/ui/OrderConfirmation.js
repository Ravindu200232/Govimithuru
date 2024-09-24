import React from 'react';
import { useParams } from 'react-router-dom';
import './css/OrderConfirmation.css'

function OrderConfirmation() {
  const { orderId } = useParams(); // Get the order ID from the URL

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <p>Order ID: {orderId}</p>
      {/* Additional confirmation details can be added here */}
    </div>
  );
}

export default OrderConfirmation;
