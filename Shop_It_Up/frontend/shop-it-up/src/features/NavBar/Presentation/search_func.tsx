import { Button, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ProductsRepositoryImpl } from '../../Products/ProductsRepo/ProductsRepo';
import SearchButts from "./search_butts";

// productsTypes.ts
export interface Product {
  productId: string;
  title: string;
  // Add other properties of the Product type here
}


const SearchFunc = () => {  

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRec, setFilteredRec] = useState<Product[]>([]); // Specify type as Product[]
    const [numRec, setNumRec] = useState<number>(0); // Specify type as number
    let foo = new ProductsRepositoryImpl();

    useEffect(() => {
        async function getProducts() {
            let myRecs = await foo.fetchProducts();
            // Filter the recommendations based on the search term
            const filteredProducts = myRecs.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRec(filteredProducts);
            setNumRec(filteredProducts.length);
        }
        getProducts();
    }, [searchTerm]);


    return (
      <div>
        <Input
            placeholder="Search Shop-It-Up"
            htmlSize={80}
            borderColor={"black"}
            variant={"ghost"}
            onChange={event => {setSearchTerm(event.target.value)}}
        />

        <SimpleGrid columns={1} spacing={1}>

          {[...Array(numRec)].map((x,i) =>
              <SearchButts ley={i} itemNum={i} itemTitle={foo.fetchProducts()}/>
          )}

        </SimpleGrid>

      </div>
      
    );
}

export default SearchFunc;