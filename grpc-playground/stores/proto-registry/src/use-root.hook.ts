import { useContext } from 'react'
import { useEffect }  from 'react'
import { useState }   from 'react'
import { Root }       from 'protobufjs'

import { Context }    from './proto-registry.context'

export const useRoot = (): Root => {
  const registry = useContext(Context)
  const [root, setRoot] = useState<Root>(registry.getRoot())

  useEffect(() => {
    const onLoad = () => setRoot(registry.getRoot())

    registry.on('load', onLoad)

    return () => {
      registry.off('load', onLoad)
    }
  }, [registry])

  return root
}
