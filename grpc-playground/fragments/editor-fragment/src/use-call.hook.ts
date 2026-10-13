import { useCallback }     from 'react'

import { useDataRegistry } from '@grpc-playground/data-registry'
import { useClient }       from '@grpc-playground/proto-registry'
import { useSchema }       from '@grpc-playground/proto-registry'

export const useCall = (
  service: string | undefined,
  method: string | undefined,
  callback: (response: unknown) => void
) => {
  const dataRegistry = useDataRegistry()
  const client = useClient()
  const schema = useSchema()

  return useCallback(async () => {
    if (!service || !method) {
      return
    }

    const selectedSchema = schema?.[service]

    if (!selectedSchema) {
      return
    }

    const data = dataRegistry?.getServiceMethodData(service, method)

    const response = await client.call(selectedSchema.fullName, method, data)

    callback(response)
  }, [service, method, callback, dataRegistry, client, schema])
}
