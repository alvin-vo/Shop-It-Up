import { Card, CardBody, Image, Stack, Heading, Text, Button, Flex, Spacer} from '@chakra-ui/react';
import React, { useState } from 'react';

function Product(props:any){
    const [product, setProduct] = useState({
        title: 'Loading...',
        image: 'None',
        description: 'Loading...',
        price: 500,
        categories: 'Loading...'
    })


    const getProducts = async () => {
        let myProducts = await props.itemInfo;
        setProduct(myProducts[props.itemNum]);
       }

    getProducts()

    return (
        <Card maxW='sm' boxShadow='md' border='1px' borderColor='gray.200'>
                <CardBody>
                    <Heading size='md' pb='3'>{product.title}</Heading>
                    <Image
                        src={product.image}
                        borderRadius='lg'
                        boxSize='sm'
                    />
                    <Stack mt='6' spacing='3'>
                        <Text>
                            {product.description}
                        </Text>

                        <Flex>
                            <Text color='blue.600' fontSize='2xl'>
                                {'$' + product.price.toString()}
                            </Text>
                            <Spacer></Spacer>
                            <Button variant='solid' colorScheme='blue'>
                                Add to cart
                            </Button>
                        </Flex>

                    </Stack>
                </CardBody>

            </Card>
    );

    }




export default Product;
