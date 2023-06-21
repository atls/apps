import React                 from 'react'
import { PropsWithChildren } from 'react'
import { useMemo }           from 'react'
import { useEffect }         from 'react'

import { Provider }          from './proto-registry.context'
import { ProtoRegistry }     from './proto.registry'

export interface ProtoRegistryProviderProps {
  url?: string
}

export const ProtoRegistryProvider = ({
  url,
  children,
}: PropsWithChildren<ProtoRegistryProviderProps>) => {
  const registry = useMemo(() => new ProtoRegistry(url), [url])

  useEffect(() => {
    registry.load()
  }, [registry])

  return <Provider value={registry}>{children}</Provider>
}
