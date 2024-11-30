import { Button, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { FaAngellist } from "react-icons/fa";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import OfferForm from "../forms/OfferForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const OfferDialog = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const token = localStorage.getItem('token');
  const user = useSelector(state => state.auth.data)

  
  useEffect(()=>{

  },[user])

  if (!user)  return null;
   

    return (
        <Stack>
          <Button onClick={onOpen}  colorScheme="white"
            variant="outline" leftIcon={<FaAngellist/>}>
          Пропозиції
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize={14} color={"green.200"}>
                Пропозиції щодо покращення сервісу
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <OfferForm onClose={onClose} />
              </ModalBody>
    
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      );


  }
 


export default OfferDialog;
