import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Field } from 'formik'
import { FocusEventHandler } from 'react'

interface InputFieldProps {
  name: string
  label: string
  type?: string
  handleBlur?: FocusEventHandler<HTMLInputElement>
  error?: string
}


export default function InputField({
  name,
  label,
  type = 'text',
  handleBlur,
  error
}: InputFieldProps) {
  return (
    <FormControl isInvalid={!!error?.length}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        type={type}
        name={name}
        as={Field}
        onBlur={handleBlur}
        data-testid="InputField"
      />
      {!!error?.length && <Text color={'#E53E3E'}>{error}</Text>}
    </FormControl>
  )
}
