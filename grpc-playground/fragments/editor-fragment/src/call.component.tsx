import { Button } from '@atls-ui-proto/button'
import { Box }    from '@atls-ui-proto/layout'

import React      from 'react'

export const Call = ({ onClick }) => (
  <Box width='1px' position='relative' height='100%' background='black'>
    <Box position='absolute' top='50%' left={-24} zIndex={99999}>
      <Button size='large' shape='circle' onClick={onClick}>
        ▶
      </Button>
    </Box>
  </Box>
)
