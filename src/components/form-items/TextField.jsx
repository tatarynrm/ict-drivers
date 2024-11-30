import { Field, useField } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, Textarea } from '@chakra-ui/react';

const TextField = ({ label, isTextArea = false, ...props }) => {
  const [field, meta] = useField(props);

  const handleChange = (e) => {
    // Зберегти значення у localStorage
    localStorage.setItem(field.name, e.target.value);
    
    // Викликати обробник зміни з Formik
    field.onChange(e);
  };

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      {isTextArea ? (
        <Field as={Textarea} {...field} onChange={handleChange} {...props} />
      ) : (
        <Field as={Input} {...field} onChange={handleChange} {...props} />
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;