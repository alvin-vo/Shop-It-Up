import Product from '../domain/Product';
import ProductEntity from '../entity/ProductEntity';
import {mapProductEntityToProduct} from '../mapper/productMapper';

export interface ProductsRepository{
    fetchProducts(): Promise<Product[]>;
    fetchProduct(id: string): Promise<Product>;
}

export class ProductsRepositoryImpl implements ProductsRepository{
    async fetchProducts(): Promise<Product[]>{
        const response = await fetch('/api/products',{
            method: 'GET'
        });
        const productEntities: ProductEntity[] = await response.json();
        return productEntities.map(mapProductEntityToProduct);
    }
    async fetchProduct(id: string): Promise<Product>{
        const response = await fetch(`/api/products/${id}`,{
            method: 'GET'
        });
        const productEntities: ProductEntity = await response.json();
        return productEntities;
    }
}