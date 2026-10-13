import type { FC }         from 'react'

import { useEffect }       from 'react'
import { useState }        from 'react'
import { useCallback }     from 'react'
import React               from 'react'
import AceEditor           from 'react-ace'

import { useDataRegistry } from '@grpc-playground/data-registry'

export interface JsonRequestProps {
  service?: string
  method?: string
}

export const JsonRequest: FC<JsonRequestProps> = ({ service, method }) => {
  const [value, setValue] = useState(JSON.stringify({}, null, 2))
  const dataRegistry = useDataRegistry()

  useEffect(() => {
    import('ace-builds/src-noconflict/mode-json')
    import('ace-builds/src-noconflict/theme-textmate')

    if (service && method) {
      const data = dataRegistry?.getServiceMethodData(service, method)

      if (data) {
        setValue(JSON.stringify(data, null, 2))
      }
    }
  }, [service, method, setValue, dataRegistry])

  const onChangeValue = useCallback(
    (changed: string) => {
      setValue(changed)

      try {
        const parsed: unknown = JSON.parse(changed)

        if (
          service &&
          method &&
          parsed !== null &&
          typeof parsed === 'object' &&
          !Array.isArray(parsed)
        ) {
          dataRegistry?.setServiceMethodData(service, method, parsed as Record<string, unknown>)
        }
      } catch {} // eslint-disable-line no-empty
    },
    [service, method, setValue, dataRegistry]
  )

  return (
    <AceEditor
      style={{ background: '#fff' }}
      width='100%'
      height='100%'
      mode='json'
      theme='textmate'
      name='request'
      fontSize={13}
      cursorStart={2}
      showPrintMargin={false}
      showGutter
      highlightActiveLine={false}
      value={value}
      tabSize={2}
      setOptions={{
        useWorker: false,
        displayIndentGuides: true,
      }}
      onChange={onChangeValue}
    />
  )
}
