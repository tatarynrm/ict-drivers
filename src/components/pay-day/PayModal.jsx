import { Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import TransportationItem from '../transportation/TransportationItem'
import CargoItem from '../transportation/CargoItem'

const PayModal = ({ isOpen, onOpen, onClose,payInfo }) => {

  return (
    <>


    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Оплата за перевезення</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
        {payInfo && payInfo.map((item,idx)=>{
            return <React.Fragment key={idx}>
                <Divider/>
                <CargoItem  item={item}/>
            </React.Fragment>
        })}
      
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Закрити
          </Button>
       
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default PayModal