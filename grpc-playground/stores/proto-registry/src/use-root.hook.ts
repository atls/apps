import { Root }       from 'protobufjs'
import { useContext } from 'react'
import { useEffect }  from 'react'
import { useState }   from 'react'

import { Context }    from './proto-registry.context'

export const useRoot = (): Root | null | undefined => {
  const registry = useContext(Context)
  const [root, setRoot] = useState<Root | null | undefined>(registry?.getRoot())

  useEffect(() => {
    const onLoad = () => setRoot(registry?.getRoot())

    registry?.on('load', onLoad)

    return () => {
      registry?.off('load', onLoad)
    }
  }, [registry])

  return root
}
