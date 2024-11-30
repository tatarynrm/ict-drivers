import { Field, useField } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';

const PhoneNumberField = ({ label, ...props }) => {
  const [field, meta, { setValue }] = useField(props);

  const handleChange = (e) => {
    const value = e.target.value;

    // Зберегти значення у localStorage
    localStorage.setItem(field.name, value);

    // Викликати обробник зміни з Formik
    field.onChange(e); // Використовуємо field.onChange для правильного оновлення
  };
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Input}  {...field} onChange={handleChange} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PhoneNumberField;