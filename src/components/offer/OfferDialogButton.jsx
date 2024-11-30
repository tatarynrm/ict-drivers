import { Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import OfferDialog from './OfferDialog';

const OfferDialogButton = () => {
  return (
    <Menu >
      <MenuButton
        as={IconButton}
        aria-label="Speed Dial"
        icon={<AddIcon />}
        variant="solid"
        borderRadius="full"
        size="lg"
        colorScheme="teal"
        boxShadow="lg"

        position="fixed"
        bottom="4"
        right="4"
    
        shadow="lg"
        _hover={{ boxShadow: 'xl' }}
      />
      <MenuList padding={2}  display={'flex'} flexDirection={'column'} gap={'10px'} backgroundColor={'transparent'}>
        <OfferDialog/>
  
        {/* <MenuItem icon={<FaTwitter />}>Twitter</MenuItem>
        <MenuItem icon={<FaLinkedin />}>LinkedIn</MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default OfferDialogButton;
