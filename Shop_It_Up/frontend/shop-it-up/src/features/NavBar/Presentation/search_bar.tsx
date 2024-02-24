import { Input, Flex, ButtonGroup, Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import FilterFunc from "./filter_button";
import SearchFunc from "./search_func";
const SearchBar = () => {

  return (
    <Flex>
      <Box>
        <ButtonGroup isAttached variant="ghost" _hover={{ bg: "##FFFF" }}>
          <FilterFunc/>
          <SearchFunc/>
          <IconButton aria-label="Search Button" icon={<SearchIcon />} />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default SearchBar;