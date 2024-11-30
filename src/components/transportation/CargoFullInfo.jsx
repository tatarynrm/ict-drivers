import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import axios from '../../utils/axios'
import moment from 'moment';
import "moment/locale/uk";
import { FcAdvance, FcDocument } from "react-icons/fc";
import { FcMultipleInputs } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FcOvertime } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { HiOutlineDocumentRemove } from "react-icons/hi";
const CargoFullInfo = ({ onClose, isOpen, fullInfo }) => {
  const item = fullInfo;


  return (
    <>

      {item.KOD ? <Drawer onClose={onClose} isOpen={isOpen} size={'xl'} placement='left'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={24} color={'green.300'}>{`Заявка № ${item.NUMDOCPRINT} згідно з договором ${item.DOGINFO}`}</DrawerHeader>
          <Divider />
          <DrawerBody>
            <Box fontSize={'20px'} display={'flex'} flexDir={'column'} gap={'10px'}>


              <Flex alignItems={'center'} gap={'4px'}>
                <FcAdvance size={30} />
                <Text> {item.MARSHINFO}</Text>
              </Flex>



              <Flex alignItems={'center'} gap={'4px'}>
                <FcMultipleInputs size={30} />
                <Text>{item.VANTINFO}</Text>

              </Flex>


              <Divider />

              <Flex alignItems={'center'} gap={'4px'}>
                <FcInTransit size={30} />
                <Text>{item.AMPRINFO}</Text>
                <Text>({item.TZTYPE})</Text>

              </Flex>


              <Flex alignItems={'center'} gap={'4px'}>
                <FcManager size={30} />
                <Text>{item.VODINFO}</Text>
              </Flex>






              <Divider />

              <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                <Flex alignItems={'center'} gap={'4px'}>

                  <FcMoneyTransfer size={30} />
                  <Text display={'flex'} gap={'10px'}>
                    Вартість перевезення: <Text>{item.PERSUMA} <span style={{ color: 'greenyellow' }}>{item.VALUTA.toLowerCase()}</span></Text>
                  </Text>

                </Flex>

                {item.DATPOPLPLAN && <Flex alignItems={'center'} gap={'4px'}>
                  <FcOvertime size={30} />
                  <Text display={'flex'} gap={'10px'}>
                    Планова дата оплати {moment(item.DATPOPLPLAN).format('LL')}
                  </Text>
                </Flex>}
              </Box>
            </Box>

            <Box marginTop={'20px'}>
              <Text color={'yellow.200'} fontSize={'20px'}>
                Особливі умови оплати: {item.OPLRULE}
              </Text>

            </Box>

            <Divider marginTop={'20px'} />


            <Flex marginTop={'20px'} gap={'20px'} flexDirection={'column'}>
              <Heading marginBottom={'20px'} size={'lg'}>Додаткова інформація</Heading>

              {item.DATDOCP && <Box display={'flex'} alignItems={'center'} flexDirection={'row'} gap={'10px'}>
                <FcDocument size={30} />
                <Text fontSize={'20px'}>Отримано пакет документів: {moment(item.DATDOCP).format('LL')}</Text>
              </Box>}

              {item.PERNEKOMPLEKT &&
                <Box display={'flex'} alignItems={'center'} flexDirection={'row'} gap={'10px'}>
                  <HiOutlineDocumentRemove fill='red' size={30} />
                  <Text fontSize={'20px'}>Некомплектність документів: {item.PERNEKOMPLEKT}</Text>
                </Box>
              }
              {item.PERAKTPRET &&
                <Box display={'flex'} alignItems={'center'} flexDirection={'row'} gap={'10px'}>
                  <HiOutlineDocumentRemove fill='red' size={30} />
                  <Text fontSize={'20px'}>Помилки АКТ/Рах: {item.PERAKTPRET}</Text>
                </Box>
              }



            </Flex>
            <Divider marginTop={'20px'} />


            <Box marginTop={'20px'}>
              <Heading size={'lg'}>Відповідальний менеджер</Heading>

              <Text marginTop={'20px'} fontSize={'20px'}>{item.MANAGER}</Text>
              <Text marginTop={'20px'} fontSize={'20px'}>Тел. {item.TEL}</Text>
              <Text marginTop={'20px'} fontSize={'20px'}>E-mail {item.EMAIL}</Text>
            </Box>

          </DrawerBody>
          <DrawerFooter>
            {/* <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer> : null}


    </>
  )
}

export default CargoFullInfo