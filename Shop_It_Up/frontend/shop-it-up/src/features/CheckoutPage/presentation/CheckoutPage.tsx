import React, { useState } from 'react';
import './CheckoutPage.css';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Buyer Info:', buyerInfo);
    // Here, you would typically send this data to your backend server or a payment processor
  };

  return (
    <div>
      <div className="checkout-page">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={buyerInfo.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={buyerInfo.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="address"
            value={buyerInfo.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="city"
            value={buyerInfo.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="zipCode"
            value={buyerInfo.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            required
          />
          {/* Add more fields as necessary */}
          <button type="submit">Submit Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;


