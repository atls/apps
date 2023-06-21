import { createContext } from 'react'

import { ProtoRegistry } from './proto.registry'

export const Context = createContext<ProtoRegistry | null>(null)

export const { Provider, Consumer } = Context
