import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ProductsRepositoryImpl } from '../features/Products/ProductsRepo/ProductsRepo';


function SearchFunc(props:any) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState('')
    let foo:ProductsRepositoryImpl = new ProductsRepositoryImpl()

    const getProducts = async () => {
        let myProducts = await props.itemInfo;
        setSearchResult(myProducts[props.category]);
       }

    getProducts()

    return (
        <Input
            placeholder="Search Shop-It-Up"
            htmlSize={80}
            borderColor={"black"}
            variant={"ghost"}
            onChange={event => {setSearchTerm(event.target.value)}}
        />
        
        {}

        <Button width={700} height={10}>
            {val.searchResult}
        </Button>
    );
}

export default SearchFunc