import { useState }    from 'react'
import { useCallback } from 'react'
import get             from 'lodash.get'

import { useForm }     from './use-form.hook'

export const useField = (path: Array<string>) => {
  const form = useForm()

  const [value, setValue] = useState<unknown>(get(form.getData(), path))

  const onChange = useCallback(
    (event: unknown) => {
      const nextValue =
        typeof event === 'object' &&
        event !== null &&
        'target' in event &&
        typeof event.target === 'object' &&
        event.target !== null &&
        'value' in event.target
          ? event.target.value
          : event

      setValue(nextValue)
      form.setValue(path, nextValue)
    },
    [form, path, setValue]
  )

  return [value, onChange] as const
}
