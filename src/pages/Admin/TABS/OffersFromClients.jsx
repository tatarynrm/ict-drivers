import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios'; // Використовуємо axios для запитів (якщо потрібно)
import { Box, Heading, Text, Stack, Flex, Badge } from '@chakra-ui/react';
import { MdOutlineStarOutline } from "react-icons/md";
const OffersFromClients = () => {
  const [reviews, setReviews] = useState([]);
console.log('REVIEWS',reviews);

const getAllModals = async ()=>{
    try {
        const {data} = await axios.get('/modals/get-all');
        console.log(data);
        setReviews(data)
        
    } catch (error) {
        console.log(error);
        
    }
}

  // Завантажуємо дані з серверу
  useEffect(() => {
    getAllModals()
  }, []);

  return (
    <Box padding="20px">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="20px">
        Відгуки
      </Heading>
      <Stack spacing={4}>
        {reviews?.map((review, index) => (
          <Box
            key={index}
            borderWidth={1}
            borderRadius="lg"
            padding="15px"
            shadow="md"
           
        
          >
            <Heading as="h3" size="lg">
              {review.ur}
            </Heading>
            <Text fontSize="lg" color="gray.500">{review.pipfull}</Text>
       
            {review.count && (
        <Text display={'flex'} alignItems={'center'} fontSize="xl" color="yellow.400">
          {/* Повторюємо зірочки стільки разів, скільки вказано в count */}
          {Array.from({ length: review.count }).map((_, index) => (
            <MdOutlineStarOutline key={index} size={24} />
          ))}
        </Text>
      )}
    
               
               {review.comment && (
                <Text display={'flex'} alignItems={'center'} fontSize="xl" color="yellow.400">
                    {review.comment}
                </Text>
              )}
     
          
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default OffersFromClients;
