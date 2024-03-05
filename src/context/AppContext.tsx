import { PillsProvider } from './PillsContext'
import { TracksProvider } from './TracksContext'

import { combineComponents } from '../utils/CombineComponents'

// create general app context - containing pills and tracks

const providers = [PillsProvider, TracksProvider]

export const AppContext = combineComponents(...providers)
