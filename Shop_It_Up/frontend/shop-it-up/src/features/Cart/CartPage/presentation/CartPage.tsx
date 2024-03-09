import React, { useState, useEffect } from 'react';
import './CartPage.css'; // Assume we have some CSS for basic styling
import Navbar from '../../../NavBar/Presentation/nav_bar';
import Cart from 'features/Cart/domain/Cart';
import { CartRepoImp } from "../../CartRepo/CartRepo";

const getCookieValue = (name: any) => (
  document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1]
);

const ShoppingCartPage: React.FC = () => {
  // const initialCartItems: Car[] = [
  //   { id: 1, name: "Echo Dot", price: 49.99, quantity: 1 },
  // ];

  const [cartItems, setCartItems] = useState<Cart | null> (null);
  
  // const updateQuantity = (id: number, quantity: number) => {
  //   setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
  // };



  // const calculateTotal = () => {
  //   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  // };

  // const handleCheckout = () => {
  //   console.log('Proceeding to checkout...');
  // };

  const cartRepo = new CartRepoImp();

  useEffect(() => {

    const fetchCart = async () => {
      try {
        const fetchedCart = await cartRepo.fetchShoppingCart();
        setCartItems(fetchedCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);
  const removeProduct = async (productId: string) => {
      if(cartItems == null){
        return;
      }

    try{
    
          const updatedCart = await cartRepo.removeProductFromCart(cartItems.cartId, productId);
          setCartItems(updatedCart);
      }catch (error){
        console.error("Failed to remove product");
      }

  }

  return (
    <div>
      <Navbar/>
      <div className="shopping-cart">
        <h2>Your Shopping Cart</h2>
        {cartItems?.products.map((product) => (
          <div key={product.productId} className="cart-item">
            <div className="item-info">
              <span>{product.title}</span>
              <span>${product.price}</span>
            </div>
              {/* Modify the onClick handler to pass the correct cartId and productId */}
              <button onClick={() => removeProduct(product.productId)}>Remove</button>
            </div>
        ))}
        {/* <button className="checkout-button" onClick={handleCheckout}>Checkout</button> */}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
