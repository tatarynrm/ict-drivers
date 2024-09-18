import { InfoIcon, InfoOutlineIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, StackDivider, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import moment from "moment";
import "moment/locale/uk";
import React, { useState } from 'react'
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineDocumentMinus } from "react-icons/hi2"
import { CiChat1 } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiMoneygram } from "react-icons/si";
import { IoMdOpen } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { GrDocument } from "react-icons/gr";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";

import axios from '../../utils/axios'
import { useSelector } from 'react-redux';
const PayItem = ({ item, onOpen, setPayInfo }) => {
    const userData = useSelector((state) => state.auth.data);

    const getFullInfo = async (date) => {

        try {
            const data = await axios.post('/transportation-info', { KOD: userData?.user?.KOD_UR, DATE: date })

            console.log(data);
            setPayInfo(data.data)
            onOpen()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card padding={'6px 6px 20px 6px'} position={'relative'}>

            <CardHeader padding={'2px'}>
                <Heading color={'	#FFE5B4'} size='xs'>{item.LINE1}</Heading>
            </CardHeader>
            <CardBody padding={'1px'}  >
                <Stack display={'flex'} flexDirection={['column', 'column', 'row']} alignItems={'center'} spacing='4'>

                    <Box width={'30%'}>

                        <Text size='xs'>
                            {item.date}
                        </Text>
                        <Tooltip label="Дата оплати" aria-label='A tooltip'>
                            <InfoOutlineIcon />
                        </Tooltip>


                    </Box>


                    <Box display={'flex'} gap={'10px'} width={['100%', '50%', '30%']}>

                        {item.objects?.map((item, idx) => {
                            return <Box width={'100%'} display={'flex'} flexDirection={'column'} key={idx}>
                                <Heading size={'sm'}>{item.NFIRMA}   </Heading>
                                <Text color={'#FFE5B4'}>{item.KILZAY > 1 && item.KILZAY} {item.KILZAY > 1 && 'перевезень'}</Text>
                                <Text color={'green.200'}>{item.BORG} {item.IDV}</Text>

                            </Box>
                        })}

                    </Box>

                    <Box>

                        {item.objects?.map((item, idx) => {
                            return <Text key={idx}>Рах. № {item.NUMRAHP} від {moment(item.DATRAHP).format('L')} ({item.NFIRMA})</Text>
                        })}
                    </Box>

                </Stack>

            </CardBody>
            <CardFooter padding={'2px'} width={'100%'} display={'flex'} justifyContent={'space-between'} >
                <Box></Box>
                <IoMdOpen onClick={() => getFullInfo(item.date)} color='#FFE5B4' cursor={'pointer'} fontSize={30} />
            </CardFooter>
        </Card>
    )
}

export default PayItem