export const NUMBER_TYPES = [
  'number',
  'int32',
  'int64',
  'uint32',
  'uint64',
  'sint32',
  'sint64',
  'fixed32',
  'fixed64',
  'sfixed32',
  'sfixed64',
  'double',
  'float',
]

export const TEXT_TYPES = ['string']

export const BOOLEAN_TYPES = ['bool']

export const BYTES_TYPES = ['butes']

export const SCALAR_TYPES = [...NUMBER_TYPES, ...TEXT_TYPES, ...BOOLEAN_TYPES, ...BYTES_TYPES]
