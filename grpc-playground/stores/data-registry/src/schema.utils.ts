export const getSchemaFieldData = (field: unknown): unknown => {
  if (Array.isArray(field)) {
    return (field as Array<unknown>).map(getSchemaFieldData)
  }

  if (field === null || typeof field !== 'object') {
    return field
  }

  const data = field as Record<string, unknown>
  const keys = Object.keys(data)

  if (keys.includes('type') && keys.includes('name') && keys.includes('value')) {
    return data.value
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return getSchemaData(data)
}

export const getSchemaData = (input: Record<string, unknown> = {}): Record<string, unknown> =>
  Object.keys(input).reduce<Record<string, unknown>>(
    (result, key) => ({
      ...result,
      [key]: getSchemaFieldData(input[key]),
    }),
    {}
  )
