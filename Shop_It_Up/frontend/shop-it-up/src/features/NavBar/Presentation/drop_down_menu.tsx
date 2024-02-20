import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const DropDownMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Avatar name="Dan Man" src="https://bit.ly/broken-link" />}
        variant="ghost"
        fontSize={20}
        isRound
      ></MenuButton>

      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Cart</MenuItem>
          <MenuItem>My Personal Items List</MenuItem>
          <MenuItem>My Account</MenuItem>
          <MenuItem>Settings</MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuItem>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDownMenu;
