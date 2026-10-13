import type { IFileDescriptorSet }       from 'protobufjs/ext/descriptor'

import type { ServerReflectionResponse } from './reflection.interfaces'

import * as Descriptor                   from 'protobufjs/ext/descriptor'
import { EventEmitter }                  from 'events/'
import { Root }                          from 'protobufjs'
import set                               from 'lodash.set'

import { GrpcHttpProxyClient }           from '@grpc-playground/grpc-http-proxy-client'

import { walkServices }                  from './proto.utils'
import { buildServiceMethods }           from './schema.utils'

type ServiceSchema = {
  name: string
  fullName: string
  methods: Record<string, { name: string; input: Record<string, unknown> }>
}

export class ProtoRegistry extends EventEmitter {
  client: GrpcHttpProxyClient

  private root: Root | null = null

  private schema: Record<string, ServiceSchema> = {}

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

  getDescriptorRoot(fileDescriptorProtos: Array<Uint8Array>): Root {
    const descriptorSet = Descriptor.FileDescriptorSet.create()

    fileDescriptorProtos.forEach((descriptorByte, index) => {
      set(descriptorSet, `file[${index}]`, Descriptor.FileDescriptorProto.decode(descriptorByte))
    })

    const descriptorRoot = Root as typeof Root & {
      fromDescriptor: (set: IFileDescriptorSet) => Root
    }

    return descriptorRoot.fromDescriptor(descriptorSet as unknown as IFileDescriptorSet)
  }

  async load() {
    const fileDescriptorProtos = await this.loadDescriptorProtos()
    const root = this.getDescriptorRoot(fileDescriptorProtos)

    const schema: Record<string, ServiceSchema> = {}

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

  private async loadDescriptorProtos(): Promise<Array<Uint8Array>> {
    const { listServicesResponse } = await this.client.call<ServerReflectionResponse>(
      'grpc.reflection.v1alpha.ServerReflection',
      'ServerReflectionInfo',
      {
        listServices: 'true',
      }
    )

    const fileDescriptorResponses: Array<ServerReflectionResponse> = await Promise.all(
      listServicesResponse!.service
        .filter((service) => service.name !== 'grpc.reflection.v1alpha.ServerReflection')
        .map(async (service) =>
          this.client.call<ServerReflectionResponse>(
            'grpc.reflection.v1alpha.ServerReflection',
            'ServerReflectionInfo',
            {
              fileContainingSymbol: service.name,
            }
          ))
    )

    return fileDescriptorResponses
      .map((response) => response.fileDescriptorResponse!.fileDescriptorProto)
      .flat()
  }
}
