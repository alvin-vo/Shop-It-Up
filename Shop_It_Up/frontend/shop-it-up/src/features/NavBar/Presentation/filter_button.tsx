import { Button, useDisclosure, Stack } from "@chakra-ui/react";
import { TbFilterSearch } from "react-icons/tb";
import { IconButton } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Filter Button"
        icon={<TbFilterSearch />}
        fontSize={20}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Stack spacing={[3, 4]} direction={['column', 'row']}> */}
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
                <Checkbox>category</Checkbox>
            {/* </Stack> */}

          </ModalBody>

          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="blue">
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
