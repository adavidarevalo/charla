import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInForm from '.'
import { Provider } from 'react-redux'
import { store } from '../../../redux/store'

jest.mock('./../../../utils/variables', () => ({
  apiEndpoint: 'http://localhost:4000/api/v1'
}))

const submitButton = () => screen.getByText("Sign In", { selector: 'button' })

describe('Sign In Form', () => {
  it('renders form fields', () => {
    render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    )

    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(submitButton()).toBeInTheDocument()
  })

  it('validates required inputs', async () => {
    render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    )
    userEvent.click(submitButton())

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument()
    })
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
  })
})
