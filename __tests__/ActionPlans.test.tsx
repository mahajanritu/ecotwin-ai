import { render, screen } from '@testing-library/react'
import ActionPlans from '../src/components/ActionPlans'

describe('ActionPlans', () => {
  test('renders action plan heading', () => {
    render(<ActionPlans />)

    expect(
      screen.getByText('Your AI action plan')
    ).toBeInTheDocument()
  })
})