import { SimpleGrid } from '@chakra-ui/react'
import Products from './Products'
const ProductsGrid = () => {
    return (
        <SimpleGrid columns={[4, null, 5]} spacing={3}>
            {[...Array(10)].map((x,i) =>
                <Products/>
            )}

        </SimpleGrid>
    );
}

export default ProductsGrid;