import { useContext } from 'react'
import { TracksContext } from '../context/TracksContext'

// tracks reusable hook
export const useTracks = () => useContext(TracksContext)
