import { SimpleGrid } from '@chakra-ui/react'
import Products from './Products'
import { ProductsRepositoryImpl } from '../ProductsRepo/ProductsRepo'
import React, { useState } from 'react'


const ProductsGrid = () => {
    const [amountProduct, setAmountProduct] = useState(0)
    let foo:ProductsRepositoryImpl = new ProductsRepositoryImpl()

    const getProducts = async () => {
        let myProducts = await foo.fetchProducts();
        setAmountProduct(myProducts.length);
       }
    
    getProducts()



    return (
        <SimpleGrid columns={[4, null, 5]} spacing={3}>
            {[...Array(amountProduct)].map((x,i) =>
                <Products itemNum={i} itemInfo={foo.fetchProducts()}/>
            )}

        </SimpleGrid>
    );
}

export default ProductsGrid;