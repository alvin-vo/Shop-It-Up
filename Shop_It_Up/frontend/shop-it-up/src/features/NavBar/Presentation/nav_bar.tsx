import { Image, Heading } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { PiListPlusLight, PiUserList, PiShoppingCart } from "react-icons/pi";
import DropDownMenu from "./drop_down_menu";
import SearchBar from "./search_bar";
import {
  Box,
  Flex,
  Stack,
  Grid,
  Wrap,
  AspectRatio,
  Center,
  Spacer,
} from "@chakra-ui/layout";

function NavBar(props: any){
  return (
    <Flex
      h="75"
      bg="blue.300"
      minWidth="max-content"
      alignItems="center"
      gap="3"
    >
      <Box w="90px" h="75">
        <IconButton
          aria-label="logo"
          icon={<Image src={" ./images/transparent-logo.png"} alt="Logo" />}
          style={{ width: "90", height: "75", display: "block" }}
          variant="ghost"
          size="auto"
          _hover={{ bg: "##FFFF" }}
        />
      </Box>

      <Box w="350px">
        <Heading size="lg"> Welcome to Shop-It-Up! </Heading>
      </Box>

      <Spacer />

      <Box w="700px" h="10" bg="white">
        <SearchBar onQuery={props.onQuery}/>
      </Box>

      <Spacer />

      <Flex gap="2">
        <Box w="50px" h="10">
          <IconButton
            aria-label="Add Listing"
            icon={<PiListPlusLight />}
            variant="ghost"
            fontSize={30}
          />
        </Box>
        <Box w="50px" h="10">
          <IconButton
            aria-label="Personal List"
            icon={<PiUserList />}
            variant="ghost"
            fontSize={30}
          />
        </Box>

        <Box w="50px" h="10">
          <IconButton
            aria-label="Cart Button"
            icon={<PiShoppingCart />}
            variant="ghost"
            fontSize={30}
          />
        </Box>

        <Box w="50px" h="10">
          <DropDownMenu />
        </Box>

        <Box w="5px" h="10" />
      </Flex>
    </Flex>
  );
};

export default NavBar;