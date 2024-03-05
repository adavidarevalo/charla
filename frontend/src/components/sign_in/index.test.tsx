import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../redux/store';
import SignInContainer from '.';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./../../utils/variables', () => ({
  apiEndpoint: 'http://localhost:4000/api/v1'
}))

jest.mock('./../../../public/logo.png', () => "test.png")

const submitButton = () => screen.getByText(/Sign In/i, { selector: 'button' })

describe('SignInContainer Check', () => {
    it('Validate Heading render', async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SignInContainer />
          </Provider>
        </BrowserRouter>
      )
      expect(screen.getByText('Log in to your account')).toBeInTheDocument()
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument()


      const signUpLink = await screen.findByText('Sign up')

      expect(signUpLink).toBeInTheDocument()

      expect(signUpLink.getAttribute('href')).toBe('/sign-up')
    })
  it('renders form fields', () => {
    render(
      <Provider store={store}>
        <SignInContainer />
      </Provider>
    )

    expect(screen.getByText(/Email/i)).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(submitButton()).toBeInTheDocument()
  })

  it('validates required inputs', async () => {
    render(
      <Provider store={store}>
        <SignInContainer />
      </Provider>
    )
    userEvent.click(submitButton())

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
  })
  it("Validate Image render", async () => {
     render(
       <BrowserRouter>
         <Provider store={store}>
           <SignInContainer />
         </Provider>
       </BrowserRouter>
     )

           const signUpLink = await screen.findByAltText('Logo')
      expect(signUpLink.getAttribute('src')).toBe('test.png')

  })
})
