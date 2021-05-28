import { useEffect }       from 'react'
import { useState }        from 'react'

import { useDataRegistry } from '@grpc-playground/data-registry'

export const LoadingState = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const dataRegistry = useDataRegistry()

  useEffect(() => {
    const onLoad = () => setLoaded(true)

    dataRegistry.on('load', onLoad)

    return () => {
      dataRegistry.off('load', onLoad)
    }
  }, [dataRegistry])

  if (loaded) {
    return children
  }

  return null
}
