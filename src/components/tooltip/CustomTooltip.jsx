import { InfoIcon } from '@chakra-ui/icons';
import { Box, Tooltip } from '@chakra-ui/react';
import React from 'react'


const CustomTooltip = ({ label, children, ...props }) => {
    return (

        
        
     
      <Tooltip label={label} {...props}>
       
        <Box  as="span">{children}  </Box>
        
      </Tooltip>
  
    );
  };

export default CustomTooltip