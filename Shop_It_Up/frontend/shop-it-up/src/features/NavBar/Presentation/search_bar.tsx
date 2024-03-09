import {
  Input,
  Flex,
  ButtonGroup,
  Box,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import FilterFunc from "./filter_button";
import SearchFunc from "./search_func";
import { useState, useEffect } from "react";
import { ProductsRepositoryImpl } from "../../Products/ProductsRepo/ProductsRepo";

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroup,  
} from "@choc-ui/chakra-autocomplete";

const SearchBar = () => {
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
      <FilterFunc />

      <Flex w="100%" h="100%" bg={"white"} justifyContent="center">
        <AutoComplete rollNavigation>
          <AutoCompleteInput
            variant="outline"
            placeholder="Search Shop-It-Up"
            autoFocus
          />
          <AutoCompleteList>
            {options.map((option, oid) => (
              <AutoCompleteItem
                key={`option-${oid}`}
                value={option}
                textTransform="capitalize"
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
