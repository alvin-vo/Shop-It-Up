import Product from '../domain/Product';
import ProductEntity from '../entity/ProductEntity';
import {mapProductEntityToProduct} from '../mapper/productMapper';

export interface ProductsRepository{
    fetchProducts(): Promise<Product[]>;
}

export class ProductsRepositoryImpl implements ProductsRepository{
    baseUrl = 'http://localhost:3010/api/products';

    async fetchProducts(): Promise<Product[]>{
        const response = await fetch('http://localhost:3010/api/products')//{
         //   method: 'GET'
    //    });
        const productEntities: ProductEntity[] = await response.json();
        return productEntities.map(mapProductEntityToProduct);
    }
}