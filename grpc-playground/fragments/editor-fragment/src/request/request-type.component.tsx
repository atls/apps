/* eslint-disable jsx-a11y/label-has-associated-control */

import { Box }     from '@atls-ui-parts/layout'
import type { FC } from 'react'

import { Row }     from '@atls-ui-parts/layout'
import { Layout }  from '@atls-ui-parts/layout'
import { Text }    from '@atls-ui-parts/text'
import React       from 'react'

export interface RequestTypeProps {
  type: string
  onChange: (type: string) => void
}

export const RequestType: FC<RequestTypeProps> = ({ type, onChange }) => (
  <Box width='100%' style={{ borderTop: '1px solid black', paddingLeft: 36, background: 'white' }}>
    <Row alignItems='center'>
      <Layout>
        <Text>Type:</Text>
      </Layout>
      <Layout flexBasis={12} />
      <Layout>
        <input
          id='request-form'
          type='checkbox'
          name='form'
          value='form'
          checked={type === 'form'}
          onChange={() => {
            onChange('form')
          }}
        />
      </Layout>
      <Layout pl='4px'>
        <label htmlFor='request-form'>
          <Text>Form</Text>
        </label>
      </Layout>

      <Layout flexBasis={12} />

      <Layout>
        <input
          id='request-json'
          type='checkbox'
          name='json'
          value='json'
          checked={type === 'json'}
          onChange={() => {
            onChange('json')
          }}
        />
      </Layout>
      <Layout pl='4px'>
        <label htmlFor='request-json'>
          <Text>JSON</Text>
        </label>
      </Layout>
    </Row>
  </Box>
)
