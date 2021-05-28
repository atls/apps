import React        from 'react'
import { FC }       from 'react'
import { useState } from 'react'
import { Row }      from '@atls-ui-parts/layout'
import { Layout }   from '@atls-ui-parts/layout'

import { Response } from './response'
import { Request }  from './request'
import { useCall }  from './use-call.hook'
import { Call }     from './call.component'

export interface EditorProps {
  service?: string
  method?: string
}

export const Editor: FC<EditorProps> = ({ service, method }) => {
  const [response, setResponse] = useState()
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
