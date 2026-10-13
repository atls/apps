export const INTEGER64_TYPES = ['int64', 'uint64', 'sint64', 'fixed64', 'sfixed64']

export const NUMBER_TYPES = [
  'number',
  'int32',
  'uint32',
  'sint32',
  'fixed32',
  'sfixed32',
  'double',
  'float',
  ...INTEGER64_TYPES,
]

export const TEXT_TYPES = ['string']

export const BOOLEAN_TYPES = ['bool']

export const BYTES_TYPES = ['butes']

export const SCALAR_TYPES = [...NUMBER_TYPES, ...TEXT_TYPES, ...BOOLEAN_TYPES, ...BYTES_TYPES]
