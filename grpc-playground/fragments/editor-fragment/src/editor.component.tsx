import type { FC }  from 'react'

import { Row }      from '@atls-ui-parts/layout'
import { Layout }   from '@atls-ui-parts/layout'
import { useState } from 'react'
import React        from 'react'

import { Call }     from './call.component'
import { Request }  from './request'
import { Response } from './response'
import { useCall }  from './use-call.hook'

export interface EditorProps {
  service?: string
  method?: string
}

export const Editor: FC<EditorProps> = ({ service, method }) => {
  const [response, setResponse] = useState<unknown>()
  const onCall = useCall(service, method, setResponse)

  return (
    <Row height='100%'>
      <Layout flexBasis='50%'>
        <Request service={service} method={method} />
      </Layout>
      <Layout flexBasis='1px'>
        <Call onClick={onCall} />
      </Layout>
      <Layout flexBasis='50%'>
        <Response data={response} />
      </Layout>
    </Row>
  )
}
