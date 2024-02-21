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
    PopoverBody
} from '@chakra-ui/react';
import { useState } from 'react';

function Product(props: any) {
    const [product, setProduct] = useState({
        title: 'Loading...',
        image: 'None',
        description: 'Loading...',
        price: 500,
        category: 'Loading...'
    })


    const getProducts = async () => {
        let myProducts = await props.itemInfo;
        setProduct(myProducts[props.itemNum]);
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
                            boxSize='300px'
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
                        <Button variant='solid' colorScheme='blue'>
                            Add to cart
                        </Button>
                    </Flex>


            </CardFooter>

        </Card>
    );

}




export default Product;
