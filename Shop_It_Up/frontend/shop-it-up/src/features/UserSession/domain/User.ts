import Product from "features/Products/domain/Product";

export default interface User{
    userId: string;
    productsToSell: Product[];
    receivedInvites: string[];
}
