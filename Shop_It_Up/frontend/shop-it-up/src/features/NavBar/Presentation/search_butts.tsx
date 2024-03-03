import { Input, Button, Flex, Spacer} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';


function SearchButts(props:any){

    const [productRec, setProductRec] = useState({
        title: 'Loading...'
    })

    const getProductRec = async() => {
        let myRecs = await props.itemInfo;
        setProductRec(myRecs[props.itemNum]);
    }

    getProductRec();
    
    return (
        
        <Button width={700} height={10}>
            {productRec.title}
        </Button>

    );
}

export default SearchButts;