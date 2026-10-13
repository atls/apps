import type { ReactNode }    from 'react'

import { Button }            from '@atls-ui-parts/button'
import { Row }               from '@atls-ui-parts/layout'
import { Column }            from '@atls-ui-parts/layout'
import { Layout }            from '@atls-ui-parts/layout'
import { Text }              from '@atls-ui-parts/text'
import { buttonAppearances } from '@atls-ui-parts/button'
import { buttonShapes }      from '@atls-ui-parts/button'
import { useMemo }           from 'react'
import { useCallback }       from 'react'
import { useRef }            from 'react'
import { useState }          from 'react'
import React                 from 'react'

import { useField }          from '../form'

interface RepeatedFieldProps {
  name: string
  path: Array<string>
  children: (path: Array<string>) => ReactNode
}

export const RepeatedField = ({ name, path, children }: RepeatedFieldProps) => {
  const [fieldValue, onChange] = useField(path)
  const value: Array<unknown> = Array.isArray(fieldValue) ? fieldValue : []
  const nextKey = useRef(value.length)
  const [keys, setKeys] = useState(() => value.map((_item, index) => String(index)))

  const onAdd = useCallback(() => {
    if (value.length > 0) {
      const key = String(nextKey.current)
      nextKey.current += 1
      setKeys((current) => [...current, key])
      onChange([...value, value[0]])
    }
  }, [value, onChange])

  const onRemove = useCallback(
    (index: number) => {
      setKeys((current) => current.filter((_key, itemIndex) => index === itemIndex))
      onChange(value.filter((_, i) => index === i))
    },
    [value, onChange]
  )

  const items = useMemo(
    () =>
      value.map((_child, index) => (
        <Row key={keys[index]}>
          <Layout>{children([...path, String(index)])}</Layout>
          <Layout pl={16} pt={36}>
            {index > 0 && (
              <Button
                shape={buttonShapes.sm}
                appearance={buttonAppearances.ghost}
                style={{ borderWidth: 0 }}
                onClick={() => {
                  onRemove(index)
                }}
              >
                -
              </Button>
            )}
          </Layout>
        </Row>
      )),
    [children, value, path, onRemove, keys]
  )

  return (
    <Column pt={20}>
      <Layout pl={(path.length - 1) * 16}>
        <Row alignItems='center'>
          <Layout>
            <Text style={{ fontWeight: 700 }}>{name}</Text>
          </Layout>
          <Layout>
            <Button
              shape={buttonShapes.sm}
              appearance={buttonAppearances.ghost}
              style={{ borderWidth: 0 }}
              onClick={onAdd}
            >
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
