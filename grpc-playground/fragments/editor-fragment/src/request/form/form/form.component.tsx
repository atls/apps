import React                 from 'react'
import { PropsWithChildren } from 'react'
import { useMemo }           from 'react'
import { useEffect }         from 'react'

import { Provider }          from './form.context'
import { FormProps }         from './form.interfaces'
import { FormStore }         from './form.store'

export const Form = ({ data = {}, children, onChange }: PropsWithChildren<FormProps>) => {
  const store = useMemo(() => FormStore.create(data), [data])

  useEffect(() => {
    store.on('change', onChange)

    return () => {
      store.off('change', onChange)
    }
  }, [store, onChange])

  return (
    <Provider value={store}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          height: '100%',
          width: '100%',
          paddingTop: 16,
          paddingLeft: 36,
          paddingRight: 36,
          paddingBottom: 36,
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </Provider>
  )
}
