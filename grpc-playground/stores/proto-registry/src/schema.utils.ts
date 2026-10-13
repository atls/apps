import type { Field }   from 'protobufjs'
import type { Service } from 'protobufjs'

import { Enum }         from 'protobufjs'
import { MapField }     from 'protobufjs'
import { Type }         from 'protobufjs'
import { v4 as uuid }   from 'uuid'

const MAX_STACK_SIZE = 3

export const interpretMockViaFieldName = (fieldName: string): string => {
  const fieldNameLower = fieldName.toLowerCase()

  if (fieldNameLower.startsWith('id') || fieldNameLower.endsWith('id')) {
    return uuid()
  }

  return 'Hello'
}

export const buildScalarValue = (type: string, fieldName: string) => {
  switch (type) {
    case 'string':
      return interpretMockViaFieldName(fieldName)
    case 'number':
      return 10
    case 'bool':
      return true
    case 'int32':
      return 10
    case 'int64':
      return '20'
    case 'uint32':
      return 100
    case 'uint64':
      return '100'
    case 'sint32':
      return 100
    case 'sint64':
      return '1200'
    case 'fixed32':
      return 1400
    case 'fixed64':
      return '1500'
    case 'sfixed32':
      return 1600
    case 'sfixed64':
      return '1700'
    case 'double':
      return 1.4
    case 'float':
      return 1.1
    case 'bytes':
      return new TextEncoder().encode('Hello')
    default:
      return null
  }
}

export const buildEnum = (enumType: Enum) => {
  const [enumKey] = Object.keys(enumType.values)

  return { value: enumType.values[enumKey] }
}

export const buildScalar = (field: Field) => ({
  ...field,
  value: buildScalarValue(field.type, field.name),
})

export const buildTypeFields = (
  type: Type,
  stackDepth: Record<string, number> = {}
): Record<string, unknown> => {
  if ((stackDepth[type.name] ?? 0) > MAX_STACK_SIZE) {
    return {}
  }

  stackDepth[type.name] = (stackDepth[type.name] ?? 0) + 1

  const buildField = (field: Field): unknown => {
    if (field instanceof MapField) {
      const { resolvedType } = field
      let mockPropertyValue: unknown = null

      if (resolvedType === null) {
        mockPropertyValue = buildScalarValue(field.type, field.name)
      }

      if (mockPropertyValue === null) {
        if (resolvedType instanceof Type) {
          mockPropertyValue =
            resolvedType.oneofsArray.length > 0
              ? resolvedType.oneofsArray.reduce<Record<string, unknown>>((fields, oneOf) => {
                  fields[oneOf.name] = buildField(oneOf.fieldsArray[0])
                  return fields
                }, {})
              : buildTypeFields(resolvedType, stackDepth)
        } else if (resolvedType instanceof Enum) {
          mockPropertyValue = buildEnum(resolvedType)
        } else {
          mockPropertyValue = {}
        }
      }

      return { [String(buildScalarValue(field.keyType, field.name))]: mockPropertyValue }
    }

    if (field.resolvedType instanceof Type) {
      return buildTypeFields(field.resolvedType, stackDepth)
    }

    if (field.resolvedType instanceof Enum) {
      return buildEnum(field.resolvedType)
    }

    return buildScalar(field)
  }

  return type.fieldsArray.reduce<Record<string, unknown>>((data, field) => {
    field.resolve()

    if (field.parent !== field.resolvedType) {
      data[field.name] = field.repeated ? [buildField(field)] : buildField(field)
    }

    return data
  }, {})
}

export const buildServiceMethods = (service: Service, type = 0) => {
  const { root, methods: serviceMethods } = service

  return Object.keys(serviceMethods).reduce<
    Record<string, { name: string; input: Record<string, unknown> }>
  >((methods, method) => {
    const serviceMethod = serviceMethods[method]
    const methodMessageType = type === 0 ? serviceMethod.requestType : serviceMethod.responseType

    methods[method] = {
      name: method,
      input: buildTypeFields(root.lookupType(methodMessageType)),
    }

    return methods
  }, {})
}
