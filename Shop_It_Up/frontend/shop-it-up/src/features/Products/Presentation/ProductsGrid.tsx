import { SimpleGrid } from '@chakra-ui/react'
import Products from './Products'
import { fetchProducts } from '../ProductsRepo/ProductsRepo'
import React, { useState } from 'react'


const ProductsGrid = () => {
    const [amountProduct, setAmountProduct] = useState(0)

    const getProducts = async () => {
        let myProducts = await fetchProducts();
        setAmountProduct(myProducts.length);
       }
    
    getProducts()

    return (
        <SimpleGrid columns={[3,null,5]} spacing={3}>
            {[...Array(amountProduct)].map((x,i) =>
                <Products itemNum={i} itemInfo={fetchProducts()}/>
            )}

        </SimpleGrid>
    );
}

export default ProductsGrid;