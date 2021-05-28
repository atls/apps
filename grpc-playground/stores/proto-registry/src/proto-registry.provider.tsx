import React             from 'react'
import { useMemo }       from 'react'
import { useEffect }     from 'react'
import { FC }            from 'react'

import { ProtoRegistry } from './proto.registry'
import { Provider }      from './proto-registry.context'

export interface ProtoRegistryProviderProps {
  url?: string
}

export const ProtoRegistryProvider: FC<ProtoRegistryProviderProps> = ({ url, children }) => {
  const registry = useMemo(() => new ProtoRegistry(url), [url])

  useEffect(() => {
    registry.load()
  }, [registry])

  return <Provider value={registry}>{children}</Provider>
}
