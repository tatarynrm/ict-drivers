import { Box, Tag, TagLabel, TagRightIcon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const User = ({item}) => {
const [hidePassword,setHidePassword] = useState(true)
    
  return (
    <Box flexDirection={['column','row']} border={'1px solid gray'} padding={'10px'} display={'flex'} gap={'10px'}>
<Text width={['100%','8%']} wordBreak={'break-all'}>{item.PRIZV}</Text>
<Text width={['100%','8%']} wordBreak={'break-all'}>{item.NAME}</Text>
<Text width={['100%','8%']} wordBreak={'break-all'}>{item.POBAT}</Text>
<Text width={['100%','8%']} wordBreak={'break-all'}>{item.NDOV}</Text>
<Text width={['100%','8%']} wordBreak={'break-all'}>{item.EMAIL}</Text>
<Text onClick={()=>setHidePassword(val => !val)} cursor={'context-menu'} width={['100%','8%']} wordBreak={'break-all'}>{ !hidePassword ? item.PWD : "********"}</Text>


<Box width={['100%','20%']}>
{item.PERADMIN === 1 ? <Tag size={'md'} key={'md'} variant='outline' colorScheme='green'>
      <TagLabel>Адмін перевізника</TagLabel>
      <TagRightIcon as={MdOutlineAdminPanelSettings}  />
</Tag> : <Tag size={'md'} key={'md'} variant='outline' colorScheme='blue'>
      <TagLabel>Користувач</TagLabel>
      <TagRightIcon as={MdOutlineAdminPanelSettings}  />
</Tag>}
</Box>
<Box width={['100%','20%']}>
{item.ISADMIN === 1 ? <Tag size={'md'} key={'md'} variant='outline' colorScheme='red'>
      <TagLabel>ІСТ-Захід</TagLabel>
      <TagRightIcon as={MdOutlineAdminPanelSettings}  />
</Tag> : null}
</Box>

    </Box>
  )
}

export default User