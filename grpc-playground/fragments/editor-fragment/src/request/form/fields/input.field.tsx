import { Input }    from '@atls-ui-proto/input'
import { Column }   from '@atls-ui-proto/layout'
import { Layout }   from '@atls-ui-proto/layout'
import { Text }     from '@atls-ui-proto/text'
import React        from 'react'

import { useField } from '../form'

interface ControlProps {
  type: 'checkbox' | 'number' | 'text'
  value: unknown
  onChange: (value: unknown) => void
}

const Control = ({ type, value, onChange }: ControlProps) => {
  if (type === 'checkbox') {
    return (
      <input
        type={type}
        checked={Boolean(value)}
        onChange={() => {
          onChange(!value)
        }}
      />
    )
  }

  const inputValue = typeof value === 'string' || typeof value === 'number' ? value : ''

  return <Input type={type} size='small' value={inputValue} onChange={onChange} />
}

interface InputFieldProps {
  type?: ControlProps['type']
  name: string
  path: Array<string>
}

export const InputField = ({ type = 'text', name, path }: InputFieldProps) => {
  const [value, onChange] = useField(path)

  return (
    <Column pt={12} pl={(path.length - 1) * 16}>
      <Layout pb='4px'>
        <Text>{name}</Text>
      </Layout>
      <Layout>
        <Control type={type} value={value} onChange={onChange} />
      </Layout>
    </Column>
  )
}
