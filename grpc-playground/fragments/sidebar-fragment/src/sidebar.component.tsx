import { Column }    from '@atls-ui-parts/layout'
import { Layout }    from '@atls-ui-parts/layout'
import { Text }      from '@atls-ui-parts/text'
import { Link }      from 'react-router-dom'
import { useMatch }  from 'react-router-dom'
import React         from 'react'

import { useSchema } from '@grpc-playground/proto-registry'

export const Sidebar = () => {
  const match = useMatch('/:service/:method')
  const schema = useSchema()

  return (
    <Column style={{ paddingBlock: 24, overflowY: 'auto' }}>
      {schema &&
        Object.keys(schema).map((service) => (
          <Layout key={service}>
            <Column style={{ paddingBottom: 16 }}>
              <Layout style={{ paddingInline: 16, paddingBottom: 8 }}>
                <Text style={{ fontSize: 16 }}>{service}</Text>
              </Layout>
              {Object.keys(schema[service].methods).map((method) => (
                <Layout key={method} style={{ paddingInline: 16, paddingBlock: 2 }}>
                  <Link to={`/${service}/${method}`} style={{ textDecoration: 'none' }}>
                    <Text
                      style={{
                        fontWeight:
                          match?.params.service === service && match.params.method === method
                            ? 600
                            : 400,
                      }}
                    >
                      {method}
                    </Text>
                  </Link>
                </Layout>
              ))}
            </Column>
          </Layout>
        ))}
    </Column>
  )
}
