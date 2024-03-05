import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import RegisterContainer from '.'
import { BrowserRouter } from 'react-router-dom'

jest.mock('./../../utils/variables', () => ({
  apiEndpoint: 'http://localhost:4000/api/v1',
  bytescaleSecret: 'development',
  environment: 'dev'
}))

jest.mock('@bytescale/upload-widget-react', () => ({
  UploadButton: jest.fn(({ children }) => children({ onClick: jest.fn() }))
}))

jest.mock('./../../../public/logo.png', () => 'test.png')

const submitButton = () => screen.getByText(/Sign Up/i, { selector: 'button' })

describe('RegisterContainer check', () => {
  it('Validate Heading render', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterContainer />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Sign up')).toBeInTheDocument()
    expect(screen.getByText('Don you have an account?')).toBeInTheDocument()

    const signUpLink = await screen.findByText('Sign in')

    expect(signUpLink).toBeInTheDocument()

    expect(signUpLink.getAttribute('href')).toBe('/sign-in')
  })
  it('renders form fields', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterContainer />
        </Provider>
      </BrowserRouter>
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
      <BrowserRouter>
        <Provider store={store}>
          <RegisterContainer />
        </Provider>
      </BrowserRouter>
    )
    userEvent.click(submitButton())

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(screen.getByText('Password is required')).toBeInTheDocument()
    expect(screen.getByText('Repeat password is required')).toBeInTheDocument()
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })
  it('Validate Image render', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterContainer />
        </Provider>
      </BrowserRouter>
    )

    const signUpLink = await screen.findByAltText('Logo')
    expect(signUpLink.getAttribute('src')).toBe('test.png')
  })
})
