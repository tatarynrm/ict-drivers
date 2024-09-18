import React from 'react';
import { Field, useField } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
// import { InputMask, useMask } from '@react-input/mask';
import * as Yup from 'yup';
// import ReactInputMask from 'react-input-mask';
const PhoneNumberField = ({ label, ...props }) => {
  
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Input}   {...field} {...props}/>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PhoneNumberField;