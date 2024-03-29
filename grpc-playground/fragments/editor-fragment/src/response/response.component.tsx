import React         from 'react'
import AceEditor     from 'react-ace'
import { FC }        from 'react'
import { useEffect } from 'react'
import { useMemo }   from 'react'

export interface ResponseProps {
  data: any
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
      setOptions={{
        useWorker: false,
        displayIndentGuides: true,
      }}
      tabSize={2}
    />
  )
}
