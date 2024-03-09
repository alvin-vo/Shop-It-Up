import Cart from "../domain/Cart";
import CartEntity from "../entity/CartEntity";

export const mapCartEntitytoCart = (cartEntity: CartEntity): Cart =>{
    return{
        cartId: cartEntity.cartId,
        contributerIds: cartEntity.contributerIds,
        products: cartEntity.products,
    };
};
