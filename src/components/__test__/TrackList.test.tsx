import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../../context/AppContext'
import TracksList from '../TracksList'

const MockTrackList = () => {
  return (
    <AppContext>
      <TracksList />
    </AppContext>
  )
}

describe('CreateTrack Component', () => {
  it('should test track list integrity component', async () => {
    render(<MockTrackList />)
    const componentTitle = screen.getByText(/TracksList/i)
    expect(componentTitle).toBeInTheDocument()
  })
})
