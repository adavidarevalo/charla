import * as Yup from 'yup'

const userValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .lowercase()
    .trim(),
  picture: Yup.string().default(
    'https://upcdn.io/W142iVW/raw/uploads/2024/03/03/4kn6dRnXGM-765-default-avatar.png'
  ),
  status: Yup.string().default("Hey I'm using the app"),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(120, 'Password must be at most 120 characters'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Repeat password is required')
})

export default userValidationSchema
