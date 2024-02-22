import { Input, Flex, ButtonGroup, Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { TbFilterSearch } from "react-icons/tb";

const SearchBar = () => {
  return (
    <Flex>
      <Box>
        <ButtonGroup isAttached variant="ghost" _hover={{ bg: "##FFFF" }}>
          <IconButton
            aria-label="Filter Button"
            icon={<TbFilterSearch />}
            fontSize={20}
          />
          <Input
            placeholder="Search Shop-It-Up"
            htmlSize={80}
            borderColor={"black"}
            variant={"ghost"}
          />
          <IconButton aria-label="Search Button" icon={<SearchIcon />} />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default SearchBar;
