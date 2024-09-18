import { useToast } from '@chakra-ui/react';
// const statuses = ['success', 'error', 'warning', 'info']
const useCustomToast = () => {
  const toast = useToast();

  const showToast = (title,status, description, duration = 3000) => {
    toast({
      title,
      status,
      description,
      duration,
      isClosable: true,
    });
  };

  return showToast;
};

export default useCustomToast;