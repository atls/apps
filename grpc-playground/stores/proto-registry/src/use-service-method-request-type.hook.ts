import { useMemo }      from 'react'
import { Type }         from 'protobufjs'

import { walkServices } from './proto.utils'
import { useRoot }      from './use-root.hook'

export const useServiceMethodRequestType = (service, method): Type => {
  const root = useRoot()

  return useMemo(() => {
    let messageType

    if (root) {
      walkServices(root, (svc, name) => {
        Object.keys(svc.methods).forEach((mtd) => {
          if (service === name && method === mtd) {
            messageType = root.lookupType(svc.methods[mtd].requestType)
          }
        })
      })
    }

    return messageType
  }, [service, method, root])
}
