import ProductEntity  from "../../Products/entity/ProductEntity";

export default interface UserEntity{
    userId: string;
    productsToSell: ProductEntity[];
    email: string;
    cartId: string;
}

