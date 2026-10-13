import { Box }  from '@atls-ui-parts/layout'
import { Text } from '@atls-ui-parts/text'
import { Link } from 'react-router-dom'
import React    from 'react'

export interface TabProps {
  service?: string
  method?: string
  active: boolean
  onClose: (service: string, method: string) => void
}

export const Tab = ({ service, method, active, onClose }: TabProps) => (
  <Box
    style={{
      position: 'relative',
      top: 1,
      borderTop: active ? '1px solid black' : '1px solid transparent',
      borderRight: active ? '1px solid black' : '1px solid transparent',
      borderLeft: active ? '1px solid black' : '1px solid transparent',
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
      background: active ? 'white' : 'grey',
    }}
  >
    <Link to={`/${service}/${method}`} style={{ textDecoration: 'none' }}>
      <Text style={{ paddingBlock: 12, paddingLeft: 24, paddingRight: 12 }}>{method}</Text>
    </Link>
    <Box flexDirection='column' justifyContent='center' style={{ paddingRight: 12 }}>
      <Text
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onClose(service ?? '', method ?? '')
        }}
      >
        ✖
      </Text>
    </Box>
  </Box>
)
