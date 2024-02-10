import React, { Component } from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Flex, Spacer, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react'


function Product(){
    const product = {
        title: 'Living room Sofa',
        imageSrc: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        imageAlt: 'Green double couch with wooden legs',
        description: 'This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.',
        price: 500,
        categories: ['home', 'furniture', 'teal']
    }


    return (
        <Card maxW='sm' boxShadow='md' border='1px' borderColor='gray.200'>
                <CardBody>
                    <Heading size='md' pb='3'>{product.title}</Heading>
                    <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        borderRadius='lg'
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


                <CardFooter>
                    <Accordion allowToggle w='100%'>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        Categories
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {product.categories.join(", ")}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </CardFooter>

            </Card>
    );

    }




export default Product;
