import Product from "../domain/Product";
import ProductEntity from "../entity/ProductEntity";

export const mapProductEntityToProduct = (productEntity: ProductEntity): Product =>{
    return{
        productId: productEntity.productId,
        sellerId: productEntity.sellerId,
        title: productEntity.title,
        quantity: productEntity.quantity,
        description: productEntity.description,
        category: productEntity.category,
        price: productEntity.price,
        image: productEntity.image
    };
};