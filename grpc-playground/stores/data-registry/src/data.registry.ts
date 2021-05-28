import { EventEmitter }    from 'events'

import { walkServices }    from '@grpc-playground/proto-registry'
import { buildTypeFields } from '@grpc-playground/proto-registry'

import { getSchemaData }   from './schema.utils'

export interface ServiceMethodData {
  [key: string]: ServiceMethodData | any
}

export class DataRegistry extends EventEmitter {
  private data: Map<string, Map<string, ServiceMethodData>> = new Map()

  load(root) {
    walkServices(root, (service, name, fullName) => {
      Object.keys(service.methods).forEach((method) => {
        const messageType = root.lookupType(service.methods[method].requestType)

        this.setServiceMethodData(name, method, getSchemaData(buildTypeFields(messageType)))
      })
    })

    this.emit('load', this)
  }

  setServiceMethodData(service: string, method: string, data: ServiceMethodData) {
    if (!this.data.has(service)) {
      this.data.set(service, new Map())
    }

    this.data.get(service)?.set(method, data)
  }

  getServiceMethodData(service: string, method: string): ServiceMethodData | undefined {
    return this.data.get(service)?.get(method)
  }
}

export const dataRegistry = new DataRegistry()
