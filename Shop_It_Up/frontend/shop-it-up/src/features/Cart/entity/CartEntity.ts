import ProductEntity from "../../Products/entity/ProductEntity";

export default interface CartEntity{
    cartId: string;
    contributerIds: string[];
    products: ProductEntity[];
}
