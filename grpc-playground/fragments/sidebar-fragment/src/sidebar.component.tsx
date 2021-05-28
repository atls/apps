import React         from 'react'
import { Link }      from 'react-router-dom'
import { useMatch }  from 'react-router-dom'
import { Column }    from '@atls-ui-proto/layout'
import { Layout }    from '@atls-ui-proto/layout'
import { Text }      from '@atls-ui-proto/text'

import { useSchema } from '@grpc-playground/proto-registry'

export const Sidebar = () => {
  const { params } = useMatch('/:service/:method') || {}
  const schema = useSchema()

  return (
    <Column py={24}>
      {Object.keys(schema).map((service) => (
        <Layout key={service}>
          <Column pb={16}>
            <Layout px={16} pb='8px'>
              <Text fontSize={16}>{service}</Text>
            </Layout>
            {Object.keys(schema[service].methods).map((method) => (
              <Layout key={method} px={16} py='2px'>
                <Text
                  as={Link}
                  to={`/${service}/${method}`}
                  style={{ textDecoration: 'none' }}
                  fontWeight={params?.service === service && params?.method === method ? 600 : 400}
                >
                  {method}
                </Text>
              </Layout>
            ))}
          </Column>
        </Layout>
      ))}
    </Column>
  )
}
