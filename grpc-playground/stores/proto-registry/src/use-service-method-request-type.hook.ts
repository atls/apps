import type { Type }    from 'protobufjs'

import { useMemo }      from 'react'

import { walkServices } from './proto.utils'
import { useRoot }      from './use-root.hook'

export const useServiceMethodRequestType = (service: string, method: string): Type | undefined => {
  const root = useRoot()

  return useMemo(() => {
    let messageType: Type | undefined

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
