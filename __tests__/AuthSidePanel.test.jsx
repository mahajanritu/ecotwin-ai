import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthSidePanel from '@/components/features/AuthSidePanel'

describe('AuthSidePanel', () => {
  test('renders the EcoTwin AI brand name', () => {
    render(<AuthSidePanel />)
    expect(screen.getByText('EcoTwin')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  test('renders the main headline', () => {
    render(<AuthSidePanel />)
    expect(screen.getByText(/Your future self/i)).toBeInTheDocument()
  })

  test('renders all three feature highlights', () => {
    render(<AuthSidePanel />)
    expect(screen.getByText(/Personalized AI Climate Twin/i)).toBeInTheDocument()
    expect(screen.getByText(/Track CO/i)).toBeInTheDocument()
    expect(screen.getByText(/Earn XP, badges/i)).toBeInTheDocument()
  })

  test('logo links back to the homepage', () => {
    render(<AuthSidePanel />)
    const homeLink = screen.getByRole('link')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  test('renders footer copyright text', () => {
    render(<AuthSidePanel />)
    expect(screen.getByText(/EcoTwin AI/)).toBeInTheDocument()
    expect(screen.getByText(/Free forever/i)).toBeInTheDocument()
  })
})