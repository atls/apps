import { Box }  from '@atls-ui-proto/layout'
import { Text } from '@atls-ui-proto/text'

import React    from 'react'
import { Link } from 'react-router-dom'

export interface TabProps {
  service?: string
  method?: string
  active: boolean
  onClose: (service: string, method: string) => any
}

export const Tab = ({ service, method, active, onClose }: TabProps) => (
  <Box
    position='relative'
    top='1px'
    borderTop={active ? '1px solid black' : '1px solid transparent'}
    borderRight={active ? '1px solid black' : '1px solid transparent'}
    borderLeft={active ? '1px solid black' : '1px solid transparent'}
    borderTopRightRadius={4}
    borderTopLeftRadius={4}
    background={active ? 'white' : 'grey'}
    boxShadow='border-box'
  >
    <Text
      as={Link}
      to={`/${service}/${method}`}
      style={{ textDecoration: 'none' }}
      py={12}
      pl={24}
      pr={12}
    >
      {method}
    </Text>
    <Box flexDirection='column' justifyContent='center' pr={12}>
      <Text onClick={() => onClose(service ?? '', method ?? '')} style={{ cursor: 'pointer' }}>
        ✖
      </Text>
    </Box>
  </Box>
)
