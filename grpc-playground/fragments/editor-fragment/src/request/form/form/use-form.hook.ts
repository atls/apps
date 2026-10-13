import type { FormStore } from './form.store'

import { useContext }     from 'react'

import { Context }        from './form.context'

export const useForm = (): FormStore => {
  const store = useContext(Context)

  if (!store) {
    throw new Error('Missing <FormProvider>')
  }

  return store
}
