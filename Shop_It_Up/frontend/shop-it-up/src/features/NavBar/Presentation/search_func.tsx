import { Button, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ProductsRepositoryImpl } from '../../Products/ProductsRepo/ProductsRepo';
import SearchButts from "./search_butts";

export interface Product {
  productId: string;
  title: string;
}


const SearchFunc = () => {  

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRec, setFilteredRec] = useState<Product[]>([]); 
    const [numRec, setNumRec] = useState<number>(0); 
    const [inputFocused, setInputFocused] = useState(false);
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
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
        />
        {inputFocused && (
          <SimpleGrid columns={1} spacing={0}>

            {[...Array(numRec)].map((x,i) =>
                <SearchButts key={i} itemNum={i} itemInfo={filteredRec}/>
            )}

          </SimpleGrid>
        )}

      </div>
      
    );
}

export default SearchFunc;