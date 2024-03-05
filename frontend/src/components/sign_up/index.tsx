import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import MainFormLayout from '../layout/main_form'
import LogoImg from './../../../public/logo.png'
import RegisterForm from './form'
import { Link as RouterLink } from 'react-router-dom';

export default function RegisterContainer() {
  return (
    <MainFormLayout
      subHeadingStack={
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'sm' }}>Sign up</Heading>
          <Text color="fg.muted">
            Don you have an account?{' '}
            <Link to="/sign-in" as={RouterLink}>
              Sign in
            </Link>
          </Text>
        </Stack>
      }
      form={<RegisterForm />}
      imageUrl={LogoImg}
    />
  )
}
