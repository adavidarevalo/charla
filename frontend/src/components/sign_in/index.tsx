import {
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import LogoImg from "../../../public/logo.png"
import SignInForm from './form'
import MainFormLayout from '../layout/main_form'
import { Link as RouterLink } from 'react-router-dom'

export default function SignInContainer() {
  return (
    <MainFormLayout
      subHeadingStack={
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'sm' }}>
            Log in to your account
          </Heading>
          <Text color="fg.muted">
            Don't have an account?{" "}
            <Link to="/sign-up" as={RouterLink}>Sign up</Link>
          </Text>
        </Stack>
      }
      form={<SignInForm />}
      imageUrl={LogoImg}
    />
  )
}
