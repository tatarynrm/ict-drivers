import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, StackDivider, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import moment from 'moment';
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

import "moment/locale/uk";
import CargoFullInfo from './CargoFullInfo';
import axios from '../../utils/axios'
const CargoItem = ({ item,idx,listType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fullInfo, setFullInfo] = useState([])

  const getFullInfo = async (kod) => {
    try {
      const {data} = await axios.post('/transportation-full-info', { KOD: kod });

setFullInfo(data[0])
    } catch (error) {
      console.log(error);
    }
  }

  const showInfoCard = (item) => {
    onOpen()
    getFullInfo(item.KOD)
  }


  
  return (
    <>
      <Card backgroundColor={    item.BORGP <= 0 ? 'green.700' : 'gray.700'  } idx={idx}  padding={'6px 6px 20px 6px'} position={'relative'}>
        <Box position={'absolute'} bottom={'4'} display={'flex'} gap={'10px'}>

          <Tooltip fontFamily={'fantasy'} label={item.DATDOCP === null ? 'Документи ще не надійшли' : `Документи отримано ${moment(item.DATDOCP).format('LL')}`} aria-label='A tooltip'>
            <Box >
           {item.DATDOCP  === null ? <HiOutlineDocumentMinus  fontSize={24} color={'rgb(65, 154, 232)'} /> : <HiOutlineDocumentCheck fontSize={24}  color='#90EE90' />  }   
            </Box>

          </Tooltip>


          {item.PERNEKOMPLEKT &&
            <Tooltip fontFamily={'fantasy'} label={item.PERNEKOMPLEKT} aria-label='A tooltip'>
              <Box >
                <HiOutlineDocumentMagnifyingGlass fontSize={24} color={'rgb(214, 88, 103)'} />
              </Box>
            </Tooltip>
          }
          {item.PERAKTPRET &&
            <Tooltip fontFamily={'fantasy'} label={item.PERAKTPRET} aria-label='A tooltip'>
              <Box >
                <CiChat1 fontSize={24} color={'red'} />
              </Box>

            </Tooltip>
          }
          {/* {item.DATPOPLPLAN &&
            <Tooltip fontFamily={'fantasy'} label={item.DATPOPLPLAN === null ? '' : `Планова дата оплати ${moment(item.DATPOPLPLAN).format('LL')}`} aria-label='A tooltip'>
              <Box >
                <BsCashCoin fontSize={20} color={'green'} />
              </Box>

            </Tooltip>
          } */}
          {item.DATPOPLFAKT &&
            <Tooltip fontFamily={'fantasy'} label={item.DATPOPLPLAN === null ? '' : `Оплачено ${moment(item.DATPOPLFAKT).format('LL')}`} aria-label='A tooltip'>
              <Box >
                <SiMoneygram fontSize={20} color={'green'} />
              </Box>

            </Tooltip>
          }

{item.DATPOPLPLAN && 

<Tooltip fontFamily={'fantasy'} label={`Планова дата оплати ${moment(item.DATPOPLPLAN).format('DD/MM')}`}>
<Box display={'flex'} alignItems={'center'} > <MdOutlineAttachMoney fontSize={18}/> <Text>{`${moment(item.DATPOPLPLAN).format('DD/MM')}`}</Text> </Box>
</Tooltip>
}
        </Box>
        <CardHeader padding={'2px'}>
          <Heading color={'	#FFE5B4'} size='xs'>{item.LINE1}</Heading>
        </CardHeader>
        <CardBody padding={'1px'}>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box textAlign={'left'} alignItems={'center'} width={'100%'} display={listType === 'list' && 'flex'} justifyContent={ listType === 'list' && 'space-around'} >
              <Text size='xs'>
                {item.LINE2}
              </Text>
              <Text  pt='1' fontSize='sm'>
                {item.LINE3}
              </Text>
              <Text  color={'red.400'} pt='1' fontSize='sm'>
               {item.BORGP > 0 ?  `${item.BORGP} ${item.IDV}` :`${item.PERSUMA} - Опл(${moment(item.DATPOPLFAKT).format('LL')})` }
              </Text>
            </Box>

          </Stack>
        </CardBody>
        <CardFooter padding={'2px'} width={'100%'} display={'flex'} justifyContent={'space-between'} >
<Box></Box>
          <IoMdOpen color='#FFE5B4' cursor={'pointer'} onClick={e => showInfoCard(item)} fontSize={30} />


        </CardFooter>
      </Card>

      <CargoFullInfo fullInfo={fullInfo} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default CargoItem