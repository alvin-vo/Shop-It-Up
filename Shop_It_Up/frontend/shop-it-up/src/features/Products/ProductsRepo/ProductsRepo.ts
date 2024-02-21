import Product from '../domain/Product';
import ProductEntity from '../entity/ProductEntity';
import { mapProductEntityToProduct } from '../mapper/productMapper';
import axios from 'axios'




let baseUrl:string = 'http://localhost:3010/api/';

export async function fetchProducts(): Promise<Product[]> {
/*     const response = await fetch(`${baseUrl}products`, {
        method: 'GET'
    });
    const productEntities: ProductEntity[] = await response.json();
    return productEntities.map(mapProductEntityToProduct); */
    let res = await axios.get(`${baseUrl}products`);
    let data = res.data;
    return data;
}
