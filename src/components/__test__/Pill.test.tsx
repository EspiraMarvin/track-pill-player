import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../../context/AppContext'
import Pill from '../Pill'

const MockPill = () => {
  const file = { title: 'track two', src: './marv.mp3' }
  const index = 0
  const handleDragStart = () => {}
  const handleDragOver = () => {}
  const handleDragEnter = () => {}
  const handleDrop = () => {}

  return (
    <AppContext>
      <Pill
        file={file}
        handleDragEnter={handleDragEnter}
        handleDragOver={handleDragOver}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        index={index}
      />
    </AppContext>
  )
}

describe('File one component', () => {
  it('should test Pill integrity component', async () => {
    render(<MockPill />)
    const trackTitle = await screen.findByTestId('pillTrackTitle')
    expect(trackTitle.textContent).not.toBe('')
  })
})

describe('File two component', () => {
  it('should test pill title is in the component', async () => {
    render(<MockPill />)
    const trackTitle = await screen.findByTestId('pillTrackTitle')
    expect(trackTitle.textContent).toBe('track two')
  })

  it('should test pill source is in the component', async () => {
    render(<MockPill />)
    const trackTitle = await screen.findByTestId('pillTrackSource')
    expect(trackTitle).toBeInTheDocument()
  })
})
