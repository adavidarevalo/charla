import { render, screen } from '@testing-library/react'
import SplitLayout from './split'

describe('SplitLayout', () => {
  const leftComponent = <div data-testid="left-component">Left Component</div>
  const rightComponent = (
    <div data-testid="right-component">Right Component</div>
  )

  it('renders correctly with provided components', () => {
    render(
      <SplitLayout
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    )

    expect(screen.getByTestId('left-component')).toBeInTheDocument()
    expect(screen.getByTestId('right-component')).toBeInTheDocument()
  })
})
