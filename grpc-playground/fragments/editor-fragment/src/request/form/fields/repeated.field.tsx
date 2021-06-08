import React           from 'react'
import { useMemo }     from 'react'
import { useCallback } from 'react'
import { Text }        from '@atls-ui-proto/text'
import { Row }         from '@atls-ui-proto/layout'
import { Column }      from '@atls-ui-proto/layout'
import { Layout }      from '@atls-ui-proto/layout'
import { Button }      from '@atls-ui-proto/button'

import { useField }    from '../form'

export const RepeatedField = ({ name, path, children }) => {
  const [value = [], onChange] = useField(path)

  const onAdd = useCallback(() => {
    if (value.length > 0) {
      onChange([...value, value[0]])
    }
  }, [value, onChange])

  const onRemove = useCallback(
    (index) => {
      onChange(value.filter((_, i) => index === i))
    },
    [value, onChange]
  )

  const items = useMemo(
    () =>
      value.map((child, index) => (
        <Row>
          <Layout>{children([...path, index])}</Layout>
          <Layout pl={16} pt={36}>
            {index > 0 && (
              <Button
                size='small'
                inverted
                style={{ borderWidth: 0 }}
                onClick={() => onRemove(index)}
              >
                -
              </Button>
            )}
          </Layout>
        </Row>
      )),
    [children, value, path, onRemove]
  )

  return (
    <Column pt={20}>
      <Layout pl={(path.length - 1) * 16}>
        <Row alignItems='center'>
          <Layout>
            <Text fontWeight={700}>{name}</Text>
          </Layout>
          <Layout>
            <Button size='small' inverted style={{ borderWidth: 0 }} onClick={onAdd}>
              +
            </Button>
          </Layout>
        </Row>
      </Layout>
      <Layout>
        <div style={{ width: '100%' }}>{items}</div>
      </Layout>
    </Column>
  )
}
