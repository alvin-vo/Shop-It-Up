import Cart from "../domain/Cart";
import { mapCartEntitytoCart } from "../mapper/cartMapper";
export interface CartRepo {
  // operations
  removeProductFromCart(cartId: string, productId: string): Promise<Cart>;
  fetchShoppingCart(): Promise<Cart>;
}

export class CartRepoImp implements CartRepo {
  baseUrl = "http://localhost:3010";

  async removeProductFromCart(
    cartId: string,
    productId: string
  ): Promise<Cart> {
    try {
      const response = await fetch(
        `/api/cart/removeProduct/${cartId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product");
      }
      const updatedCartEntity = await response.json();
      const updatedCart: Cart = mapCartEntitytoCart(updatedCartEntity);
      return updatedCart;
    } catch (error) {
      console.error("Error removing product from cart");
      throw error;
    }
  }

  async fetchShoppingCart(): Promise<Cart> {
    console.log("Fetch shopping cart is being called 2");
    try {
      const response = await fetch("/api/carts/cart");

      if (!response.ok) {
        throw new Error("Failed to fetch shopping cart");
      }

      const cartEntity = await response.json();
      console.log("cart entity:", cartEntity);
      const cart: Cart = mapCartEntitytoCart(cartEntity);
      return cart;
    } catch (error) {
      console.error("Error fetching shopping cart:", error);
      throw error;
    }
  }
}
