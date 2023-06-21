import { Column }            from '@atls-ui-proto/layout'
import { Layout }            from '@atls-ui-proto/layout'
import { Text }              from '@atls-ui-proto/text'

import React                 from 'react'
import { PropsWithChildren } from 'react'

export interface GroupFieldProps {
  name: string
  path: string[]
}

export const GroupField = ({ name, path, children }: PropsWithChildren<GroupFieldProps>) => (
  <Column pt={24}>
    <Layout>
      <Text fontWeight={700}>{name}</Text>
    </Layout>
    <Layout>
      <div style={{ width: '100%' }}>{children}</div>
    </Layout>
  </Column>
)
