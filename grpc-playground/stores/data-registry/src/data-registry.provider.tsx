import React            from 'react'
import { useMemo }      from 'react'
import { useEffect }    from 'react'

import { useRoot }      from '@grpc-playground/proto-registry'

import { Provider }     from './data-registry.context'
import { DataRegistry } from './data.registry'

export const DataRegistryProvider = ({ children }) => {
  const registry = useMemo(() => new DataRegistry(), []) as DataRegistry

  const root = useRoot()

  useEffect(() => {
    if (root) {
      registry.load(root)
    }
  }, [root, registry])

  return <Provider value={registry}>{children}</Provider>
}
