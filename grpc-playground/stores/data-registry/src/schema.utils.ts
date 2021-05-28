export const getSchemaFieldData = (field) => {
  if (Array.isArray(field)) {
    return field.map(getSchemaFieldData)
  }

  const keys = Object.keys(field)

  if (keys.includes('type') && keys.includes('name') && keys.includes('value')) {
    return field.value
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return getSchemaData(field)
}

export const getSchemaData = (input = {}) =>
  Object.keys(input).reduce(
    (result, key) => ({
      ...result,
      [key]: getSchemaFieldData(input[key]),
    }),
    {}
  )
