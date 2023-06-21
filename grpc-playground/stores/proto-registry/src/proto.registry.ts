import Descriptor                   from 'protobufjs/ext/descriptor'
import set                          from 'lodash.set'
import { EventEmitter }             from 'events'
import { Root }                     from 'protobufjs'

import { GrpcHttpProxyClient }      from '@grpc-playground/grpc-http-proxy-client'

import { ServerReflectionResponse } from './reflection.interfaces'
import { walkServices }             from './proto.utils'
import { buildServiceMethods }      from './schema.utils'

export class ProtoRegistry extends EventEmitter {
  client: GrpcHttpProxyClient

  private root: Root | null = null

  private schema = {}

  constructor(url?: string) {
    super()

    this.client = new GrpcHttpProxyClient(url)
  }

  getRoot() {
    return this.root
  }

  getSchema() {
    return this.schema
  }

  private async loadDescriptorProtos(): Promise<Uint8Array[]> {
    const { listServicesResponse } = await this.client.call(
      'grpc.reflection.v1alpha.ServerReflection',
      'ServerReflectionInfo',
      {
        listServices: 'true',
      }
    )

    const fileDescriptorResponses: Array<ServerReflectionResponse> = await Promise.all(
      listServicesResponse.service
        .filter((service) => service.name !== 'grpc.reflection.v1alpha.ServerReflection')
        .map((service) =>
          this.client.call('grpc.reflection.v1alpha.ServerReflection', 'ServerReflectionInfo', {
            fileContainingSymbol: service.name,
          }))
    )

    return fileDescriptorResponses
      .map((response) => response.fileDescriptorResponse!.fileDescriptorProto)
      .flat()
  }

  getDescriptorRoot(fileDescriptorProtos: Uint8Array[]) {
    const descriptorSet = Descriptor.FileDescriptorSet.create()

    fileDescriptorProtos.forEach((descriptorByte, index) => {
      set(descriptorSet, `file[${index}]`, Descriptor.FileDescriptorProto.decode(descriptorByte))
    })

    // @ts-ignore
    return Root.fromDescriptor(descriptorSet)
  }

  async load() {
    const fileDescriptorProtos = await this.loadDescriptorProtos()
    const root = this.getDescriptorRoot(fileDescriptorProtos)

    const schema = {}

    walkServices(root, (service, name, fullName) => {
      schema[name] = {
        name,
        fullName,
        methods: buildServiceMethods(service),
      }
    })

    this.root = root
    this.schema = schema

    this.emit('load', this)
  }
}
