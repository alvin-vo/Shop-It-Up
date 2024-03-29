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
    let finaltemp = []
    if (props.query !== ''){
      for (let i = 0; i < myProducts.length; i++){
        if (myProducts[i].title.toUpperCase().includes(props.query.toUpperCase())){
          temp.push(myProducts[i]);
        }
      }
      console.log(temp);
      if (props.filtPrice1 !== -1 && props.filtPrice2 !== 0) {
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].price > props.filtPrice1 && temp[i].price < props.filtPrice2) {
            finaltemp.push(temp[i]);
          }
        }
        console.log("finalTemp", finaltemp)
        setProductArr(finaltemp);
      }
      else {
        setProductArr(temp);
      }
    }
    else if (props.query == '') {
      if (props.filtPrice1 !== -1 && props.filtPrice2 !== 0) {
        for (let i = 0; i < myProducts.length; i++) {
          if (myProducts[i].price > props.filtPrice1 && myProducts[i].price < props.filtPrice2) {
            temp.push(myProducts[i]);
          }
        }
        setProductArr(temp);
      }
      else{
        temp = myProducts;
        setProductArr(temp);
      }
    }
    else{
      temp = myProducts;
      setProductArr(temp);
    }
  };


  useEffect(() => {
    getProducts();
  }, [props.query, props.filtPrice1, props.filtPrice2]);




  return (
      <SimpleGrid columns={[4, null, 5]} spacing={3}>
        {[...Array(productArr.length)].map((x, i) => (
          <Products productId={productArr[i].productId} itemInfo={foo.fetchProduct(productArr[i].productId)} />
        ))}
      </SimpleGrid>
  );
}

export default ProductsGrid;
