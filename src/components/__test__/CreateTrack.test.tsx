import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import CreateTrack from '../CreateTrack'
import { AppContext } from '../../context/AppContext'

const MockCreateTrack = () => {
  return (
    <AppContext>
      <CreateTrack />
    </AppContext>
  )
}

describe('CreateTrack Component', () => {
  it('should test create track integrity component', async () => {
    render(<MockCreateTrack />)
    const componentTitle = screen.getByText(/Create Track/i)
    expect(componentTitle).toBeInTheDocument()
  })

  it('should test add track name field exists', async () => {
    render(<MockCreateTrack />)
    const trackInput = screen.getByPlaceholderText(/Enter track name/i)
    expect(trackInput).toBeInTheDocument()
  })

  it('should test adding a new track to input field', async () => {
    render(<MockCreateTrack />)
    const trackInput = (await screen.findByPlaceholderText(
      /Enter track name/i
    )) as HTMLInputElement
    expect(trackInput.value).toBe('') // Initially empty
    fireEvent.change(trackInput, { target: { value: 'Track One' } })
    expect(trackInput.value).toBe('Track One')
  })
})
