import ProductEntity from "../../Products/entity/ProductEntity";

export default interface CartEntity{
    cartId: string;
    ownerId: string;
    contributerIds: string[];
    products: ProductEntity[];
}
