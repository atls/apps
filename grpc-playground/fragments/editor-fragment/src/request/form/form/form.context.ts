import type { FormStore } from './form.store'

import { createContext }  from 'react'

export const Context = createContext<FormStore | null>(null)

export const { Provider, Consumer } = Context
