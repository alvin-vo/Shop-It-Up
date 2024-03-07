import { Input, Button, Flex, Spacer} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';


function SearchButts(props:any){

    const [productRec, setProductRec] = useState({
        title: 'Loading...'
    })

    useEffect(() => {
        const getProductRec = async() => {
            let myRecs = await props.itemInfo;
            setProductRec(myRecs[props.itemNum]);
        }

        getProductRec();
    }, [props.itemInfo, props.itemNum]);
        
    
    return (
        
        <Button width={620} height={10} backgroundColor={'white'} borderRadius={'none'} >
            {productRec.title}
        </Button>

    );
}

export default SearchButts;