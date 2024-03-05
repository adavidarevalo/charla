import { render, screen } from '@testing-library/react'
import Bytescale from './index'

jest.mock('@bytescale/upload-widget-react', () => ({
  UploadButton: jest.fn(({ children }) => children({ onClick: jest.fn() }))
}))

jest.mock('../../utils/variables', () => ({
  bytescaleSecret: 'development',
  environment: 'dev'
}))

const setFieldValueMock = jest.fn()

describe('Bytescale component', () => {
  it('should render without crashing', () => {
    render(
      <Bytescale avatarUrl="" avatarName="" setFieldValue={setFieldValueMock} />
    )

    expect(screen.getByText('Picture (Optional)')).toBeInTheDocument()
  })
  it('Should renders correctly', () => {
    const { asFragment } = render(
      <Bytescale avatarUrl="" avatarName="" setFieldValue={setFieldValueMock} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
