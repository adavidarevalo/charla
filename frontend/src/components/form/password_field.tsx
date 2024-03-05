import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  Text
} from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Field } from 'formik'

interface PasswordFieldProps extends InputProps {
  error?: string
  label?: string
  name?: string
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    const {
      id = 'password',
      label = 'Password',
      error
    } = props

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
              data-testid={'PasswordIconButton'}
            />
          </InputRightElement>
          <Input
            id={id}
            ref={mergeRef}
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            as={Field}
            data-testid={'PasswordInput'}
            {...props}
          />
        </InputGroup>
        {!!error?.length && <Text color={'#E53E3E'}>{error}</Text>}
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
