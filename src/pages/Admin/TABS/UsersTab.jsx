import { Box, Button, Input, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ACreateUser from '../components/forms/user-create/ACreateUser'
import User from '../components/User'
import axios from '../../../utils/axios'
import { dynamicSearch } from '../../../helpers/dynamicSearch'

const UsersTab = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [searchFields, setSearchFields] = useState(null)
 

    const getUsersList = async () => {
        try {
            const data = await axios.get('/users-accounts');
    

            if (data.status === 200) {
                setUsers(await data.data.rows)
                const fields = await data.data.metaData.map(item => item.name)
                setSearchFields(fields)
            }

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getUsersList()
    }, [])




    return (
        <Stack   position={'relative'}>
            <Box>
                <Button onClick={onOpen}>Створити користувача</Button>
                <ACreateUser isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </Box>

            {users &&
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Пошук за email,прзівище,номер телефону,назва компанії' />
            }

            {users &&

                <Box display={['none','none','flex']} gap={'10px'}>
                    <Text width={'8%'} wordBreak={'break-all'}>Прізвище</Text>
                    <Text width={'8%'} wordBreak={'break-all'}>Ім'я</Text>
                    <Text width={'8%'} wordBreak={'break-all'}>По-батькові</Text>
                    <Text width={'15%'} wordBreak={'break-all'}>Назва компанії</Text>
                    <Text width={'15%'} wordBreak={'break-all'}>E-mail(логін)</Text>
                    <Text width={'15%'} wordBreak={'break-all'}>Пароль</Text>
                    <Text width={'20%'} wordBreak={'break-all'}>Адмін пер.</Text>
                    <Text width={'20%'} wordBreak={'break-all'}>Адмін ІСТ</Text>
                </Box>
            }
            <Box maxHeight={'600px'} overflow={'scroll'} overflowX={'hidden'} marginTop={'20px'} display={'flex'} flexDirection={'column'} gap={'10px'}>



                {users && users.filter(item => {
                    return search === '' ? item :
                        dynamicSearch(item, search, searchFields)

                }).sort((a, b) => b.ISADMIN - a.ISADMIN).map((item, idx) => {
                    return <User key={idx} item={item} />
                })}


            </Box>
        </Stack>
    )
}

export default UsersTab