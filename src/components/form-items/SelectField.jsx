import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
  } from "@chakra-ui/react";
  import { Field, useField } from "formik";
  import React from "react";
  
  const SelectField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
  
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel>{label}</FormLabel>
        <Select {...field} {...props} />
  
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default SelectField;
  