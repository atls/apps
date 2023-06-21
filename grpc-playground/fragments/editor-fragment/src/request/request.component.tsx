import { Column }      from '@atls-ui-parts/layout'
import { Layout }      from '@atls-ui-parts/layout'
import { Box }         from '@atls-ui-parts/layout'

import React           from 'react'
import { useState }    from 'react'

import { FormRequest } from './form'
import { JsonRequest } from './json'
import { RequestType } from './request-type.component'

export const Request = (props) => {
  const [type, setType] = useState('json')

  return (
    <Column width='100%' height='100%'>
      <Layout flexGrow={1}>
        <Box position='relative' width='100%' overflow='hidden'>
          <Box position='absolute' top={0} right={0} bottom={0} left={0} width='100%'>
            {type === 'json' ? <JsonRequest {...props} /> : <FormRequest {...props} />}
          </Box>
        </Box>
      </Layout>
      <Layout flexBasis={48}>
        <RequestType type={type} onChange={setType} />
      </Layout>
    </Column>
  )
}
