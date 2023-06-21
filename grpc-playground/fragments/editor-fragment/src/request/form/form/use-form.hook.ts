import { useContext } from 'react'

import { Context }    from './form.context'
import { FormStore }  from './form.store'

export const useForm = (): FormStore => {
  const store: FormStore = useContext(Context)

  return store
}
