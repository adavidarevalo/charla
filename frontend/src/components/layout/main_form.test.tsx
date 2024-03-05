import { render, screen } from '@testing-library/react'
import MainFormLayout from './main_form'

describe('MainFormLayout', () => {
  const mockImageUrl = 'mock-image-url'
  const mockSubHeadingStack = (
    <div data-testid="sub-heading">
      Mock Subheading
    </div>
  )
  const mockForm = <form data-testid="form">Mock Form</form>

  it('renders correctly with provided props', () => {
    render(
      <MainFormLayout
        imageUrl={mockImageUrl}
        subHeadingStack={mockSubHeadingStack}
        form={mockForm}
      />
    )

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByTestId('sub-heading')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })

  it('renders the correct image', () => {
    const { getByAltText } = render(
      <MainFormLayout
        imageUrl={mockImageUrl}
        subHeadingStack={mockSubHeadingStack}
        form={mockForm}
      />
    )

    const image = getByAltText('Logo')
    expect(image).toHaveAttribute('src', mockImageUrl)
  })
})
