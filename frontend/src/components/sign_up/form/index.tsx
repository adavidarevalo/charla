import {
  Button,
  Stack} from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { PasswordField } from '../../form/password_field'
import RegisterValidation from './yup_validation'
import InputField from '../../form/input_field'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { registerUser } from '../../../redux/actions/user.actions'
import Bytescale from '../../bytescale'
import useMessageToast from '../../../hooks/use_message_toast'

export interface RegisterValues {
  name: string
  email: string
  password: string
  repeat_password: string
  status: string
  picture: string
}

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
  repeat_password: '',
  status: "Hey I'm using the app 😁",
  picture: ""
}

const defaultAvatar =
  'https://upcdn.io/W142iVW/raw/uploads/2024/03/03/4kn6dRnXGM-765-default-avatar.png'

export default function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>()
  
  useMessageToast()
  
  const onSubmit = (formVal: RegisterValues) => {
    dispatch(
      registerUser({
        name: formVal.name,
        email: formVal.email,
        password: formVal.password,
        status: formVal.status,
        picture: formVal.picture || defaultAvatar
      })
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterValidation}
      onSubmit={(
        values: RegisterValues,
        { setSubmitting }: FormikHelpers<RegisterValues>
      ) => {
        onSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ errors, handleBlur, touched, values, setFieldValue }) => (
        <Form>
          <Stack spacing="6">
            <Stack spacing="5">
              <InputField
                name="name"
                label="Name"
                handleBlur={handleBlur}
                error={touched?.name ? errors.name : ''}
              />
              <InputField
                name="status"
                label="Status"
                handleBlur={handleBlur}
                error={touched?.status ? errors.status : ''}
              />
              <InputField
                name="email"
                label="Email"
                type="email"
                handleBlur={handleBlur}
                error={touched?.email ? errors.email : ''}
              />
              <PasswordField
                name={'password'}
                id={'password'}
                label={'Password'}
                onBlur={handleBlur}
                error={touched?.password ? errors.password : ''}
              />
              <PasswordField
                id={'repeat_password'}
                name={'repeat_password'}
                label={'Repeat Password'}
                onBlur={handleBlur}
                error={touched?.repeat_password ? errors.repeat_password : ''}
              />
              <Bytescale
                avatarUrl={values.picture}
                avatarName={values.name}
                setFieldValue={setFieldValue}
              />
            </Stack>
            <Stack spacing="6">
              <Button
                type={'submit'}
                isDisabled={
                  !!errors.email &&
                  !!errors.password &&
                  !!errors.repeat_password
                }
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
