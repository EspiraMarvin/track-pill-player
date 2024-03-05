import { useContext } from 'react'
import { PillsContext } from '../context/PillsContext'

// pills reusable hook
export const usePills = () => useContext(PillsContext)
