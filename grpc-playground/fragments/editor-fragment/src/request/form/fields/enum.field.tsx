import React        from 'react'

import { useField } from '../form'

export const EnumField = ({ field, path = [] }) => {
  const [value, onChange] = useField(path)

  return (
    <div style={{ padding: '16px 16px' }}>
      <select onChange={onChange}>
        {Object.keys(field.values).map((label) => (
          <option value={field.values[label]} selected={field.values[label] === value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
