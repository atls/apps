import type { FC }   from 'react'

import { useEffect } from 'react'
import { useMemo }   from 'react'
import React         from 'react'
import AceEditor     from 'react-ace'

export interface ResponseProps {
  data: unknown
}

export const Response: FC<ResponseProps> = ({ data = {} }) => {
  useEffect(() => {
    import('ace-builds/src-noconflict/mode-json')
    import('ace-builds/src-noconflict/theme-textmate')
  }, [])

  const value = useMemo(() => JSON.stringify(data, null, 2), [data])

  return (
    <AceEditor
      style={{ background: '#fff' }}
      width='100%'
      height='100%'
      mode='json'
      theme='textmate'
      name='response'
      fontSize={13}
      cursorStart={2}
      showPrintMargin={false}
      showGutter
      highlightActiveLine={false}
      value={value}
      readOnly
      tabSize={2}
      setOptions={{
        useWorker: false,
        displayIndentGuides: true,
      }}
    />
  )
}
