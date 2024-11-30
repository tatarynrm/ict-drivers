import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux';
import { Box, Flex, Stack } from '@chakra-ui/react';

import moment from "moment/moment";
import "moment/locale/uk";
import { EmailIcon } from '@chakra-ui/icons';
const RequestDocs = () => {
    const userData = useSelector((state) => state.auth.data);
    const [documents,setDocuments] = useState([])

    const getRequestDocs = async ()=>{
     
        try {
            const data = await axios.post('/avr',{KOD:userData?.user?.KOD_UR})

        if (data.status === 200) {
            setDocuments(data.data)
        }
         
        } catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{
    getRequestDocs()
},[userData])



  return (
    <Stack
    width={["100%", "100%", "90%", "90%"]}
    margin={"0 auto"}
    marginTop={"20px"}
    display={"flex"}
    flexDirection={"column"}
    padding={['10px']}
    >


<Flex  gap={'10px'} flexDir={'column'}>
{documents && documents.sort((a,b) => new Date(b.DAT) - new Date(a.DAT)).filter(item => item.DOCNUM !== null).map((item,idx)=>{
    return <Flex margin={'0 auto'} width={['90%','100%']} flexDir={['column','column','column','row']} position={'relative'} gap={'10px'} border={'1px solid white'} padding={'10px'} key={idx}>
<Box width={'200px'}>{moment(item.DAT).format('LL')}</Box>
<Box>{item.DOCNUM}</Box>
<Box position={'absolute'} top={'0px'} right={'10px'}><EmailIcon fontSize={'40px'}/></Box>

    </Flex>
})}
</Flex>





  </Stack>
  )
}

export default RequestDocs