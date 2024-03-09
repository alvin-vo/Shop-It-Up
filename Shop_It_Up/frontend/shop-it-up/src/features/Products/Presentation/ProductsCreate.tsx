import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    FormControl,
    FormLabel,
    NumberInputField,
    NumberInput,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    Input,
    Button,
    HStack,
    VStack,
    Flex,
    Text,
    Divider,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react';

import axios from 'axios';

import { ProductsRepositoryImpl } from '../ProductsRepo/ProductsRepo'

function ProductsCreate(props: any) {
    const toast = useToast();
    const formik = useFormik({
        initialValues: {
            productId: '',
            sellerId: '',
            title: '',
            quantity: 1,
            description: '',
            price: 1,
            img: ''
        },
        onSubmit: () => {
            //using my own submit function to get toast functionality
        }
    });

    const isErrorTitle = formik.values.title === '';
    const isErrorDescription = formik.values.description === '';
    const isErrorImage = formik.values.img === '';


    return (
        <Flex h='100vh' w='100vw' align='center' justify='center'>
            <Box borderWidth='1px' borderRadius='3xl' borderColor='gray.300' p='10' boxShadow='dark-lg'>

                <Flex w='100%' justify='center' mb={5}>
                    <Text fontSize='3xl' as='b'>Create Listing</Text>
                </Flex>

                <Divider variant='dashed' />

                <form onSubmit={formik.handleSubmit}>
                    <VStack mt={5} spacing={5}>
                        <FormControl isInvalid={isErrorTitle}>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                placeholder='Title for your listing'

                            />
                            <FormErrorMessage>Title is required.</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={isErrorDescription}>
                            <FormLabel>Description</FormLabel>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                placeholder='A short description of your item'
                            />

                            <FormErrorMessage>Description is required.</FormErrorMessage>
                        </FormControl>

                        <HStack>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <NumberInput
                                    max={100000}
                                    min={0}
                                    id="quantity"
                                    inputMode='numeric'
                                    onChange={v => {
                                        formik.setFieldValue("price", v)
                                    }}
                                    value={"$" + formik.values.price}
                                    isDisabled={false}
                                    variant='filled'>
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Quantity</FormLabel>

                                <NumberInput
                                    max={999}
                                    min={1}
                                    id="quantity"
                                    inputMode='decimal'
                                    onChange={v => {
                                        formik.setFieldValue("quantity", v)
                                    }}
                                    value={formik.values.quantity}
                                    isDisabled={false}
                                    variant='filled'>
                                    <NumberInputField />

                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>

                            </FormControl>

                        </HStack>

                        <FormControl isInvalid={isErrorImage}>
                            <FormLabel>Image URL</FormLabel>
                            <Input
                                id="img"
                                name="img"
                                type="img"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={formik.values.img}
                                placeholder='Insert a URL for a image of the item'
                            />
                            <FormErrorMessage>Image URL is required.</FormErrorMessage>
                        </FormControl>

                        <Button type="button" colorScheme="blue" px={10} mt={5} onMouseDown={() => {
                            async function handleSubmit(): Promise<unknown> {
                                let foo:ProductsRepositoryImpl = new ProductsRepositoryImpl()
                                let myProducts = await foo.fetchProducts();
                                formik.values.productId = (myProducts.length + 1).toString();
                                formik.values.sellerId = uuidv4();
                                const request = await axios.post('/api/products/create', formik.values)
                                console.log(request)
                                return request;

                            }

                            toast.promise(handleSubmit(), {
                                success: { title: 'Response from server', description: 'Looks great' },
                                error: { title: 'Disconnected from server', description: 'Something wrong' },
                                loading: { title: 'Loading', description: 'Please wait' },
                            })
                        }}>
                            Submit
                        </Button>
                    </VStack>
                </form>
            </Box >
        </Flex>
    );
}

export default ProductsCreate;