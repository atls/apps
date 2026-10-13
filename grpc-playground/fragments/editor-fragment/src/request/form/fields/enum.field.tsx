import type { Enum } from 'protobufjs'

import React         from 'react'

import { useField }  from '../form'

interface EnumFieldProps {
  field: Enum
  path: Array<string>
}

export const EnumField = ({ field, path }: EnumFieldProps) => {
  const [value, onChange] = useField(path)

  return (
    <div style={{ padding: '16px 16px' }}>
      <select onChange={onChange}>
        {Object.keys(field.values).map((label) => (
          <option key={label} value={field.values[label]} selected={field.values[label] === value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
