import HomePage from "./features/HomePage/presentation/HomePage";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './features/LoginPage/presentation/LoginPage'; // Adjust the import path as necessary
import CartPage from './features/Cart/CartPage/presentation/CartPage';
import CheckoutPage from './features/CheckoutPage/presentation/CheckoutPage';



const App: React.FC = () => {

  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/shoppingcart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
