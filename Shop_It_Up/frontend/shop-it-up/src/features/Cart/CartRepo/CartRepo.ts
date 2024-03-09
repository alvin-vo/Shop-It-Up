import Cart from "../domain/Cart";
import { mapCartEntitytoCart } from "../mapper/cartMapper";
export interface CartRepo{
    // operations
    removeProductFromCart(cartId: string, productId: string): Promise<Cart>;

}

export class CartRepoImp implements CartRepo{
    baseUrl = "http://localhost:3010";

    async removeProductFromCart(cartId: string, productId: string): Promise<Cart> {

        try{
             const response = await fetch(`${this.baseUrl}/api/cart/removeProduct/${cartId}/${productId}`, {

            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
        
             });

             if(!response.ok){
            throw new Error("Failed to remove product");
            }
            const updatedCartEntity = await response.json();
            const updatedCart: Cart = mapCartEntitytoCart(updatedCartEntity);
            return updatedCart;

        } catch (error){
            console.error("Error removing product from cart");
            throw error;
        }
       

    }
}