import { Service }   from 'protobufjs'
import { Namespace } from 'protobufjs'
import { Type }      from 'protobufjs'
import { Enum }      from 'protobufjs'
import { Field }     from 'protobufjs'
import { MapField }  from 'protobufjs'
import { OneOf }     from 'protobufjs'
import { Method }    from 'protobufjs'

export const isNamespace = (lookupType) => {
  if (
    lookupType instanceof Namespace &&
    !(lookupType instanceof Service) &&
    !(lookupType instanceof Type) &&
    !(lookupType instanceof Enum) &&
    !(lookupType instanceof Field) &&
    !(lookupType instanceof MapField) &&
    !(lookupType instanceof OneOf) &&
    !(lookupType instanceof Method)
  ) {
    return true
  }
  return false
}

export const matchingAncestorNamespaceLookup = (typeName, parentNamespace, namespaceChain) => {
  if (!parentNamespace.parent) {
    const namespaceElements = namespaceChain.split('.')
    const firstOccurrence = namespaceElements.indexOf(typeName)
    const lastOccurrence = namespaceElements.lastIndexOf(typeName)
    return namespaceElements.slice(firstOccurrence, lastOccurrence + 1).join('.')
  }

  // eslint-disable-next-line
  namespaceChain = parentNamespace.name + '.' + namespaceChain

  return matchingAncestorNamespaceLookup(typeName, parentNamespace.parent, namespaceChain)
}

export const walkNamespace = (root, onNamespace, parentNamespace?) => {
  // eslint-disable-next-line
  const namespace = parentNamespace ? parentNamespace : root
  const nestedType = namespace.nested

  if (nestedType) {
    Object.keys(nestedType).forEach((typeName) => {
      const nestedNamespace = root.lookup(`${namespace.fullName}.${typeName}`)
      if (nestedNamespace && isNamespace(nestedNamespace)) {
        onNamespace(nestedNamespace)
        walkNamespace(root, onNamespace, nestedNamespace)
      }
    })
  }
}

export const walkServices = (root, onService) => {
  walkNamespace(root, (namespace) => {
    const nestedNamespaceTypes = namespace.nested
    if (nestedNamespaceTypes) {
      Object.keys(nestedNamespaceTypes).forEach((nestedTypeName) => {
        const fullNamespaceName = namespace.fullName.startsWith('.')
          ? namespace.fullName.replace('.', '')
          : namespace.fullName

        const nestedType = root.lookup(`${fullNamespaceName}.${nestedTypeName}`)

        if (nestedType instanceof Service) {
          const serviceName = [...fullNamespaceName.split('.'), nestedType.name]
          const fullyQualifiedServiceName = serviceName.join('.')

          onService(nestedType, serviceName.pop(), fullyQualifiedServiceName)
        }
      })
    }
  })
}
