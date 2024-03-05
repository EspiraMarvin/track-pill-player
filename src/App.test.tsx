import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import AddPill from './components/AddPill'
import AudioLibrary from './components/AudioLibrary'
import { AppContext } from './context/AppContext'

const MockApp = () => {
  return (
    <AppContext>
      <App />
    </AppContext>
  )
}

test('renders Music Pill Player', () => {
  render(<MockApp />)
  const titleElement = screen.getByText(/Music Pill Player/i)
  expect(titleElement).toBeInTheDocument()
})
