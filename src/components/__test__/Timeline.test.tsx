import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../../context/AppContext'
import Timeline from '../Timeline'

const MockTimeline = () => {
  return (
    <AppContext>
      <Timeline />
    </AppContext>
  )
}

describe('Timeline Component', () => {
  it('should test timeline integrity component', async () => {
    render(<MockTimeline />)
    const componentTitle = screen.getByText(/Timeline/i)
    expect(componentTitle).toBeInTheDocument()
  })

  it('should test Track pills playground !!! is shown', async () => {
    render(<MockTimeline />)
    const timelinePlayground = screen.getByText('Track pills playground !!!')
    expect(timelinePlayground).toBeInTheDocument()
  })
})
