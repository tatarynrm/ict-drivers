import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
  } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import TextField from '../form-items/TextField';
import { Form, Formik } from 'formik';
import axios from '../../utils/axios'
import PhoneNumberField from '../form-items/PhoneNumberField';
import SelectField from '../form-items/SelectField';
import { validatePerUserCreate } from '../../validations/perUserValidation';
import useCustomToast from '../../hooks/useCustomToasts';
import { soundUserRegisterError, soundUserRegisterSuccess } from '../../helpers/soundEffects';
const PerUserCreate = ({isOpen, onOpen, onClose }) => {
    const userData = useSelector(state => state?.auth?.data)
    const toast = useCustomToast();

    const initialRef = useRef(null)
    const finalRef = useRef(null)

  const [errorCode, setErrorCode] = useState(null);

  const handleUserCreate = async (values,{resetForm}) => {
   console.log(values);
   
    try {
      const { data } = await axios.post("/registration", values);
      
      if (data?.errorNum) {
        soundUserRegisterError()
        setErrorCode('Користувач з таким E-mail уже існує або на сервері виникла помилка.')
        toast('Виникла якась помилка','error')
      }
      if (data?.user?.KOD) {
        const user = data.user
        soundUserRegisterSuccess()
                setErrorCode(`Користувача ${user.PRIZV} ${user.NAME} ${user.POBAT} створено.`);
              
        toast('Користувача створено','success')
        
        resetForm()
setTimeout(()=>{
    onClose()
    setErrorCode(null);
},2000)
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{

  },[userData])
  return (
    <>
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={'green.300'}>Створення нового користувача</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
  <Formik
    initialValues={{
     surname: '',
     name: '',       
     last_name: '',
     email:'',
     pwd:'',
     phone_number:'',
     per_admin:0,
     kod_ur:userData?.user?.KOD_UR
    }}
    validationSchema={validatePerUserCreate}
    onSubmit={handleUserCreate}
  >
    {({ errors, touched }) => (
      <Form>
        <TextField name="surname" type="text" label={`Прізвище`} />
        <TextField name="name" type="text" label={`Ім'я`} />
        <TextField name="last_name" type="text" label={`По-батькові`} />
        <TextField name="email" type="email" label={`Логін(E-mail)`}  placeholder={'example@gmail.com'}/>
        <TextField name="pwd" type="text" label={`Пароль`}  />

        <PhoneNumberField
          name="phone_number"
          type="text"
          label={`Номер телефону`}
          placeholder={"Формат 0987776655"}
        />
        <Button marginTop={'20px'} type="submit">Створити</Button>
        {errorCode && (
          <Text color={errorCode.includes("створено") ? "green" : "red"}>
            {errorCode}
          </Text>
        )}
      </Form>
    )}
  </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}

export default PerUserCreate