import { render, fireEvent, screen } from '@testing-library/react'
import {PasswordField} from './password_field'
import { Formik } from 'formik';

describe('PasswordField', () => {
  it('renders correctly with label', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <PasswordField label="Password" />
      </Formik>
    )
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('toggles password visibility when the icon button is clicked', async () => {
render(
  <Formik initialValues={{}} onSubmit={() => {}}>
    <PasswordField label="Password" />
  </Formik>
)
    const passwordInput = await screen.findByTestId('PasswordInput')
    const iconButton = await screen.findByTestId('PasswordIconButton')

    fireEvent.click(iconButton)

    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(iconButton)

    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('renders error message if error prop is provided', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <PasswordField label="Password" error="Error message" />
      </Formik>
    )
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
})
