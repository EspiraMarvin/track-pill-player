import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddPill from '../AddPill'
import { AppContext } from '../../context/AppContext'

const MockAddPill = () => {
  return (
    <AppContext>
      <AddPill />
    </AppContext>
  )
}

describe('AddPill', () => {
  it('should test file upload exists', async () => {
    render(<MockAddPill />)
    const fileInput = screen.getByTestId('audioFileUpload') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
  })

  it('should test uploading audio file', async () => {
    render(<MockAddPill />)
    const file = new File(['ambition'], 'ambition.mp3', {
      type: 'ambition/mp3',
    })
    const fileInput = screen.getByTestId('audioFileUpload') as HTMLInputElement
    userEvent.upload(fileInput, file)
    expect(fileInput.files![0]).toStrictEqual(file)
    expect(fileInput.files!.item(0)).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
  })
})
