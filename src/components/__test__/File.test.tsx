import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../../context/AppContext'
import File from '../File'

const MockFile = () => {
  const file = { src: '', title: '' }
  return (
    <AppContext>
      <File file={file} />
    </AppContext>
  )
}

const MockFileTwo = () => {
  const file = { title: 'track one', src: './wale.mp3' }
  return (
    <AppContext>
      <File file={file} />
    </AppContext>
  )
}

describe('File one component', () => {
  it('should test file integrity component', async () => {
    render(<MockFile />)
    const trackTitle = await screen.findByTestId('trackTitle')
    expect(trackTitle.textContent).not.toBe('track one')
  })
})

describe('File two component', () => {
  it('should test pill file component', async () => {
    render(<MockFileTwo />)
    const trackTitle = await screen.findByTestId('trackTitle')
    expect(trackTitle.textContent).toBe('track one')
  })
})
