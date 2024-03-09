import { SimpleGrid, Text } from "@chakra-ui/react";
import Products from "./Products";
import { ProductsRepositoryImpl } from "../ProductsRepo/ProductsRepo";
import React, { useState, useEffect } from "react";
import Product from '../domain/Product'

function ProductsGrid(props: any) {
  const [amountProduct, setAmountProduct] = useState(0);

  const [productArr, setProductArr] = useState(Array<Product>);
  let foo: ProductsRepositoryImpl = new ProductsRepositoryImpl();

  const getProducts = async () => {
    let myProducts = await foo.fetchProducts();
    let temp = []
    if (props.query !== ''){
      for (let i = 0; i < myProducts.length; i++){
        if (myProducts[i].title.toUpperCase().includes(props.query.toUpperCase())){
          temp.push(myProducts[i]);
        }
      }
      console.log(temp);
    }
    else{
      temp = myProducts;
    }
    setProductArr(temp);
  };


  useEffect(() => {
    getProducts();
  }, [props.query]);
  

  return (
      <SimpleGrid columns={[4, null, 5]} spacing={3}>
        {[...Array(productArr.length)].map((x, i) => (
          <Products itemInfo={foo.fetchProduct(productArr[i].productId)} />
        ))}
      </SimpleGrid>
  );
}

export default ProductsGrid;
