import { SimpleGrid } from '@chakra-ui/react'
import Products from './Products'
const ProductsGrid = () => {
    return (
        <SimpleGrid columns={[3, null, 4]} spacing={3}>
            {[...Array(12)].map((x,i) =>
                <Products/>
            )}

        </SimpleGrid>
    );
}

export default ProductsGrid;