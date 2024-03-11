import React, { useEffect, useState } from "react";
import "./CartPage.css"; // Assume we have some CSS for basic styling
import Navbar from "../../../NavBar/Presentation/nav_bar";
import Cart from "features/Cart/domain/Cart";
import { mapCartEntitytoCart } from "features/Cart/mapper/cartMapper";
import { useNavigate } from 'react-router-dom';
import { Button, useToast, Flex } from '@chakra-ui/react';
import { ProductsRepositoryImpl } from "../../../Products/ProductsRepo/ProductsRepo";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};


const ShoppingCartPage: React.FC = () => {
  const [inviteUrl, setInviteUrl] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const [showTooltip, setShowTooltip] = useState(false); 
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
              id: '',
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

  const closeTooltip = () => setShowTooltip(false);

  const initialCartItems: CartItem[] = [
  ];
  
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };


  const sendInvite = async () => {
    try {
      const response = await fetch("/api/users/invite");
      // Check only the response status to determine if the request was successful
      if (!response.ok) {
        console.error("Failed to send invite."); // Log an appropriate error
        return; // Exit the function early
      }
  
      // Since the backend returns a plain string, use response.text() instead of response.json()
      const inviteUrl = await response.text(); // Get the invite link as text
      setInviteUrl(inviteUrl);
      setShowTooltip(true); // Store the invite URL in the component's state
    } catch (error) {
      console.error("Error sending invite:", error); // Log fetch or parsing errors
    }
  };
  
  
  





  // Modify this function to call the removeProductFromCartAPI
  const removeItemFromCart = ( productId: string) => {
    removeProductFromCartAPI(productId);
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
  const  removeProductFromCartAPI = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/carts/removeProduct/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      // Product successfully removed, now update the state
      const updatedCartItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCartItems);

      // Show success toast
      toast({
        title: "Product removed.",
        description: "The product has been removed from your cart.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log("Product removed from cart");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      // Show error toast
      toast({
        title: "Error removing product.",
        description: "There was an issue removing the product from your cart.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
              <Button colorScheme="red" onClick={() => removeItemFromCart(item.id)}>
               Remove
            </Button>
            </div>
          </div>
        ))}
        <div className="total">Total: ${calculateTotal()}</div>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <div className="invite-section">
      <button onClick={sendInvite} className="orange-button">Generate Invite URL</button>
{showTooltip && inviteUrl && (
  <div className="tooltip-active">
    {inviteUrl}
    <button onClick={closeTooltip} className="close-button">Close</button>
  </div>
)}


    </div>
    </div>

  );
};

export default ShoppingCartPage;
