/* eslint-disable */

import { Type }       from 'protobufjs'
import { Enum }       from 'protobufjs'
import { MapField }   from 'protobufjs'
import { v4 as uuid } from 'uuid'

const MAX_STACK_SIZE = 3

export const buildServiceMethods = (service, type = 0) => {
  const root = service.root
  const serviceMethods = service.methods

  // @ts-ignore
  return Object.keys(serviceMethods).reduce((methods, method) => {
    const serviceMethod = serviceMethods[method]

    const methodMessageType = type === 0 ? serviceMethod.requestType : serviceMethod.responseType
    const messageType = root.lookupType(methodMessageType)

    methods[method] = {
      name: method,
      input: buildTypeFields(messageType),
    }

    return methods
  }, {})
}

export const buildTypeFields = (type, stackDepth = {}) => {
  if (stackDepth[type.name] > MAX_STACK_SIZE) {
    return {}
  }

  if (!stackDepth[type.name]) {
    stackDepth[type.name] = 0
  }

  stackDepth[type.name]++

  return type.fieldsArray.reduce((data, field) => {
    field.resolve()
    if (field.parent !== field.resolvedType) {
      if (field.repeated) {
        data[field.name] = [buildField(field, stackDepth)]
      } else {
        data[field.name] = buildField(field, stackDepth)
      }
    }
    return data
  }, {})
}

export const buildField = (field, stackDepth = {}) => {
  if (field instanceof MapField) {
    let mockPropertyValue: null | any = null

    if (field.resolvedType === null) {
      mockPropertyValue = buildScalarValue(field.type, field.name)
    }

    if (mockPropertyValue === null) {
      const resolvedType = field.resolvedType

      if (resolvedType instanceof Type) {
        if (resolvedType.oneofs) {
          mockPropertyValue = pickOneOf(resolvedType.oneofsArray)
        } else {
          mockPropertyValue = buildTypeFields(resolvedType)
        }
      } else if (resolvedType instanceof Enum) {
        mockPropertyValue = buildEnum(resolvedType)
      } else if (resolvedType === null) {
        mockPropertyValue = {}
      }
    }

    return {
      [buildScalarValue(field.keyType, field.name) as any]: mockPropertyValue,
    }
  }

  if (field.resolvedType instanceof Type) {
    return buildTypeFields(field.resolvedType, stackDepth)
  }

  if (field.resolvedType instanceof Enum) {
    return buildEnum(field.resolvedType)
  }

  const mockPropertyValue = buildScalar(field)

  if (mockPropertyValue === null) {
    const resolvedField = field.resolve()
    return buildField(resolvedField, stackDepth)
  } else {
    return mockPropertyValue
  }
}

export const buildEnum = (enumType) => {
  const enumKey = Object.keys(enumType.values)[0]

  return enumType.values[enumKey]
}

export const pickOneOf = (oneofs) =>
  oneofs.reduce((fields, oneOf) => {
    fields[oneOf.name] = buildField(oneOf.fieldsArray[0])
    return fields
  }, {})

export const buildScalar = (field) => {
  return {
    ...field,
    value: buildScalarValue(field.type, field.name),
  }
}

export const interpretMockViaFieldName = (fieldName) => {
  const fieldNameLower = fieldName.toLowerCase()

  if (fieldNameLower.startsWith('id') || fieldNameLower.endsWith('id')) {
    return uuid()
  }

  return 'Hello'
}

export const buildScalarValue = (type, fieldName) => {
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
      return 20
    case 'uint32':
      return 100
    case 'uint64':
      return 100
    case 'sint32':
      return 100
    case 'sint64':
      return 1200
    case 'fixed32':
      return 1400
    case 'fixed64':
      return 1500
    case 'sfixed32':
      return 1600
    case 'sfixed64':
      return 1700
    case 'double':
      return 1.4
    case 'float':
      return 1.1
    case 'bytes':
      // @ts-ignore
      return new TextEncoder('utf-8').encode('Hello')
    default:
      return null
  }
}
