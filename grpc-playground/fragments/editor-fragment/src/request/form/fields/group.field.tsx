import React      from 'react'
import { FC }     from 'react'
import { Text }   from '@atls-ui-proto/text'
import { Column } from '@atls-ui-proto/layout'
import { Layout } from '@atls-ui-proto/layout'

export interface GroupFieldProps {
  name: string
  path: string[]
}

export const GroupField: FC<GroupFieldProps> = ({ name, path, children }) => (
  <Column pt={24}>
    <Layout>
      <Text fontWeight={700}>{name}</Text>
    </Layout>
    <Layout>
      <div style={{ width: '100%' }}>{children}</div>
    </Layout>
  </Column>
)
