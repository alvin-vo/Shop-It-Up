import { Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ProductsRepositoryImpl } from '../../Products/ProductsRepo/ProductsRepo';

function SearchFunc(props: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            // Assuming props.itemInfo is a Promise
            let myProducts = await props.itemInfo;
            setSearchResult(myProducts[props.category]);
        };
        getProducts();
    }, [props.itemInfo, props.category]); // Re-run when these props change

    return (
        <>
            <Input
                placeholder="Search Shop-It-Up"
                htmlSize={80}
                borderColor={"black"}
                variant={"ghost"}
                onChange={event => setSearchTerm(event.target.value)}
            />
            <Button width={700} height={10}>
                {searchResult}
            </Button>
        </>
    );
}

export default SearchFunc;
