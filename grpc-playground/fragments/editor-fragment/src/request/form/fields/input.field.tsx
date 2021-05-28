import React        from 'react'
import { Input }    from '@atls-ui-proto/input'
import { Text }     from '@atls-ui-proto/text'
import { Column }   from '@atls-ui-proto/layout'
import { Layout }   from '@atls-ui-proto/layout'

import { useField } from '../form'

const Control = ({ type, value, onChange, ...props }) => {
  if (type === 'checkbox') {
    return (
      <input
        {...props}
        type={type}
        value={value}
        checked={value}
        onChange={() => onChange(!value)}
      />
    )
  }

  return <Input {...props} type={type} size='small' value={value} onChange={onChange} />
}

export const InputField = ({ type = 'text', name, path }) => {
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
