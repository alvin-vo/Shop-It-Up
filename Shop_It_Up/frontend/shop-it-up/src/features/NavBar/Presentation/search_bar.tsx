import {
  Flex,
} from "@chakra-ui/react";
import FilterFunc from "./filter_button";
import { useState, useEffect } from "react";
import { ProductsRepositoryImpl } from "../../Products/ProductsRepo/ProductsRepo";

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

function SearchBar(props:any){
  //console.log("SB Props: ", props);
  function handleInput(e: any){
    if (e){
      props.onQuery(e.target.value)
    }
    
  }

  const [options, setOptions] = useState(Array<string>);
  let foo: ProductsRepositoryImpl = new ProductsRepositoryImpl();

  const getOptions = async () => {
    let myProducts = await foo.fetchProducts();
    let temp = [];
    for (let i = 0; i < myProducts.length; i++) {
      temp.push(myProducts[i].title);
    }
    setOptions(temp);
  };

  useEffect(() => {
    getOptions();
  }, [])

  return (
    <Flex direction={"row"}>
      <FilterFunc handleFilterButtonClick={props.handleFilterButtonClick}/>

      <Flex w="100%" h="100%" bg={"white"} justifyContent="center">
        <AutoComplete rollNavigation>
          <AutoCompleteInput
            onChange={handleInput}
            onKeyDown={handleInput}
            variant="outline"
            placeholder="Search Shop-It-Up"
            autoFocus
            rounded='none'
          />
          <AutoCompleteList>
            {options.map((option, oid) => (
              <AutoCompleteItem
                key={`option-${oid}`}
                value={option}
                textTransform="capitalize"
                rounded='none'
              >
                {option}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </Flex>
    </Flex>
  );
};

export default SearchBar;
