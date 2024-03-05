import { Button, Checkbox, HStack, Stack } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { PasswordField } from '../../form/password_field'
import LoginYupValidation from './yup_validation'
import InputField from '../../form/input_field'
import { AppDispatch } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux/actions/user.actions'
import useMessageToast from '../../../hooks/use_message_toast'

interface LoginValues {
  email: string
  password: string
}

const initialValues: LoginValues = {
  email: '',
  password: ''
}

export default function SignInForm() {
  const dispatch = useDispatch<AppDispatch>()

  useMessageToast()
  
  const onSubmit = (values: LoginValues) => {
    dispatch(
      loginUser({
        email: values.email,
        password: values.password
      })
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginYupValidation}
      onSubmit={(
        values: LoginValues,
        { setSubmitting }: FormikHelpers<LoginValues>
      ) => {
        onSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ errors, handleBlur, touched }) => (
        <Form>
          <Stack spacing="6">
            <Stack spacing="5">
              <InputField
                name="email"
                type="email"
                label="Email"
                handleBlur={handleBlur}
                error={touched?.email ? errors.email : ''}
              />
              <PasswordField
                id={'password'}
                name={'password'}
                label={"Password"}
                onBlur={handleBlur}
                error={touched?.password ? errors.password : ''}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                type={'submit'}
                isDisabled={!!errors.email && !!errors.password}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
