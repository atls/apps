import { useContext }    from 'react'

import { Context }       from './proto-registry.context'
import { ProtoRegistry } from './proto.registry'

// @ts-ignore
export const useClient = () => useContext<ProtoRegistry | null>(Context).client
