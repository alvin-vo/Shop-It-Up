import Product from "../domain/Product";
import ProductEntity from "../entity/ProductEntity";

export const mapProductEntityToProduct = (productEntity: ProductEntity): Product =>{
    return{
        productsId: productEntity.productsId,
        userId: productEntity.userId,
        title: productEntity.title,
        quantity: productEntity.quantity,
        description: productEntity.description,
        price: productEntity.price,
        img: productEntity.img,
        
    };
};