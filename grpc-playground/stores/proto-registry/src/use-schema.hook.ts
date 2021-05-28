import { useContext } from 'react'
import { useEffect }  from 'react'
import { useState }   from 'react'

import { Context }    from './proto-registry.context'

export const useSchema = () => {
  const registry = useContext(Context)
  const [schema, setSchema] = useState(registry.getSchema())

  useEffect(() => {
    const onLoad = () => setSchema(registry.getSchema())

    registry.on('load', onLoad)

    return () => {
      registry.off('load', onLoad)
    }
  }, [registry])

  return schema
}
