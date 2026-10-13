import type { ProtoRegistry } from './proto.registry'

import { useContext }         from 'react'

import { Context }            from './proto-registry.context'

export const useClient = (): ProtoRegistry['client'] => useContext(Context)!.client
