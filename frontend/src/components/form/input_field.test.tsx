import { render, screen } from '@testing-library/react'
import InputField from './input_field'
import { Formik } from 'formik'

describe('InputField', () => {
  it('renders correctly with label', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <InputField name="test" label="Test Label" />
      </Formik>
    )
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders error message if error prop is provided', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <InputField name="test" label="Test Label" error="Error message" />
      </Formik>
    )
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('renders input field with custom type if provided', async () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <InputField name="test" label="Test Label" type="password" />
      </Formik>
    )
    
    expect(await screen.findByTestId('InputField')).toHaveAttribute(
      'type',
      'password'
    )
  })

  it('renders input field without onBlur event if handleBlur prop is not provided', async () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <InputField name="test" label="Test Label" />
      </Formik>
    )
    expect(await screen.findByTestId('InputField')).not.toHaveAttribute('onBlur')
  })

})
