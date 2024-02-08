import Product from "../../Products/domain/Product";

export default interface Cart{
    cartId: string;
    ownerId: string;
    contributerIds: string[];
    products: Product[];
}

