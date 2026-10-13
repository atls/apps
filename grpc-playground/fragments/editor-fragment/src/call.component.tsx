import { Button }       from '@atls-ui-parts/button'
import { Box }          from '@atls-ui-parts/layout'
import { buttonShapes } from '@atls-ui-parts/button'
import React            from 'react'

export const Call = ({ onClick }) => (
  <Box width='1px' position='relative' height='100%' style={{ background: 'black' }}>
    <Box position='absolute' top='50%' left={-24} zIndex={99999}>
      <Button shape={buttonShapes.lg} style={{ borderRadius: '50%' }} onClick={onClick}>
        ▶
      </Button>
    </Box>
  </Box>
)
