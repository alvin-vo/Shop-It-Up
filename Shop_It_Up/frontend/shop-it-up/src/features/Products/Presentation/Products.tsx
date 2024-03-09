import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Image,
    Heading,
    Text,
    Button,
    Flex,
    Spacer,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

function Product(props: any) {
    const toast = useToast();

    const [product, setProduct] = useState({
        title: 'Loading...',
        image: 'None',
        description: 'Loading...',
        price: 500,
        category: 'Loading...',
        productId: ''
    })


    const getProducts = async () => {
        let myProduct = await props.itemInfo;
        setProduct(myProduct);
    }

    getProducts()

    return (
        <Card maxW='sm' boxShadow='md' border='1px' borderColor='gray.200'>
            <CardHeader>
                <Heading size='md' pb='3'>{product.title}</Heading>
            </CardHeader>
            <CardBody>

                <Popover>
                    <PopoverTrigger>
                        <Image
                            src={product.image}
                            borderRadius='lg'
                            boxSize='100%'
                            objectFit='scale-down'
                            aspectRatio={1}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>
                            <Text as='b'>
                                Description
                            </Text>
                        </PopoverHeader>
                        <PopoverBody>{product.description}</PopoverBody>
                    </PopoverContent>
                </Popover>


            </CardBody>

            <CardFooter>
                    <Flex w='100%'>
                        <Text color='blue.600' fontSize='2xl'>
                            {'$' + product.price.toString()}
                        </Text>
                        <Spacer/>
                        <Button variant='solid' colorScheme='blue' onMouseDown={() => {
                            async function handleSubmit(): Promise<unknown> {
                                const request = await axios.post(`/api/carts/addProduct/${product.productId}`, {
                                    headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'

                                    }
                                });
                                    
                                console.log(request);
                                return request;
                            }

                            toast.promise(handleSubmit(), {
                                success: { title: 'Response from server', description: 'Looks great' },
                                error: { title: 'Disconnected from server', description: 'Something wrong' },
                                loading: { title: 'Loading', description: 'Please wait' },
                            })
                        }}>
                            Add to cart
                        </Button>
                    </Flex>


            </CardFooter>

        </Card>
    );

}




export default Product;
