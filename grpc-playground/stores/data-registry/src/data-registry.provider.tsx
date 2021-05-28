import React            from 'react'
import { useMemo }      from 'react'
import { useEffect }    from 'react'
import { FC }           from 'react'

import { useRoot }      from '@grpc-playground/proto-registry'

import { DataRegistry } from './data.registry'
import { Provider }     from './data-registry.context'

export const DataRegistryProvider: FC<{}> = ({ children }) => {
  const registry = useMemo(() => new DataRegistry(), [])

  const root = useRoot()

  useEffect(() => {
    if (root) {
      registry.load(root)
    }
  }, [root, registry])

  return <Provider value={registry}>{children}</Provider>
}
