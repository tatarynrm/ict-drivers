import { Box, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';
import PayItem from '../../components/pay-day/PayItem';
import PayModal from '../../components/pay-day/PayModal';
import toTimestamp from '../../helpers/date';
import parseDate from '../../helpers/parseDate';
import useVisitRecord from '../../hooks/useVisitRecord';
const PayDay = () => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.auth.data);
  const { isOpen, onOpen, onClose } = useDisclosure()


  const [payInfo,setPayInfo] = useState([])
  const getPayDays = async () => {
    try {
      const data = await axios.post('/pay', { KOD: userData?.user?.KOD_UR })
   
      if (data) {
        setData(data.data.dataArray)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (userData) {
      getPayDays()
     
    }
  }, [userData])




  
  return (
    <Stack
      width={["100%", "100%", "90%", "90%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={['column']}
      padding={['10px']}
      >
      {data && data.filter(item => item).sort((a,b) => parseDate(a.date) - parseDate(b.date)).map((item, idx) => {
        return <PayItem setPayInfo={setPayInfo} onOpen={onOpen} key={idx} item={item} />
      })}


{isOpen && <PayModal payInfo={payInfo} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>}
 


    </Stack>
  )
}

export default PayDay