import React, { useState } from 'react';
import './CartPage.css'; // Assume we have some CSS for basic styling
//import Navbar from './features/NavBar/Presentation/Navbar'
import Navbar from '../../../NavBar/Presentation/nav_bar';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const ShoppingCartPage: React.FC = () => {
  const initialCartItems: CartItem[] = [
    { id: 1, name: "Echo Dot", price: 49.99, quantity: 1 },
    { id: 2, name: "Amazon Fire Stick", price: 39.99, quantity: 2 },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: quantity } : item));
  };

  const removeItemFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };
  return (
    <div>
    <Navbar/>
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <div className="item-info">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
          <div className="item-controls">
            <input 
              type="number" 
              value={item.quantity} 
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              min="1"
            />
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        Total: ${calculateTotal()}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </div>
    </div>
  );
};

export default ShoppingCartPage;
