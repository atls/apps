import type { PropsWithChildren } from 'react'

import { Column }                 from '@atls-ui-parts/layout'
import { Layout }                 from '@atls-ui-parts/layout'
import { Text }                   from '@atls-ui-parts/text'
import React                      from 'react'

export interface GroupFieldProps {
  name: string
  path: Array<string>
}

export const GroupField = ({ name, path, children }: PropsWithChildren<GroupFieldProps>) => (
  <Column pt={24}>
    <Layout>
      <Text style={{ fontWeight: 700 }}>{name}</Text>
    </Layout>
    <Layout>
      <div style={{ width: '100%' }}>{children}</div>
    </Layout>
  </Column>
)
