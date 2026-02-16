import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import axios from '../../utils/axios'
import { useSelector } from "react-redux";
const RatingModal = ({isOpen,onOpen,onClose}) => {
 const userData = useSelector((state) => state.auth.data);
  const [rating, setRating] = useState(0);
  const [ratingComment,setRatingComment] = useState('')
  const [feedback,setFeedback] = useState('')
  const [checkRating,setCheckRating] = useState(false)
  const insertModalData = async ()=>{
    const obj = {
      user_id:userData?.user?.KOD,
      ur:userData?.user?.NUR,
      count:rating,
      comment:ratingComment,
      is_check:true,
      pipfull:`${userData?.user?.PRIZV} ${userData?.user?.NAME} ${userData?.user?.POBAT}`,
    }

 
    
    try {
  if (rating !== 0) {
    const data = await axios.post('/modals/get-check',obj )
     
    if (data.data.command === 'UPDATE' && data.data.rows[0].is_check === true) {
      localStorage.setItem('vote', 1)

      setCheckRating(false)
      setFeedback('Дякуємо за ваш відгук.')
setTimeout(()=>{
setFeedback('')
setRating(0)
onClose(); // Закрити модальне вікно після підтвердження
},2000)
    }
  }else {
    setCheckRating(true)
  }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleRatingSubmit = async () => {
 try {

  const data = await insertModalData()

 } catch (error) {
  
 }
  };
console.log(rating);

  return (
    <>
 

      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Оцініть наш сервіс</ModalHeader>
       
          <ModalBody>
           <Textarea cols={10} resize={'none'}  value={ratingComment} onChange={e => setRatingComment(e.target.value)}/>
            <VStack spacing={4}>
              <Text color={checkRating ? "red" : "white"}>Будь ласка, оберіть кількість зірок:</Text>
              
              {!feedback ?       <Rating
                emptySymbol={<FaStar size={30} color="#ddd" />}
                fullSymbol={<FaStar size={30} color="#ffc107" />}
                initialRating={rating}
                onChange={(value) => setRating(value)}
              /> : <Text color={'green'}>{feedback}</Text> }
       


            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRatingSubmit}>
              Підтвердити
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RatingModal;
