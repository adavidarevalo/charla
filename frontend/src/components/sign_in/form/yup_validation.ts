import * as Yup from 'yup'

const LoginYupValidation = Yup.object({
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(6, 'Must be 6 characters or more')
    .required('Password is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

export default LoginYupValidation
