import React, { useState } from 'react';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';

type BuyerInfo = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  // Add more fields as necessary
};

const CheckoutPage: React.FC = () => {
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    // Initialize more fields here if added
  });

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/thankyou');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buyer Info:', buyerInfo);

    try {
      const response = await fetch('http://localhost:3000/api/carts/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization header if your API requires authentication
          // 'Authorization': 'Bearer yourTokenHere',
        },
        body: JSON.stringify({
          userId: 'yourUserIdHere', // Make sure to provide the userId if needed or modify accordingly
          // Include other necessary buyer info or cart details as needed by your backend
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Checkout Successful:', data);
        navigate('/thankyou');
        // Handle successful checkout, e.g., show a confirmation message, redirect, etc.
      } else {
        console.error('Checkout Error:', data.message);
        // Handle errors, e.g., show error message to user
      }
    } catch (error) {
      console.error('Network Error:', error);
      // Handle network errors, e.g., show error message to user
    }
  };

  return (
    <div>
      <div className="checkout-page">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" value={buyerInfo.fullName} onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" value={buyerInfo.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="address" value={buyerInfo.address} onChange={handleChange} placeholder="Address" required />
          <input type="text" name="city" value={buyerInfo.city} onChange={handleChange} placeholder="City" required />
          <input type="text" name="zipCode" value={buyerInfo.zipCode} onChange={handleChange} placeholder="Zip Code" required />
          
          <button type="submit" >Submit Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
