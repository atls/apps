import { useState }    from 'react'
import { useCallback } from 'react'
import { FormEvent }   from 'react'
import get             from 'lodash.get'

import { useForm }     from './use-form.hook'

export const useField = (path: string[]) => {
  const form = useForm()

  if (!form) {
    throw new Error('Missing <FormProvider>')
  }

  const [value, setValue] = useState(get(form.getData(), path))

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement> | string | any) => {
      if (event && event.target) {
        setValue(event.target.value)
        form.setValue(path, event.target.value)
      } else {
        setValue(event)
        form.setValue(path, event)
      }
    },
    [form, path, setValue]
  )

  return [value, onChange]
}
