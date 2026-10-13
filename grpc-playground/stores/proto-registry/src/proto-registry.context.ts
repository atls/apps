import type { ProtoRegistry } from './proto.registry'

import { createContext }      from 'react'

export const Context = createContext<ProtoRegistry | null>(null)

export const { Provider, Consumer } = Context
