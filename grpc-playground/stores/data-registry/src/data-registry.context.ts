import type { DataRegistry } from './data.registry'

import { createContext }     from 'react'

export const Context = createContext<DataRegistry | null>(null)

export const { Provider, Consumer } = Context
