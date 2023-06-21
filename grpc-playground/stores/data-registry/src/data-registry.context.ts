import { createContext } from 'react'

import { DataRegistry }  from './data.registry'

export const Context = createContext<DataRegistry | null>(null)

export const { Provider, Consumer } = Context
