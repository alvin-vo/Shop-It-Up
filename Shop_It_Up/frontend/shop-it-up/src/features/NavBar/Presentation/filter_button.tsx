import { Button, useDisclosure, Stack } from "@chakra-ui/react";
import { TbFilterSearch } from "react-icons/tb";
import { IconButton } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function BasicUsage(props: any) {
  console.log("FB Props: ", props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, "");
  const [value1, setValue1] = useState("0.00");
  const [value2, setValue2] = useState("0.00");
  const [numVal1, setNumVal1] = useState(0);
  const [numVal2, setNumVal2] = useState(0);

  const handleInputChange1 = (valueString: string, valueNumber: number) => {
    const parsedValue = parse(valueString);
    setValue1(parsedValue);
    setNumVal1(valueNumber);
    console.log("val1:", numVal1, typeof numVal1);
  };
  const handleInputChange2 = (valueString: string, valueNumber: number) => {
    const parsedValue = parse(valueString);
    setValue2(parsedValue);
    setNumVal2(valueNumber);
    console.log("val2", numVal2, typeof numVal2);
  };
  const reset = () => {
    setValue1("0.00");
    setValue2("0.00");
    setNumVal1(0.0);
    setNumVal2(0.0);
  };
  function handleClick(e: any) {
    if (e) {
      props.handleFilterButtonClick(numVal1, numVal2);
    }
    onClose();
  }

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
          <ModalHeader>Filter Search by Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            From:
            <NumberInput
              precision={2}
              onChange={handleInputChange1}
              value={format(value1)}
              inputMode={"numeric"}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            To:
            <NumberInput
              precision={2}
              onChange={handleInputChange2}
              value={format(value2)}
              inputMode={"numeric"}
              min={numVal1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" mr={3} colorScheme="red" onClick={reset}>
              Reset
            </Button>
            <Button variant="solid" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="blue" onClick={handleClick}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
