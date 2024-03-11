import React, { useEffect, useState } from "react";
import "./CartPage.css"; // Assume we have some CSS for basic styling
import Navbar from "../../../NavBar/Presentation/nav_bar";
import Cart from "features/Cart/domain/Cart";
import { mapCartEntitytoCart } from "features/Cart/mapper/cartMapper";
import { useNavigate } from 'react-router-dom';
import { ProductsRepositoryImpl } from "../../../Products/ProductsRepo/ProductsRepo";


type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const ShoppingCartPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      console.log("Fetch shopping cart is being called");
      try {
        const response = await fetch("/api/carts/cart");

        let data = await response.json();
        //console.log("response data: ", data);
        //console.log(data.productsfind);
        let foo: ProductsRepositoryImpl = new ProductsRepositoryImpl();

        let cartInfo: CartItem[] = [];

        for (let i = 0; i < data.userCart.products.length; i++){
          if (data.userCart.products[i].productId){
            let newData = await foo.fetchProduct(data.userCart.products[i].productId)
            let item: CartItem = {
              id: 0,
              name: '',
              price: 0,
              quantity: 0
            };
            item.id = data.userCart.products[i].productId;
            item.name = newData.title;
            item.price = newData.price;
            item.quantity = data.userCart.products[i].quantity;
            cartInfo.push(item);
          }
        }
        setCartItems(cartInfo);

        if (!response.ok) {
          throw new Error("Failed to fetch shopping cart");
        }
      } catch (error) {
        console.error("Error fetching shopping cart:", error);
        throw error;
      }
    })();
  }, []);

  const initialCartItems: CartItem[] = [
  ];
  
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Modify this function to call the removeProductFromCartAPI
  const removeItemFromCart = (cartId: number, productId: number) => {
    removeProductFromCartAPI(cartId, productId);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Function to call API for removing product from cart
  const removeProductFromCartAPI = async (
    cartId: number,
    productId: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/carts/removeProduct/${productId}`,
        {
          method: "DELETE", // Even though we are "removing", the method specified is POST
          headers: {
            "Content-Type": "application/json",
            // Include other headers as required, such as authorization tokens
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      const updatedCart = await response.json();
      // Assuming updatedCart is an array of CartItems
      setCartItems(updatedCart);
      console.log("Product removed from cart", updatedCart);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="shopping-cart">
        <h2>Your Shopping Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
            <div className="item-controls">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                min="1"
              />
              {/* Modify the onClick handler to pass the correct cartId and productId */}
              <button onClick={() => removeItemFromCart(1, item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="total">Total: ${calculateTotal()}</div>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
