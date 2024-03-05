import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../../context/AppContext'
import AudioLibrary from '../AudioLibrary'

const MockAudioLibrary = () => {
  return (
    <AppContext>
      <AudioLibrary />
    </AppContext>
  )
}

describe('AudioLibrary Component', () => {
  it('should test audio library integrity component', async () => {
    render(<MockAudioLibrary />)
    const componentTitle = screen.getByText(/Audio Pill Library/i)
    expect(componentTitle).toBeInTheDocument()
  })

  it('should test length of all pills in the library to be 7', async () => {
    render(<MockAudioLibrary />)
    const trackInput = await screen.findAllByTestId('trackTitle')
    expect(trackInput.length).toBe(7)
  })
})
