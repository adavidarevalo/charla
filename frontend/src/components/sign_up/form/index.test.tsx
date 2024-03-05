import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUpForm from '.'
import { Provider } from 'react-redux'
import { store } from '../../../redux/store'

jest.mock('./../../../utils/variables', () => ({
  apiEndpoint: 'http://localhost:4000/api/v1',
  bytescaleSecret: 'development',
  environment: 'dev'
}))

jest.mock('@bytescale/upload-widget-react', () => ({
  UploadButton: jest.fn(({ children }) => children({ onClick: jest.fn() }))
}))


const submitButton = () => screen.getByText(/Sign Up/i, { selector: 'button' })

describe('Sign Up Form', () => {
  it('renders form fields', () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    )

    expect(screen.getByText(/Email/i)).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Repeat Password')).toBeInTheDocument()
    expect(submitButton()).toBeInTheDocument()
  })

  it('validates required inputs', async () => {
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    )
    userEvent.click(submitButton())

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(screen.getByText("Password is required")).toBeInTheDocument()
    expect(screen.getByText("Repeat password is required")).toBeInTheDocument()
    expect(screen.getByText("Name is required")).toBeInTheDocument()
  })
})
